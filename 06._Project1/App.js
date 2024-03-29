"use strict";

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port: ", PORT));
