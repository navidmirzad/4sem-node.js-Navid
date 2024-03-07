const copyrightElement = document.getElementById("copyright-year");
const thisYear = new Date().getFullYear();
const copyrightYear = "© " + thisYear + " Navid Mirzad | All rights reserved.";
copyrightElement.innerText = copyrightYear; 