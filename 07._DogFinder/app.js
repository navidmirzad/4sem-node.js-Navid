import express from "express";

const app = express();

app.use(express.static("public"));

import getMatches from "./util/matches.js";

import { homepagePage, matchesPage, contactPage } from "./util/readPages.js";

// ========= HTML =================

app.get("/", (req, res) => {
    res.send(homepagePage);
})

app.get("/matches", async (req, res) => {
    const matches = await getMatches();
    res.send(matchesPage);
})

app.get("/contact", (req, res) => {
    res.send(contactPage);
})

app.get("/page", (req, res) => {
    res.send("<div><h1>navidooo</h1></div>")
})

// ========== API =================

app.get("/api/matches", async (req, res) => {
    const matches = await getMatches();
    res.send({ data: matches })
})

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on ", PORT));