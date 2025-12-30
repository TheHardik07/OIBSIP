const mongoose = require("mongoose");
const Inventory = require("./models/Inventory");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const seedInventory = async () => {
  const inventoryData = [
    // Bases
    {
      name: "Thin Crust",
      category: "base",
      quantity: 50,
      unit: "pieces",
      minThreshold: 10,
      price: 100,
    },
    {
      name: "Cheese Burst",
      category: "base",
      quantity: 40,
      unit: "pieces",
      minThreshold: 10,
      price: 150,
    },
    {
      name: "Whole Wheat",
      category: "base",
      quantity: 30,
      unit: "pieces",
      minThreshold: 10,
      price: 120,
    },
    {
      name: "Pan",
      category: "base",
      quantity: 35,
      unit: "pieces",
      minThreshold: 10,
      price: 130,
    },
    {
      name: "Classic",
      category: "base",
      quantity: 45,
      unit: "pieces",
      minThreshold: 10,
      price: 110,
    },

    // Sauces
    {
      name: "Tomato",
      category: "sauce",
      quantity: 100,
      unit: "bottles",
      minThreshold: 20,
      price: 20,
    },
    {
      name: "BBQ",
      category: "sauce",
      quantity: 80,
      unit: "bottles",
      minThreshold: 20,
      price: 30,
    },
    {
      name: "Pesto",
      category: "sauce",
      quantity: 60,
      unit: "jars",
      minThreshold: 20,
      price: 40,
    },
    {
      name: "Alfredo",
      category: "sauce",
      quantity: 70,
      unit: "jars",
      minThreshold: 20,
      price: 35,
    },
    {
      name: "Spicy",
      category: "sauce",
      quantity: 90,
      unit: "bottles",
      minThreshold: 20,
      price: 25,
    },

    // Cheeses
    {
      name: "Mozzarella",
      category: "cheese",
      quantity: 200,
      unit: "kg",
      minThreshold: 20,
      price: 50,
    },
    {
      name: "Cheddar",
      category: "cheese",
      quantity: 150,
      unit: "kg",
      minThreshold: 20,
      price: 45,
    },
    {
      name: "Parmesan",
      category: "cheese",
      quantity: 100,
      unit: "kg",
      minThreshold: 20,
      price: 60,
    },

    // Veggies
    {
      name: "Onion",
      category: "veggie",
      quantity: 500,
      unit: "kg",
      minThreshold: 50,
      price: 10,
    },
    {
      name: "Capsicum",
      category: "veggie",
      quantity: 300,
      unit: "kg",
      minThreshold: 50,
      price: 15,
    },
    {
      name: "Olives",
      category: "veggie",
      quantity: 200,
      unit: "kg",
      minThreshold: 50,
      price: 20,
    },
    {
      name: "Corn",
      category: "veggie",
      quantity: 400,
      unit: "kg",
      minThreshold: 50,
      price: 12,
    },
    {
      name: "Mushroom",
      category: "veggie",
      quantity: 250,
      unit: "kg",
      minThreshold: 50,
      price: 18,
    },

    // Meats (optional, as per requirement)
    {
      name: "Chicken",
      category: "meat",
      quantity: 150,
      unit: "kg",
      minThreshold: 20,
      price: 80,
    },
    {
      name: "Pepperoni",
      category: "meat",
      quantity: 100,
      unit: "kg",
      minThreshold: 20,
      price: 90,
    },
  ];

  try {
    await Inventory.deleteMany(); // Clear existing
    await Inventory.insertMany(inventoryData);
    console.log("Inventory seeded successfully");
  } catch (error) {
    console.error("Error seeding inventory:", error);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedInventory();
  process.exit();
};

runSeed();
