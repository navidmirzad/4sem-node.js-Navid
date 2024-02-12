"use strict";

const app = require("express")();

// http: 80 
//https: 443
// http dev: 8080 
// https dev: 9090
app.listen(8080);

const drinks = [
    { id: 1, name: "pina colada" },
    { id: 2, name: "white russian" },
    { id: 3, name: "cola-rum" },
    { id: 4, name: "mojito" },
    { id: 5, name: "margarita" },
    { id: 6, name: "martini" },
    { id: 7, name: "screwdriver" },
    { id: 8, name: "cosmopolitan" },
    { id: 9, name: "bloody mary" },
    { id: 10, name: "gin and tonic" }
];

app.get("/drinks", (req, res) => {
    res.send({ drinks });
});

app.get("/drinks/:name", (req, res) => {
    const name = req.params.name;
    const drink = drinks.find(drink => drink.name === name);
    
    if (drink) {
        res.send({ drink });
    } else {
        res.status(404).send("Drink not found");
    }
})