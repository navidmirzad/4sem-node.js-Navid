import fs from "fs";

export function readPage(path) {
  return fs.readFileSync(path).toString();
}

// man kan tjekke om noget er null ved at smide to ??
// og et enkelt ? spørger om noget er true
//const value = 0;
//console.log(value ?? "some other value");
//console.log(value || "some other value");

const footer = fs
  .readFileSync("./public/components/footer/footer.html")
  .toString();

export function renderPage(page, config = {}) {
  const navbar = fs
    .readFileSync("./public/components/navbar/navbar.html")
    .toString();
  return (
    navbar
      .replace("$TAB_TITLE$", config.tabTitle ?? "Application Tracker")
      .replace("$CSS_LINKS$", config.CSSLinks ?? "") +
    page +
    footer
  );
}
