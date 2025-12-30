const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pizza: {
      base: String,
      sauce: String,
      cheese: String,
      veggies: [String],
    },
    items: [
      {
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Order Received",
        "In Kitchen",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Order Received",
    },
    paymentId: String,
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    deliveryAddress: {
      type: String,
      default: "Default Address",
    },
    estimatedDeliveryTime: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
