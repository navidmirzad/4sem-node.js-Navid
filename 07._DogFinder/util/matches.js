import {en_IN, faker, fakerEN, fakerEN_IN} from "@faker-js/faker";

const matches = [];
export default function getMatches(numberOfMatches=5) {
    for(let i = 0; i < numberOfMatches; i++ ) {
        console.log("match");
        fetch("https://dog.ceo/api/breeds/image/random")
        .then((response) => response.json)
        .then((result) => matches.push(result))
    }
    return matches;
}

function getDogProfile() {
    return {
    // console.log(fakerEN_IN.person.fullName);
    // console.log(fakerEN_IN.person.bio);
    // console.log(fakerEN_IN.location.streetAddress);
    // console.log(fakerEN_IN.location.city);
    }
}

