const express = require("express");
const connectDB = require("./db");
const cors = require("cors");

const authRoutes = require("./authroutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);

connectDB();

app.listen(5000, () => {
  console.log("Server running on port 5000 ....!");
});
