const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./usemodel");

const router = express.Router();
const SECRET = "mysecretkey";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.json({ message: "User registered" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });

  res.json({ token });
});

router.get("/dashboard", (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    jwt.verify(token, SECRET);
    res.json({ message: "Welcome to Dashboard" });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
