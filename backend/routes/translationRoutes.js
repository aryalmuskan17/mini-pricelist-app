const express = require("express");
const router = express.Router();
const pool = require("../db/db");

router.get("/translations/:lang", async (req, res) => {
  const { lang } = req.params;

  try {
    const result = await pool.query(
      "SELECT key, value FROM translations WHERE lang = $1",
      [lang]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;