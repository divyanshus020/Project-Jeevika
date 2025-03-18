const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  companyName: String,
  companyNumber: String,
  employeeName: String,
  employeeNumber: String,
  requestDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Connection', connectionSchema);
