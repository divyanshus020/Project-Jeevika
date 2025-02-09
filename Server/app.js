const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Change this to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Import Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
