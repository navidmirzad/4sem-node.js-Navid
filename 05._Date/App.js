const express = require("express");
const app = express();

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on Port: " + PORT));

// UTC
console.log(new Date());

// Unix Epoch Time (Seconds since 1970 Jan. 1st)
console.log(Date.now());

// Local time (in my case right now and here CEST)
console.log(Date());

// assignment - create a route with the endpoint /month 
// assignment - that returns the current month