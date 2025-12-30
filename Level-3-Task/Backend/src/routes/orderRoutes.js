const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  createPaymentOrder,
  confirmOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);
router.post("/create-payment", protect, createPaymentOrder);
router.post("/confirm", protect, confirmOrder);
router.get("/", protect, getUserOrders);
router.get("/:id", protect, getOrderById);

module.exports = router;
