const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "ApplicationTracker",
  connectionLimit: 10,
});

pool.query(``);
