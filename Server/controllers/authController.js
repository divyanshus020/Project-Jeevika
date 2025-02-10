const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register Function
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate input fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Ensure role is valid
        const validRoles = ["hire", "employee", "team"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role selected." });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with role
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role, // Store role in DB
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            process.env.JWT_SECRET || "your_secret_key",
            { expiresIn: "7d" }
        );

        res.status(201).json({ message: "User registered successfully!", token });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

// Login Function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || "your_secret_key",
            { expiresIn: "7d" }
        );

        res.status(200).json({ message: "Login successful!", token, role: user.role });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = { register, login };
