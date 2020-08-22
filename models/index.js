const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../config/database");
const env = process.env.NODE_ENV || "development";
console.log(process.env.NODE_ENV);
console.log(config[env]);
const sequelize = new Sequelize(config[env]);
let db = {};

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    try {
      let model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      // var model = sequelize.import(path.join(__dirname, file));
      console.log('Table :: ' + model.name);
      db[model.name] = model;
    } catch (err) {
      console.error('Error on model: ', err);
    }
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    try {
      db[modelName].associate(db);
    } catch (err) {
      console.log('Error on model: ' + modelName, err);
    }
  }
});

Sequelize.Validator.notNull = function (item) {
  return !this.isNull(item);
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
