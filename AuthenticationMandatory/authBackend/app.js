import express, { json } from "express";
const app = express();
import { hash, compare } from "bcrypt";
import { pool, getUsers, getUser, createUser } from "./database";

app.use(json());

const users = [];

app.get("/login", (req, res) => {
  // Authenticate User
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on PORT: " + PORT));
