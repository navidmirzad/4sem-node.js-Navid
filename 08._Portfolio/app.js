import express from "express";
import path from "path";

const app = express();
app.use(express.static("public"));

// index/homepage
app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/pages/homepage/homepage.html"))
})

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on ", PORT));