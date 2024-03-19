import { homepagePage, contactPage } from "../util/readPages.js";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send(homepagePage);
});

router.get("/contact", (req, res) => {
  res.send(contactPage);
});

export default router;
