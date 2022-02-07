const dbConfig = require("./config/config").db;
const Pool = require('pg').Pool
const pool = new Pool({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
})

module.exports = pool;
