import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Get users by role
router.get("/:role", async (req, res) => {
    try {
        const { role } = req.params;
        if (!["hire", "employee", "team"].includes(role)) {
            return res.status(400).json({ message: "Invalid role." });
        }

        const users = await User.find({ role });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

export default router;
