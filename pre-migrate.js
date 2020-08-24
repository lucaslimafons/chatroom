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
  let queries = [];
  if (env === 'test') {
    queries.push(connection.query(`DROP DATABASE IF EXISTS ${config[env].database};`));
  }
  queries.push(connection.query(`CREATE DATABASE IF NOT EXISTS ${config[env].database};`));

  Promise.all(queries).then((res) => {
    console.info("Database created or successfully checked");
    process.exit(0);
  });
})
