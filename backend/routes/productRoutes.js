const express = require("express");
const router = express.Router();
const pool = require("../db/db");

router.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const {
    article_no,
    product_service,
    in_price,
    price,
    unit,
    in_stock,
    description
  } = req.body;

  try {
    await pool.query(
      `UPDATE products
       SET article_no=$1,
           product_service=$2,
           in_price=$3,
           price=$4,
           unit=$5,
           in_stock=$6,
           description=$7
       WHERE id=$8`,
      [article_no, product_service, in_price, price, unit, in_stock, description, id]
    );

    res.json({ message: "Product updated" });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;