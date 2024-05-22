import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import items from "./listitems.js";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT || 5000;

dotenv.config({ path: path.resolve(__dirname, "../.env") });
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req, res) => {
    res.send("API running");
});

app.use("/api/v1/users", userRoutes);

app.get("/api/v1/dashboard", async (req, res) => {
    let it = items;
    res.json(it);
});

app.post("/api/v1/add", async (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "kalo" });
});

app.get("/api/v1/item/:id", async (req, res) => {
    let it = items;
    res.json(it);
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});
