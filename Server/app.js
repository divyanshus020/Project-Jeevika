const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Security Middleware
app.use(helmet());

// ✅ Logging Middleware
app.use(morgan("dev"));

// ✅ CORS Configuration
const allowedOrigins = process.env.CLIENT_ORIGIN || "http://localhost:5173"; // Use .env for frontend URL
app.use(
  cors({
    origin: allowedOrigins.split(","), // Supports multiple origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Import Routes
const authRoutes = require("./routes/authRoute");

// ✅ API Routes
app.use("/api/auth", authRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running..." });
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
