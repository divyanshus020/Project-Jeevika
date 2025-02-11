const express = require("express");
const { register, login, getProfile } = require("../controllers/authController"); // Import getProfile
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get user profile (protected by authMiddleware)
router.get("/profile", authMiddleware, getProfile);

// Route to register a new user
router.post("/register", register);

// Route to log in a user
router.post("/login", login);

module.exports = router;