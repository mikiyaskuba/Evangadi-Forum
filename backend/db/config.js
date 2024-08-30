require("dotenv").config();
const mysql = require("mysql2");

const dbConnection = mysql.createPool({
	user: process.env.DB_USER,
	database: process.env.DATABASE,
	host: process.env.HOST,
	port: process.env.DB_PORT || 3306,
	password: process.env.PASSWORD,
	connectionLimit: 10,
});

module.exports = dbConnection.promise();
