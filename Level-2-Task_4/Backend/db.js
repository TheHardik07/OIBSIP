const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/auth-app")
    .then(() => console.log("Connected with DataBase"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
