import express from "express";

const app = express();

import volcanoesRouter from "./routers/volcanoesRouter.js";
app.use(volcanoesRouter);

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on PORT: " + PORT));
