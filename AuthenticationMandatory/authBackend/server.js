import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
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
  createDB,
} from "./database.js";
import jwt from "jsonwebtoken";
import {
  authenticateToken,
  generateAccessToken,
} from "./middleware/middleware.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"], // Allow only GET and POST requests
    allowedHeaders: ["Content-Type", "Authorization", "Bearer"], // Allow these headers
  })
);

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;

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

app.post("/database", async (req, res) => {
  try {
    await createDB();
    res
      .status(200)
      .json({ message: "Database schema and tables created successfully" });
  } catch (error) {
    console.error("Error creating database schema and tables:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/posts", authenticateToken, async (req, res) => {
  try {
    const userExists = await getUser(req.user.username);
    if (!userExists) {
      return res.sendStatus(404).json({ message: "User doesn't exist" });
    }

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
    const userExists = await getUser(username);
    if (!userExists) {
      return res.sendStatus(404).json({ message: "User doesn't exist" });
    }

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
  const { username, password, email } = req.body;
  try {
    const user = await createUser(username, password, email);
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
      await postRefreshToken(accessToken, refreshToken, username);
      res.json({
        username: username,
        token: accessToken,
        refreshToken: refreshToken,
      });
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
