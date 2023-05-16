const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'group7.ueh46.com',
  port: 3307, //default: 3306
  user: 'root', //default: empty
  password: 123456,
  database: 'thttit1502',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;

