import express, { text } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import nodemailer from "nodemailer";
import { compare } from "bcrypt";
import {
  createUser,
  getUser,
  postRefreshToken,
  getRefreshTokens,
  deleteRefreshToken,
} from "./database/database.js";
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

app.get("/protected", authenticateToken, (req, res) => {
  res.statusCode(200).send("You are authenticated");
});

app.post("/mail", async (req, res) => {
  const { email } = req.body;
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "schuyler51@ethereal.email",
      pass: "FZXjpaDupTqUAtgv52",
    },
  });

  const msg = {
    from: '"Mandatory II" <fullstackAuth@example.com>',
    to: `${email}`,
    subject: "User registration successful!",
    text: "This is a test email sent from node.js using nodemailer!",
  };

  let info = await transporter.sendMail(msg);

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.send("Email sent!");
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

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "schuyler51@ethereal.email",
      pass: "FZXjpaDupTqUAtgv52",
    },
  });

  const msg = {
    from: '"Mandatory II" <fullstackAuth@example.com>',
    to: email,
    subject: "User registration successful!",
    text: "This is a test email sent from node.js using nodemailer!",
  };

  try {
    let info = await transporter.sendMail(msg);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res
      .status(200)
      .json({ message: "User created successfully and email sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email" });
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
