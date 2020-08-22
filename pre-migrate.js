const config = require("./config/database");
const env = process.env.NODE_ENV || "development";
console.log(process.env.NODE_ENV);
console.log(config[env]);

const mysql = require('mysql2/promise');

mysql.createConnection({
  host: config[env].host,
  port: config[env].port,
  user: config[env].username,
  password: config[env].password,
}).then((connection) => {
  connection.query(`CREATE DATABASE IF NOT EXISTS ${config[env].database};`).then((res) => {
      console.info("Database create or successfully checked");
      process.exit(0);
  });
})
