const mongoose = require("mongoose");

const EmployeeFormDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    mobile: { type: String, required: true, unique: true },
    aadhar: { type: String, unique: true, sparse: true }, // Optional Aadhar field, allowing null values
    workCategory: { type: String, required: true },
    experience: { type: String, required: true },
    expectedSalary: { type: Number, required: true },
    workType: { type: String, required: true },
    currentCity: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("EmployeeFormData", EmployeeFormDataSchema);
