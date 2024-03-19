import express from "express";

const app = express();

app.use(express.static("public"));

import pagesRouter from "./routers/pagesRouter.js";
app.use(pagesRouter);

app.get("/", (req, res) => {
  res.send("HELLO FROM MANDATORY!");
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on PORT: " + PORT));
