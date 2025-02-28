const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employeeModel");
const Company = require("../models/companyModel");
const Team = require("../models/teamModel");

exports.registerUser = async (req, res) => {
  const { role, ...userData } = req.body;

  try {
    let Model;
    if (role === "Employee") Model = Employee;
    else if (role === "Company") Model = Company;
    else if (role === "Team") Model = Team;
    else return res.status(400).json({ message: "Invalid role" });

    const existingUser = await Model.findOne({ username: userData.username });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    const newUser = new Model(userData);
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { role, username, password } = req.body;

  try {
    let Model;
    if (role === "Employee") Model = Employee;
    else if (role === "Company") Model = Company;
    else if (role === "Team") Model = Team;
    else return res.status(400).json({ message: "Invalid role" });

    const user = await Model.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, message: "Login successful", role });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
