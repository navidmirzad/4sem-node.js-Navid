import {
  homepagePage,
  introductionPage,
  functionalityPage,
  crudPage,
  fetchPage,
  renderingPage,
  asyncPage,
  structurePage,
  contactPage,
} from "../util/readPages.js";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send(homepagePage);
});

router.get("/introduction", (req, res) => {
  res.send(introductionPage);
});

router.get("/functionality", (req, res) => {
  res.send(functionalityPage);
});

router.get("/crud", (req, res) => {
  res.send(crudPage);
});

router.get("/fetch", (req, res) => {
  res.send(fetchPage);
});

router.get("/rendering", (req, res) => {
  res.send(renderingPage);
});

router.get("/async", (req, res) => {
  res.send(asyncPage);
});

router.get("/structure", (req, res) => {
  res.send(structurePage);
});

router.get("/contact", (req, res) => {
  res.send(contactPage);
});

export default router;
