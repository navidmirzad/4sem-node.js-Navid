import mysql from "mysql2";
import bcrypt from "bcrypt";
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

async function getUser(username) {
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
}

async function getPosts(username) {
  const [rows] = await pool.query("SELECT * FROM posts WHERE username = ?", [
    username,
  ]);
  return rows;
}

async function createPost(username, title) {
  const [result] = await pool.query(
    "INSERT INTO posts (username, title) VALUES (?, ?)",
    [username, title]
  );
  return {
    username,
    title,
  };
}

async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword]
  );
  return {
    id: result.insertId,
    username,
    password: hashedPassword, // We're not returning the actual password for security reasons
  };
}

export { pool, getUsers, getUser, createUser, createPost, getPosts };
