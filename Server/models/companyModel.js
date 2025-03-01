const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
   },
  password: { type: String, required: true },
  industryDepartment: { type: String, required: true },
  foundedDate: { type: Date, required: true },
  category: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: Number, required: true },
  mobileNumber: { type: Number, required: true },
  requirement: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model("Company", CompanySchema);
