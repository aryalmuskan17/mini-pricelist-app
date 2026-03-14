const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const translationRoutes = require("./routes/translationRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", translationRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Mini Pricelist API running" });
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database error");
  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});