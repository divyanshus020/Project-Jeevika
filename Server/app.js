const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL || "*" })); // Allow requests from frontend

// Import Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
