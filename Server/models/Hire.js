const mongoose = require("mongoose");

const hireSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const Hire = mongoose.model("Hire", hireSchema);
module.exports = Hire;
