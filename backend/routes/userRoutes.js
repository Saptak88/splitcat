import express from "express";
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const user = await User.findOne({ email: "user1@spl.com" });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    })
);

export default router;
