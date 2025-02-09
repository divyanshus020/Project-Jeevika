const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure the User model path is correct
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register",register);
router.post("/login",login)
module.exports = router;
