const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

const authRoutes = require("./routes/authRoute");
const employeeRoutes = require("./routes/employeeRoute");
const companyRoutes = require("./routes/companyRoute");
const teamRoutes = require("./routes/teamRoutes");
const messageRoutes = require("./routes/messageRoutes"); // ✅ Import Message Routes

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Security Middleware
app.use(helmet());

// ✅ Logging Middleware
app.use(morgan("dev"));

// ✅ CORS Configuration
const allowedOrigins = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: allowedOrigins.split(","), // Supports multiple frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api", employeeRoutes);
app.use("/api", companyRoutes);
app.use("/api", teamRoutes);
app.use("/api", messageRoutes); // ✅ Add Message Routes

// ✅ Default API Check Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running successfully 🚀" });
});

// ✅ 404 Route Handling
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found!" });
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

module.exports = app;
