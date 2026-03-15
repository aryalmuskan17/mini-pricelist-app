const { Pool } = require("pg")

const isProduction = process.env.DB_HOST && process.env.DB_HOST !== "localhost"

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "aryalmuskan17",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "mini_pricelist",
  port: process.env.DB_PORT || 5432,
  ssl: isProduction ? { rejectUnauthorized: false } : false
})

module.exports = pool