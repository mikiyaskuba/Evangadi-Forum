const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
	port: "8889",
	host: "localhost",
	user: "evangadiadmin",
	password: "qwerty",

	database: "evangadi1",
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
