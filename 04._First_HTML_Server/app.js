const express = require("express");

const app = express();


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/homepage/homepage.html");
});

app.get("/publicsquare", (req, res) => {
    res.sendFile(__dirname + "/public/publicSquare/publicSquare.html");
});

const knownName = "Navid";
app.get("/greeting", (req, res) => {
    const name = req.query.name;

    // http://localhost:8080/greeting?name=Navid

    if (name === knownName) {
        res.send({ data: "Hey there, how are you doing " + knownName})
    } else {
        res.send({ data: "Hello Stranger!" })
    } 
})

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));