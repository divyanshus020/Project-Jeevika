const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  teamUserName: { type: String, required: true, unique: true },
  teamMail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: Number, required: true },
  address: { type: String, required: true },
  pincode: { type: Number, required: true },
});

module.exports = mongoose.model("Team", TeamSchema);
