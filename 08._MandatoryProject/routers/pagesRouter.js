import {
  homepagePage,
  applicationsPage,
  contactPage,
} from "../util/readPages.js";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send(homepagePage);
});

router.get("/applications", (req, res) => {
  res.send(applicationsPage);
});

router.get("/contact", (req, res) => {
  res.send(contactPage);
});

export default router;
