import express from "express";
import pg from "pg";
const { Pool } = pg;
import items from "./listitems.js";
import cors from "cors";
const port = 5000;

const app = express();
app.use(cors());

const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "split",
    password: "1234",
    port: 5432,
});
db.connect();

app.get("/", (req, res) => {
    res.send("api runnirtywng");
});

app.get("/api/v1/dashboard", async (req, res) => {
    let it = items;
    res.json(it);
});

app.get("/api/v1/item/:id", async (req, res) => {
    let it = items;
    res.json(it);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
