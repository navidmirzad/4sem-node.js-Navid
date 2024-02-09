//const express = require("express");
// const app = express();

const app = require("express")();

    // endpoint
            // callback function
            // request, response
app.get("/", (req, res) => {
    res.send({ data: "Bobby Schmurda" });
});

// route 
app.get("/data", (req, res) => {
    res.send({ data: [1, 2, 3, 4] });
});

app.get("/thirdRoute/:somevalue/:someOtherValue", (req, res) => {
    const firstValue = req.params.someValue;
    const secondValue = req.params.someOtherValue;
    console.log(firstValue, secondValue);
    console.log(req.params);
    res.send({ data: "You reached the third route"})
})

let balance = 100;
app.get("/wallet/:withdrawalAmount", (req, res) => {
    console.log(req.params);
    const withdraw = Number(req.params.withdrawalAmount);
    console.log(typeof withdraw);
     if (balance > withdraw) {
        balance -= withdraw;
        res.send({ data: `Money withdrawn: ${withdraw} -- new balance: ${balance} ` })
    }   else if (balance < withdraw) {
            res.send({ data: `You do not have enough funds -- Current balance: ${balance}`})
        } else if (balance === withdraw) {
            balance -= withdraw;
            res.send({ data: `You just went broke G -- ${balance}` })
        }
})

app.get("/mypage", (req, res) => {
    res.send("<h1>Welcome to my page</h1>");
});

// http: 80 
//https: 443
// http dev: 8080 
// https dev: 9090
app.listen(8080);
