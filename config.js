const mysql = require('mysql');

module.exports = {
  getCon: () => mysql.createConnection({
    host: "localhost",
    user: "airbnbUser",
    password: "comp@206pw",
    database: "comp206_airbnb"
  }),
  functions: mysql
};