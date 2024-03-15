import { Router } from "express";
import getMatches from "../util/matches.js";
import { matchesPage } from "../util/readPages.js";

const router = Router();

router.get("/matches", async (req, res) => {
  res.send(matchesPage);
});

export default router;
