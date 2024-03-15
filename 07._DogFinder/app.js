import express from "express";

const app = express();

app.use(express.static("public"));

import getMatches from "./util/matches.js";

import matchesRouter from "./routers/matchesRouter.js";
app.use(matchesRouter);
import pagesRouter from "./routers/pagesRouter.js";
app.use(pagesRouter);

app.get("/api/matches", async (req, res) => {
  const matches = await getMatches();
  res.send({ data: matches });
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on ", PORT));
