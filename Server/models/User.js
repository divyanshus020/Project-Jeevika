const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["hire", "employee", "team"] , default: "hire"}, // Ensure valid roles
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
