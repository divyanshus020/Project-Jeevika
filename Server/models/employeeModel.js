const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true },
  mobile: { type: Number, required: true },
  address: { type: String, required: true },
  pincode: { type: Number, required: true },
  workExperience: { type: String, required: true },
  expectedSalary: { type: Number, required: true },
  jobRole: { type: String, required: true },
  dob: Date,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
