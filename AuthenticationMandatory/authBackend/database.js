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

async function postRefreshToken(refreshToken, username) {
  const [result] = await pool.query(
    "INSERT INTO tokens (refreshToken, username) VALUES (?, ?)",
    [refreshToken, username]
  );
  return {
    refreshToken,
  };
}

async function getRefreshTokens() {
  const [rows] = await pool.query("SELECT * FROM tokens");
  return rows;
}

async function deleteRefreshToken(refreshToken) {
  await pool.query("DELETE FROM tokens WHERE refreshToken = ?", [refreshToken]);
}

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
  const userExists = await getUser(username);
  if (!userExists) {
    throw new Error("User does not exist");
  }

  const [rows] = await pool.query(
    "SELECT posts.title, users.username FROM posts JOIN users ON posts.username = users.username WHERE users.username = ?",
    [username]
  );
  return rows;
}

async function createPost(username, title) {
  const userExists = await getUser(username);
  if (!userExists) {
    throw new Error("User does not exist");
  }

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

async function createDB() {
  // SQL query to create the database schema and tables
  const createDBQuery = `
    CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE};
    USE ${process.env.MYSQL_DATABASE};
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS tokens (
      id INT AUTO_INCREMENT PRIMARY KEY,
      refreshToken VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      username VARCHAR(255),
      FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      username VARCHAR(255),
      FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
    );
  `;

  // Execute the SQL query
  await pool.query(createDBQuery);
  console.log("Database schema and tables created successfully");
}

export {
  pool,
  getUsers,
  getUser,
  createUser,
  createPost,
  getPosts,
  postRefreshToken,
  getRefreshTokens,
  deleteRefreshToken,
  createDB,
};
