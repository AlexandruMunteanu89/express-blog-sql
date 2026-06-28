const mysql = require('mysql2');

//creare la db connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'express-blog-sql'
});
//console.log(credentials);

//
//const connection = mysql.createConnection(credentials)
// conetare a db
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

module.exports = connection;