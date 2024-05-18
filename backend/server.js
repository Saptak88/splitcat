import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import items from "./listitems.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT || 5000;

dotenv.config({ path: path.resolve(__dirname, "../.env") });
connectDB();

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
    res.send("API running");
});

app.use("/api/v1/user", userRoutes);

app.get("/api/v1/dashboard", async (req, res) => {
    let it = items;
    res.json(it);
});

app.get("/api/v1/item/:id", async (req, res) => {
    let it = items;
    res.json(it);
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});
