const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure the User model path is correct

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log("🔹 Register API hit:", req.body); // Log request body

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ User registered successfully");
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
