const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  createPaymentOrder,
  confirmOrder,
  createBuildOrder,
  buildOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);
router.post("/build", protect, createBuildOrder);
router.post("/build-order", protect, buildOrder);
router.post("/create-payment", protect, createPaymentOrder);
router.post("/confirm", protect, confirmOrder);
router.get("/", protect, getUserOrders);
router.get("/:id", protect, getOrderById);

module.exports = router;
