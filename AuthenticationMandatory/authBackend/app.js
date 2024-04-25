import express from "express";
import { compare } from "bcrypt";
import {
  createUser,
  getUser,
  getUsers,
  createPost,
  getPosts,
} from "./database.js";
import jwt from "jsonwebtoken";
//import { authenticateToken } from "./middleware/middleware.js";

const app = express();

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

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

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await createUser(username, password);
    res.status(201).json({ message: "User created successfully" });
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
      const token = jwt.sign({ username: user.username }, JWT_SECRET);
      res.json({ token });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/logout", (req, res) => {
  // Invalidate token and redirect to login page
  res.json({ message: "User logged out successfully" });
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on PORT: " + PORT));
