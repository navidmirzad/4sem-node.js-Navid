const express = require("express");

const app = express();

app.use(express.static("public"));


//const helicopterFactoryFile = require("./util/helicopterFactory");
//console.log(helicopterFactoryFile.helicopterFactory());

const { helicopterFactory } = require("./util/helicopterFactory");
console.log(helicopterFactory());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/homepage/homepage.html");
});

app.get("/publicsquare", (req, res) => {
    res.sendFile(__dirname + "/public/publicSquare/publicSquare.html");
});

const knownNames = ["Navid", "Juicy", "Anders"];
app.get("/greeting", (req, res) => {
    const providedName = req.query.name;
    // http://localhost:8080/greeting?name=Navid
    if (knownNames.includes(providedName)) {
        res.send({ data: "Hey there, how are you doing " + providedName})
    } else {
        res.send({ data: "Hello Stranger!" })
    } 
})

app.get("/knownpeople", (req, res) => {
    const knownNamesString = knownNames.join(', ');
    const knownNamesCount = knownNames.length;
    res.send({ data: `Known names: ${knownNamesString}`, count: knownNamesCount });
});

app.get("/proxy", async (req, res) => {
    fetch("https://www.google.com")
    .then(response => response.text())
    .then((result) => res.send(result));
})

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));