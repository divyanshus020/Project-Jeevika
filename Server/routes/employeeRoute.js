const express = require("express");
const router = express.Router();
const EmployeeFormData = require("../models/EmployeeFormData");

// ✅ POST: Worker Profile Form Submission
router.post("/employeedataform", async (req, res) => {
  try {
    const employeeData = req.body;
    
    const newEmployee = new EmployeeFormData(employeeData);
    await newEmployee.save();

    res.status(201).json({ message: "Worker profile submitted successfully!", employee: newEmployee });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ GET: Fetch All Worker Profiles
router.get("/all", async (req, res) => {
  try {
    const employees = await EmployeeFormData.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
