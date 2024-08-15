const mysql2 = require("mysql2");
require("dotenv").config();

const dbConnection = mysql2.createPool({
  host: "localhost",

  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
//   port:5432,
  connectionLimit: 10,
  
  
}

);

// Test the connection
dbConnection.execute("SELECT 1", (err, result) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Test query result:", result);
  }
});

module.exports = dbConnection.promise();
