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

    // Create Razorpay order if payment service is configured
    if (razorpay) {
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
    } else {
      // If no payment service, just create order
      res.status(201).json({
        order,
        message: "Order created without payment integration",
      });
    }
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

exports.confirmOrder = async (req, res) => {
  try {
    const { pizza, amount } = req.body;
    const userId = req.user.id;

    // Check and deduct inventory
    const { base, sauce, cheese, veggies } = pizza;

    // Deduct base
    if (base) {
      const baseItem = await Inventory.findOne({
        name: base,
        category: "base",
      });
      if (!baseItem || baseItem.quantity < 1) {
        return res
          .status(400)
          .json({ message: `Insufficient ${base} in inventory` });
      }
      baseItem.quantity -= 1;
      await baseItem.save();
    }

    // Deduct sauce
    if (sauce) {
      const sauceItem = await Inventory.findOne({
        name: sauce,
        category: "sauce",
      });
      if (!sauceItem || sauceItem.quantity < 1) {
        return res
          .status(400)
          .json({ message: `Insufficient ${sauce} in inventory` });
      }
      sauceItem.quantity -= 1;
      await sauceItem.save();
    }

    // Deduct cheese
    if (cheese) {
      const cheeseItem = await Inventory.findOne({
        name: cheese,
        category: "cheese",
      });
      if (!cheeseItem || cheeseItem.quantity < 1) {
        return res
          .status(400)
          .json({ message: `Insufficient ${cheese} in inventory` });
      }
      cheeseItem.quantity -= 1;
      await cheeseItem.save();
    }

    // Deduct veggies
    for (const veg of veggies) {
      const vegItem = await Inventory.findOne({
        name: veg,
        category: "veggie",
      });
      if (!vegItem || vegItem.quantity < 1) {
        return res
          .status(400)
          .json({ message: `Insufficient ${veg} in inventory` });
      }
      vegItem.quantity -= 1;
      await vegItem.save();
    }

    const order = await Order.create({
      user: userId,
      pizza,
      totalAmount: amount,
      paymentStatus: "Paid",
      status: "Order Received",
    });

    res.json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* CREATE RAZORPAY ORDER */
exports.createPaymentOrder = async (req, res) => {
  try {
    if (!razorpay) {
      return res
        .status(500)
        .json({ message: "Payment service not configured" });
    }

    const { amount } = req.body;
    const options = {
      amount: amount * 100, // INR → paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
