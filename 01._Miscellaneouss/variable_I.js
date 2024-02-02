// we will always default to const
const myName = "Navid";

const me = {
}

me.name = myName;

// const is a constant NOT in the value in the assignment
// meaning that it cannot be reassigned thus also has to be assigned

const hobbies = ["sleeping", "eating"]

hobbies.push("friends")

me.hobbies = hobbies;

console.log(me);