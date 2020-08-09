// require dependencies and modules
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
require('console.table');

// display title
console.log(
    logo({name: "Employee Manager", font: "Slant"}).render());

promptUser();

function promptUser() {
    return inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add department',
                'Add role',
                'Add employee',
                'Update employee role',
                'Quit'
            ]
        },
    ]).then(userChoice => {
        switch(userChoice.choice){
            case 'View all departments':
                console.log('Viewing all departments');
                promptUser();
                break;
            case 'View all roles':
                console.log('Viewing all roles');
                promptUser();
                break;
            case 'View all employees':
                console.log('Viewing all employees');
                promptUser();
                break;
            case 'Add department':
                console.log('Adding department');
                promptUser();
                break;
            case 'Add role':
                console.log('Adding role');
                promptUser();
                break;
            case 'Add employee':
                console.log('Adding employee');
                promptUser();
                break;
            case 'Update employee role':
                console.log('Updating role');
                promptUser();
                break;
            case 'Quit':
                console.log('Quitting, goodbye!');
                break;
        }
    })
}