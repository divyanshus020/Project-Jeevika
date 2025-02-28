const express = require("express");
const router = express.Router();
const EmployeeFormData = require("../models/employeeModel");
const {createEmployee, signInEmployee,editEmployee} = require("../controllers/employeeController");

// ✅ POST: Worker Profile Form Submission
router.post("/register/employee",createEmployee);
router.post("/signin/employee",signInEmployee);
router.patch("/employee/:id",editEmployee);


module.exports = router;
//http://localhost:8080/api/register/employee
//http://localhost:8080/api/signin/employee
//http://localhost:8080/api/employee/:id
