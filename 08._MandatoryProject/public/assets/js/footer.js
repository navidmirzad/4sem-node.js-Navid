const copyrightElement = document.getElementById("copyright-year");
const thisYear = new Date().getFullYear();
const copyrightYear = "Copyright © " + thisYear;
copyrightElement.innerText = copyrightYear;
