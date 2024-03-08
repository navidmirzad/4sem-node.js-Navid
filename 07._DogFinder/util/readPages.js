
import { readPage, renderPage } from "./templatingEngine.js";

const homepage = readPage("./public/pages/homepage/homepage.html");
export const homepagePage = renderPage(homepage, {
    tabTitle: "Dogfinder - Homepage"
});


const matches = readPage("./public/pages/matches/matches.html");
export const matchesPage = renderPage(matches, {
    tabTitle: "Dogfinder - Matches",
    CSSLinks: '<link rel="stylesheet" href="/pages/matches/matches.css">'
});


const contact = readPage("./public/pages/contact/contact.html");
export const contactPage = renderPage(contact, {
    tabTitle: "Dogfinder - Contact"
});
