import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

async function getUser(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM users
  WHERE id = ?
  `,
    [id]
  );
  return rows[0];
}

async function createUser(username, password) {
  const [result] = await pool.query(
    `
    INSERT INTO users (username, password)
    VALUES (?, ?)
    `,
    [username, password]
  );
  return {
    id: result.insertId,
    username,
    password,
  };
}

export { pool, getUsers, getUser, createUser };
