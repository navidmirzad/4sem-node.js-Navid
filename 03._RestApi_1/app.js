"use strict";

const Joi = require("joi");
const express = require("express"); // imports express module
const app = express(); // initialize express application

// middleware to parse JSON
app.use(express.json());

// http: 80
// https: 443
// http dev: 8080
// https dev: 9090
app.listen(8080, () => console.log("Listening on port 8080..."));

const drinksList = [
  { id: 1, name: "pina colada" },
  { id: 2, name: "white russian" },
  { id: 3, name: "cola-rum" },
  { id: 4, name: "mojito" },
  { id: 5, name: "margarita" },
  { id: 6, name: "martini" },
  { id: 7, name: "screwdriver" },
  { id: 8, name: "cosmopolitan" },
  { id: 9, name: "bloody mary" },
  { id: 10, name: "gin and tonic" },
];

app.get("/drinks", (req, res) => {
  res.send({ drinksList });
});

app.get("/drinks/:name", (req, res) => {
  const name = req.params.name;
  const findDrink = drinksList.find((drink) => drink.name === name);

  if (findDrink) {
    res.send({ findDrink });
  } else {
    res.status(404).send("Drink not found");
  }
});

let nextId = 10; // not sure if this works?

app.post("/drinks", (req, res) => {
  const { error } = validateDrink(req.body);
  if (error)
    return res
      .status(400)
      .send("Name is required to be a minimum of 3 characters...");

  const drink = {
    id: drink.id = ++nextId, // not sure if this works? otherwise do drinkslist.length + 1
    name: req.body.name,
  };

  drinksList.push(drink);
  res.send(drink);
});

app.put("/drinks/:id", (req, res) => {
  const drink = drinksList.find((drink) => drink.id === parseInt(req.params.id)
  );
  
  if (!drink) return res.status(404).send("Error 404 - Drink not found...");

  const { error } = validateDrink(req.body);
  if (error) return res.status(400).send("Drink could not be found");

  // updates drink name
  drink.name = req.body.name;
  res.send(drink);
});

app.delete("/drinks/:id", (req, res) => {
  const drink = drinksList.find(
    (drink) => drink.id === parseInt(req.params.id)
  );
  if (!drink) res.status(404).send("Error 404 - Drink not found...");

  const index = drinksList.indexOf(drink);
  drinksList.splice(index, 1);

  res.send(drink);
});

function validateDrink(drink) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(drink);
}
