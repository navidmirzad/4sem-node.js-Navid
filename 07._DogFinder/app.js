import express from "express";

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

import getMatches from "./util/matches.js";

import matchesRouter from "./routers/matchesRouter.js";
app.use(matchesRouter);
import pagesRouter from "./routers/pagesRouter.js";
app.use(pagesRouter);
import contactRouter from "./routers/contactRouter.js";
app.use(contactRouter);

app.get("/api/matches", async (req, res) => {
  const matches = await getMatches();
  res.send({ data: matches });
});

console.log(process.env.PORT);

const PORT = process.env.PORT ?? 8080;
const server = app.listen(PORT, () =>
  console.log("Server is running on port", server.address().port)
);
