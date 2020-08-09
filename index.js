// require dependencies and modules
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
require('console.table');

// display title
console.log(
    logo({name: "Employee Manager", font: "Slant"}).render());
    