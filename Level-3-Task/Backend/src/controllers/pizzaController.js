const Inventory = require("../models/Inventory");

// Get all available pizza ingredients
exports.getIngredients = async (req, res) => {
  try {
    const ingredients = await Inventory.find({ category: "ingredient" });
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pizza bases
exports.getBases = async (req, res) => {
  try {
    const bases = await Inventory.find({ category: "base" });
    res.json(bases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pizza sauces
exports.getSauces = async (req, res) => {
  try {
    const sauces = await Inventory.find({ category: "sauce" });
    res.json(sauces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cheese options
exports.getCheeses = async (req, res) => {
  try {
    const cheeses = await Inventory.find({ category: "cheese" });
    res.json(cheeses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get veggies options
exports.getVeggies = async (req, res) => {
  try {
    const veggies = await Inventory.find({ category: "veggie" });
    res.json(veggies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
