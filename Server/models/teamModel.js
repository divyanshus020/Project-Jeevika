const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  teamUsername: { type: String, required: true, unique: true },
  teamMail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  industry: String,
  membersCount: Number,
  address: String,
  pincode: String,
  mobileNumber: String,
  requirements: String,
});

module.exports = mongoose.model("Team", TeamSchema);
