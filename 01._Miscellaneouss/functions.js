// hoisting = at løfte op - det gør det muligt at kalde en funktion
// selvom man kalder den før funktionen
getRandomInt();

function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max + 1 - min) + min);
}

// en annonym funktion, kaldes det
const getRandomIntAnonymousFunction = function(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) - min);
}; 

// også en annonym funktion, men også en arrowFunction
const getRandomIntArrowFunction = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) - min);
};

const getRandomIntAnonymousFunctionOneLine = 
(min, max) => Math.floor(Math.random() * (max + 1 - min) - min);

// hvad er en callback function?
// det en funktionen der bliver sendt som et argument til en anden funktion
                            // string // callback function
function callback(name, genericAction) {
    return genericAction(name);
}

const running = (name) => `${name} is running`;

// write code below so that you can console.log "Navid is running"

// solution #1
console.log(callback("Navid", running));

// solution #2
const runningResult = callback("Navid", running);
console.log(runningResult);

// assignment create a single line below that prints "Navid is eating"

console.log(callback("Navid", (name) => `${name} is eating`));





