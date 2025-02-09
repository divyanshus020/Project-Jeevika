const jwt = require("jsonwebtoken");
const cors = require("cors");

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173", // Allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const authMiddleware = (req, res, next) => {
  // Apply CORS middleware
  cors(corsOptions)(req, res, () => {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  });
};

module.exports = authMiddleware;
