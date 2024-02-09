"use strict";

// strict mode makes the syntax in the code stricter, 
// which ultimately leads to cleaner code

// totalGlobalVariable = "Never EVER!!! do this!!!";

// We always use const when possible, else use let
// var globalVariable = "ALso NEVER do this!!!";

// about const: 
// const cannot be undeclared or redeclared
// but its value can be changed as long as you don't change the assignment

{
    console.log("this is a block scope");
}

function otherScope() {
    console.log("this is a function scope");
}


// the issue with var is that it doesn't respect scopes,
// where as const and let does
{
    var someValue = true;
    {
        var someValue = false;
    } 
    console.log(someValue);
}


// let respect the scope boundaries
{
    let someValue = true;
    {
        let someValue = false;
    } 
    console.log(someValue);
}

// issue here is that because of the 1 second timeout, 
// var's value gets changed to the last number before it gets to console.log(i)
for(var i = 0; i <= 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000)
}

for(let i = 0; i <= 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000)
}




