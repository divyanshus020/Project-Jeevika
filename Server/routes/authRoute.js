const express = require("express");
const {forgetPassword, resetPassword, changePassword}=require("../controllers/authController")
const  {verifyToken}=require("../utils/validateToken")

const router = express.Router();

router.post("/forget-password",forgetPassword);
router.post("/reset-password/:token",resetPassword);
router.post("/change-password",verifyToken,changePassword);


module.exports = router;
//http://localhost:8080/api/auth/reset-password/:token
//http://localhost:8080/api/auth/forget-password
//http://localhost:8080/api/auth/change-password