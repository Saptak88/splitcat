import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Item from "../models/itemModel.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.get(
    "/getItems",
    protect,
    asyncHandler(async (req, res) => {
        const userId = req.user._id;
        const userEmail = req.user.email;
        const items = await Item.find({
            $or: [
                { createdBy: userId }, // Find items created by the user
                { "shares.email": userEmail }, // Find items where user's email is in shares
            ],
        });
        res.status(200).json(items);
    })
);

router.post(
    "/add",
    protect,
    asyncHandler(async (req, res) => {
        const { title, amount, date, emailList, notes, paidBy } = req.body;
        const userId = req.user._id;
        const userEmail = req.user.email;
        let dividedAmount = amount / (emailList.length + 1);
        dividedAmount = parseFloat(dividedAmount.toFixed(2));
        /*  const shares = emailList.map((email) => ({
            email,
            amount: dividedAmount,
        })); */
        const newItem = new Item({
            title,
            totalAmount: amount,
            date,
            shares: emailList,
            notes,
            createdBy: userId,
            createdByEmail: paidBy,
        });
        await newItem.save();
        res.status(200).json(newItem);
    })
);

router.post(
    "/delete",
    protect,
    asyncHandler(async (req, res) => {
        const { _id } = req.body;
        const userId = req.user._id;
        const item = await Item.findOne({ _id, createdBy: userId });
        if (!item) {
            return res.status(404).json({ message: "Item not found or unauthorized to delete" });
        }

        // If the user is authorized, delete the item
        await Item.deleteOne({ _id });
        res.status(200).json({ message: "Item deleted successfully" });
    })
);

export default router;
