const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: "localhost",
    user: process.env.DB_USER,
    port: 5432,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

module.exports = pool;