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
  const header = fs
    .readFileSync("./public/components/header/header.html")
    .toString();
  return (
    header
      .replace("$TAB_TITLE$", config.tabTitle ?? "Dog Finder")
      .replace("$CSS_LINKS$", config.CSSLinks ?? "") +
    page +
    footer
  );
}
