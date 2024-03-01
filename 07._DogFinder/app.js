import express from "express";
import path from "path";

const app = express();
app.use(express.static("public"));

import getMatches from "./util/matches.js";

getMatches();

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/pages/homepage/homepage.html"));
})

app.get("/matches", (req, res) => {
    res.sendFile(path.resolve("public/pages/matches/matches.html"));
})

app.get("/contact", (req, res) => {
    res.sendFile(path.resolve("public/pages/contact/contact.html"));
})

app.get("/api/matches", (req, res) => {
    const matches = getMatches();
    res.send({ data: matches })
})

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on ", PORT));