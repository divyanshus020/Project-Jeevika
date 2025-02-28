const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyUsername: { type: String, required: true, unique: true },
  companyMail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  industryDepartment: String,
  foundedDate: String,
  category: String,
  address: String,
  pincode: String,
  mobileNumber: String,
  requirement: String,
});

module.exports = mongoose.model("Company", CompanySchema);
