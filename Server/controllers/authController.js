const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Hire = require("../models/Hire");
const Employee = require("../models/Employee");
const Team = require("../models/Team");

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

        // Check if the user already exists in all collections
        const existingHire = await Hire.findOne({ email });
        const existingEmployee = await Employee.findOne({ email });
        const existingTeam = await Team.findOne({ email });

        if (existingHire || existingEmployee || existingTeam) {
            return res.status(400).json({ message: "Email is already in use." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Determine which collection to store the user in
        let newUser;
        if (role === "hire") {
            newUser = new Hire({ name, email, password: hashedPassword });
        } else if (role === "employee") {
            newUser = new Employee({ name, email, password: hashedPassword });
        } else if (role === "team") {
            newUser = new Team({ name, email, password: hashedPassword });
        }

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, role },
            process.env.JWT_SECRET || "your_secret_key",
            { expiresIn: "7d" }
        );

        res.status(201).json({ message: "User registered successfully!", token });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = { register };
