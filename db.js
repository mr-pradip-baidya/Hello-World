const mongoose = require("mongoose");

// Correct MongoDB connection string
const mongoURL = "mongodb://localhost:27017/hotels";

// Connect to MongoDB
mongoose.connect(mongoURL);

// Checking status of the connection
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Database connected successfully");
});

db.on("error", (err) => {
  console.log("Mongodb connection error:", err);
});

db.on("disconnected", () => {
  console.log("Database disconnected");
});

module.exports = db;
