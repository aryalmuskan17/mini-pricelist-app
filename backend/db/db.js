const { Pool } = require("pg");

const pool = new Pool({
  user: "aryalmuskan17",
  host: "localhost",
  database: "mini_pricelist",
  password: "",
  port: 5432,
});

module.exports = pool;