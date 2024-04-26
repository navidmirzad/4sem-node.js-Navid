import { Router } from "express";
import db from "../database/connection.js";

const router = Router();

router.get("/api/volcanoes", async (req, res) => {
  const result = await db.all("SELECT * FROM volcanoes;");
  res.send({ data: result });
});

router.get("/api/villages", async (req, res) => {
  const result = await db.all("SELECT * FROM villages");
  res.send({ data: result });
});

export default router;
