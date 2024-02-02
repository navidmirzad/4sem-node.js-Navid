// --------------------------------------
// Exercise 3 - Add numbers from string to float

const numberOne = "1.10";
const numberTwo = "2.30";

// add those two numbers and show the result
// you cannot touch line 1 neither line 2

const combinedNumbers = parseFloat(numberOne) + parseFloat(numberTwo);

console.log(combinedNumbers);


// --------------------------------------
// Exercise 4 - Add the numbers and the total with 2 decimals

const anotherNumberOne = "1.10";
const anotherNumberTwo = "2.30";

const combinedNumbers2 = parseFloat(anotherNumberOne) 
+ parseFloat(anotherNumberTwo); 

const resultWithTwoDecimals = combinedNumbers2.toFixed(2);

console.log(resultWithTwoDecimals);


// --------------------------------------
// Exercise 5 - Decimals and average

const one = 10;
const two = 45;
const three = 98;

// Show in the console the avg. with 5 decimals

const averageNumber = parseFloat(one) + parseFloat(two) 
+ parseFloat(three) / 3;

const averageWithFiveDecimals = averageNumber.toFixed(5);

console.log(averageWithFiveDecimals);

// --------------------------------------
// Exercise 6 - Get the character by index

const letters = "abc";
// Get me the character "c"

//const targetLetter = letters[2];
//const characterC = letters.charAt(2);
//const charC = letters.substring(2,3);

const targetLetter = "c";

const indexOfLetter = letters.indexOf(targetLetter);

if (indexOfLetter !== -1) {
    console.log(`The index of '${targetLetter}' is: ${indexOfLetter}`);
  } else {
    console.log(`'${targetLetter}' was not found in the string.`);
  }

// --------------------------------------
// Exercise 7 - Replace

const fact = "You are learning javascript!";

// capitalize the J in Javascript

const capitalizedJ = fact.replace('javascript', 'Javascript')

console.log(capitalizedJ);


// --------------------------------------