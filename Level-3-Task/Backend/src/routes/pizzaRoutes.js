const express = require("express");
const router = express.Router();
const {
  getIngredients,
  getBases,
  getSauces,
  getCheeses,
  getVeggies,
} = require("../controllers/pizzaController");
const { protect } = require("../middleware/authMiddleware");

router.get("/ingredients", protect, getIngredients);
router.get("/bases", protect, getBases);
router.get("/sauces", protect, getSauces);
router.get("/cheeses", protect, getCheeses);
router.get("/veggies", protect, getVeggies);

module.exports = router;
