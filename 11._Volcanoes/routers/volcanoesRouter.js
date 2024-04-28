import { Router } from "express";
import db from "../database/connection.js";

const router = Router();

router.get("/api/volcanoes", async (req, res) => {
  const result = await db.all("SELECT * FROM volcanoes;");
  res.send({ data: result });
});

router.post("/api/volcanoes", async (req, res) => {
  const { name, isActive, type } = req.body;

  if (!name) {
    return res.sendStatus(400).send({ data: "Missing key in body: name" });
  }

  if (isActive === undefined || isActive === null) {
    return res.sendStatus(400).send({ data: "Missing key in body: isActive" });
  }

  if (!type) {
    return res.sendStatus(400).send({ data: "Missing key in body: type" });
  }

  const result = await db.run(
    `INSERT INTO volcanoes (name, is_active, type)
  VALUES (?, ?, ?)`,
    [name, isActive, type]
  );

  res.send({ lastId: result.lastID });
});

router.post("/api/villages", async (req, res) => {
  const result = await db.run(`INSERT INTO volcanoes (name, is_active, type) 
  VALUES ('Volcano Juice', FALSE, 'Underground')`);
  res.send({ result: result });
});

export default router;
