import mysql from "mysql";

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "applicationUser",
  password: "password",
  database: "applicationTracker",
});

mysqlConnection.connect((error) => {
  if (!error) {
    console.log("Succesfully connected to MySQL Database");
  } else {
    console.log("Failed connection to MySQL Database");
  }
});
