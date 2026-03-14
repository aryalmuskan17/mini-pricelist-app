const { Pool } = require("pg")

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "aryalmuskan17",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "mini_pricelist",
  port: process.env.DB_PORT || 5432,

  ssl: process.env.DB_HOST
    ? { rejectUnauthorized: false }
    : false
})

module.exports = pool