const Order = require("../models/Order");
const Inventory = require("../models/Inventory");
const razorpay = require("../config/razorpay");

exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress } = req.body;
    const userId = req.user.id;

    // Check inventory availability
    for (const item of items) {
      const inventoryItem = await Inventory.findOne({ name: item.name });
      if (!inventoryItem || inventoryItem.quantity < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient ${item.name} in inventory` });
      }
    }

    const order = await Order.create({
      user: userId,
      items,
      totalAmount,
      deliveryAddress,
    });

    // Create Razorpay order
    const options = {
      amount: totalAmount * 100, // Razorpay expects amount in paisa
      currency: "INR",
      receipt: `order_${order._id}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);
    order.paymentId = razorpayOrder.id;
    await order.save();

    res.status(201).json({
      order,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    if (status === "confirmed") {
      // Deduct from inventory
      for (const item of order.items) {
        await Inventory.findOneAndUpdate(
          { name: item.name },
          { $inc: { quantity: -item.quantity } }
        );
      }
    }

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
