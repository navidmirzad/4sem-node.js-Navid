import { readPage, renderPage } from "./templatingEngine.js";

const login = readPage("./public/pages/auth/login.html");
export const loginPage = renderPage(login, {
  tabTitle: "Mandatory - Login",
});

const register = readPage("./public/pages/auth/register.html");
export const registerPage = renderPage(register, {
  tabTitle: "Mandatory - Register",
});

const homepage = readPage("./public/pages/homepage/homepage.html");
export const homepagePage = renderPage(homepage, {
  tabTitle: "Mandatory - Home",
});

const introduction = readPage("./public/pages/introduction/introduction.html");
export const introductionPage = renderPage(introduction, {
  tabTitle: "Mandatory - Introduction",
});

const functionality = readPage(
  "./public/pages/functionality/functionality.html"
);
export const functionalityPage = renderPage(functionality, {
  tabTitle: "Mandatory - Functionality",
});

const crud = readPage("./public/pages/crud/crud.html");
export const crudPage = renderPage(crud, {
  tabTitle: "Mandatory - CRUD",
});

const fetch = readPage("./public/pages/fetch/fetch.html");
export const fetchPage = renderPage(fetch, {
  tabTitle: "Mandatory - Fetch",
});

const rendering = readPage("./public/pages/rendering/rendering.html");
export const renderingPage = renderPage(rendering, {
  tabTitle: "Mandatory - Rendering",
});

const async = readPage("./public/pages/async/async.html");
export const asyncPage = renderPage(async, {
  tabTitle: "Mandatory - Async",
});

const structure = readPage("./public/pages/structure/structure.html");
export const structurePage = renderPage(structure, {
  tabTitle: "Mandatory - Structure",
});

const contact = readPage("./public/pages/contact/contact.html");
export const contactPage = renderPage(contact, {
  tabTitle: "Mandatory - Contact",
});

/* const matches = readPage("./public/pages/matches/matches.html");
export const matchesPage = renderPage(matches, {
  tabTitle: "Dogfinder - Matches",
  CSSLinks: '<link rel="stylesheet" href="/pages/matches/matches.css">',
});
*/
