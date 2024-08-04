const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  host: "localhost",
  user: "abera1",
  password: "123456",
  database: "evangadi db1",
  connetionLimit: 10,
});

// dbconnection.execute("select 'test'", (err, result) => {
//   if (err) {
//     console.log(err.massege);
//   } else {
//     console.log(result);
//   }
// });
module.exports = dbConnection.promise();
