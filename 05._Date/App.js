const express = require("express");
const app = express();

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on Port: " + PORT));

// UTC
//console.log(new Date());

// Unix Epoch Time (Seconds since 1970 Jan. 1st)
//console.log(Date.now());

// Local time (in my case right now and here CEST)
//console.log(Date());

// assignment - create a route with the endpoint /month 
// assignment - that returns the current month

app.get("/day", (req, res) => {
    const currentDate = new Date();
    const options = { weekday: 'long' };
    const currentDayOfWeek = currentDate.toLocaleDateString('en-US', options);
    res.send(`The current day of the week is: ${currentDayOfWeek}`);
});

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
              "Thursday", "Friday", "Saturday",]
app.get("/day/version2", (req, res) => {
    const dayName = days[new Date().getDay()];
    res.send({ data: dayName})
})

app.get("/date", (req, res) => {
    const date = new Date().toDateString();
    res.send(`The current date is: ${date}`)
})

app.get("/date/version2", (req, res) => {
    res.send({ data: date})
})

app.get("/month", (req, res) => {
    const monthName = new Date().toLocaleString("en-US", { month: "long" })
    res.send(`The current month is: ${monthName}`)
})

app.get("/month/version2", (req, res) => {
    const monthName = Date().split(" ")[1];
    res.send({ data: monthName })
})
