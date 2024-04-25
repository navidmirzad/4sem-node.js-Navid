import express from "express";
import { compare } from "bcrypt";
import {
  createUser,
  getUser,
  getUsers,
  createPost,
  getPosts,
  postRefreshToken,
  getRefreshTokens,
  deleteRefreshToken,
} from "./database.js";
import jwt from "jsonwebtoken";
//import { authenticateToken, generateAccessToken } from "./middleware/middleware.js";

const app = express();

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: 900 });
}

app.post("/tokens", async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const currentRefreshTokens = await getRefreshTokens();
    // Check if the provided refreshToken exists in the database
    const tokenExists = currentRefreshTokens.some(
      (tokenData) => tokenData.refreshToken === refreshToken
    );

    if (!tokenExists) return res.sendStatus(403);

    jwt.verify(refreshToken, REFRESH_JWT_SECRET, async (err, user) => {
      if (err) return res.sendStatus(403);

      const accessToken = generateAccessToken(user);
      res.json({ accessToken: accessToken });
    });
  } catch (error) {
    console.error("Error checking refresh token:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/posts", authenticateToken, async (req, res) => {
  try {
    const posts = await getPosts(req.user.username);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/posts", authenticateToken, async (req, res) => {
  const { title } = req.body;
  const { username } = req.user;
  try {
    const post = await createPost(username, title);
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ONLY FOR TEST PURPOSES, remember to delete
app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await createUser(username, password);
    res.status(201).json({ message: "User created successfully", user: user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUser(username);
    if (!user) {
      return res.status(400).json({ message: "Authentication failed" });
    }
    const passwordMatch = await compare(password, user.password);
    if (passwordMatch) {
      const accessToken = generateAccessToken(user, JWT_SECRET);
      const refreshToken = jwt.sign(user, REFRESH_JWT_SECRET);
      await postRefreshToken(refreshToken, username);
      res.json({ token: accessToken, refreshToken: refreshToken });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/logout", async (req, res) => {
  // Invalidate token (delete it from the database) and redirect to login page
  const refreshToken = req.headers.authorization.split(" ")[1];
  if (!refreshToken) return res.sendStatus(401);

  try {
    await deleteRefreshToken(refreshToken);
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.json({ message: "Internal Server Error" });
  }
});


const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on PORT: " + PORT));
