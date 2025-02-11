const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Check for Authorization header
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized access, token missing or invalid" });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET || aeb713428d35c70bc1acc9926081a71a7ec7b7e0d28605c23c041cc2443143f9166ad021d70d647d45083f3b2259b344abff44e869edb6f888c55bf90c3ad33a);

    // Attach user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message); // Log error for debugging

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired, please log in again" });
    }

    // Generic error for other JWT verification errors
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;