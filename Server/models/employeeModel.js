const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: String,
  address: String,
  workExperience: String,
  expectedSalary: String,
  jobRole: String,
  pincode: String,
  dob: String,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
