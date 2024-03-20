import { readPage, renderPage } from "./templatingEngine.js";

const login = readPage("./public/pages/auth/login.html");
export const loginPage = renderPage(login, {
  tabTitle: "Application Tracker - Login",
});

const register = readPage("./public/pages/auth/register.html");
export const registerPage = renderPage(register, {
  tabTitle: "Application Tracker - Register",
});

const homepage = readPage("./public/pages/homepage/homepage.html");
export const homepagePage = renderPage(homepage, {
  tabTitle: "Application Tracker - Homepage",
});

const applications = readPage("./public/pages/applications/applications.html");
export const applicationsPage = renderPage(applications, {
  tabTitle: "Application Tracker - Applications",
});

const contact = readPage("./public/pages/contact/contact.html");
export const contactPage = renderPage(contact, {
  tabTitle: "Application Tracker - Contact",
});

/* const matches = readPage("./public/pages/matches/matches.html");
export const matchesPage = renderPage(matches, {
  tabTitle: "Dogfinder - Matches",
  CSSLinks: '<link rel="stylesheet" href="/pages/matches/matches.css">',
});
*/
