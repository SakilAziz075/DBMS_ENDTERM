const mysql = require('mysql2');

// Create the connection and call `.promise()` to convert it to promise-based
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hospital_management',
}).promise();

module.exports = db;
