// --------------------------------------
// Objects
// --------------------------------------
// Exercise 1 - Retrieve value from object by key

const myObject = { message: "Hello, earthling! I bring peace." };

// Log the message 

console.log(myObject);

// --------------------------------------
// Exercise 2 - Defining an object. 

// Create an object that has your name and age. 

const me = {
    name: "navid", 
    age: 23,
}

console.log(me);


// --------------------------------------
// Exercise 3 - Add a key-value pair 

// postnumre for byer:
const postNRforByer = {
    Brønshøj: 2700,
    Søborg: 2860,
    Nordvest: 2400,
};

postNRforByer.isAllowed = true;

console.log(postNRforByer);

// make a rule called isAllowed and let the value be true



// --------------------------------------
// Exercise 4 - Remove a property 

const thisSong = { description: "The best song in the world." };

// remove the property "description" and add a property called "about" that should say "Just a tribute." 

delete thisSong.description;

thisSong.about = "Just a tribute"

console.log(thisSong);

// --------------------------------------