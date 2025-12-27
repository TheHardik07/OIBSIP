const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  updateOrderStatus,
  getInventory,
  updateInventory,
  addInventoryItem,
  getLowStockAlerts,
} = require("../controllers/adminController");
const { protect, admin } = require("../middleware/adminMiddleware");

router.get("/orders", protect, admin, getAllOrders);
router.put("/orders/:id/status", protect, admin, updateOrderStatus);
router.get("/inventory", protect, admin, getInventory);
router.put("/inventory/:id", protect, admin, updateInventory);
router.post("/inventory", protect, admin, addInventoryItem);
router.get("/inventory/low-stock", protect, admin, getLowStockAlerts);

module.exports = router;
