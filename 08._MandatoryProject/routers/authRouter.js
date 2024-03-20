import { loginPage, registerPage } from "../util/readPages.js";
import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
  res.send(loginPage);
});

router.get("/register", (req, res) => {
  res.send(registerPage);
});

export default router;
