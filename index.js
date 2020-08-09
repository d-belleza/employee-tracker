// require dependencies and modules
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
require('console.table');

// display title
console.log(
    logo({name: "Employee Manager", font: "Slant"}).render());

promptUser();

function promptUser() {
    inquirer.prompt([
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
                addDept();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Add employee':
                addEmp();
                break;
            case 'Update employee role':
                updateEmp();
                break;
            case 'Quit':
                console.log('\nGoodbye!\n');
                break;
        }
    })
}

function addDept(){
    inquirer.prompt([
        {
            name: 'name',
            message: 'What is the name of the department?',
            validate: nameInput => {
                if (nameInput) {
                return true;
                } else {
                console.log('Please enter a department!');
                return false;
                }
            }
        }
    ]).then(dept => {
        console.log(`Added ${dept.name} to database`);
        promptUser();
    })
}

function addRole(){
    inquirer.prompt([
        {
            name: 'name',
            message: 'What is the name of the role?',
            validate: nameInput => {
                if (nameInput) {
                return true;
                } else {
                console.log('Please enter a role!');
                return false;
                }
            }
        }
    ]).then(role => {
        console.log(`Added ${role.name} to database`);
        promptUser();
    })
}

function addEmp(){
    inquirer.prompt([
        {
            name: 'first_name',
            message: "What is the employee's first name?",
            validate: nameInput => {
                if (nameInput) {
                return true;
                } else {
                console.log('Please enter employee first name!');
                return false;
                }
            }
        },
        {
            name: 'last_name',
            message: "What is the employee's last name?",
            validate: nameInput => {
                if (nameInput) {
                return true;
                } else {
                console.log('Please enter employee last name!');
                return false;
                }
            }
        },
        {
            type: "list",
            name: "roleChoice",
            message: "Select employee role.",
            choices: [
                'Role 1',
                'Role 2',
                'Role 3'
            ]
        },
        {
            type: "list",
            name: "managerChoice",
            message: "Select employee manager.",
            choices: [
                'Name 1',
                'Name 2',
                'Name 3'
            ]
        },
    ]).then(res => {
        var firstName = res.first_name;
        var lastName = res.last_name;
        
        console.log(`Added ${firstName} ${lastName} to database`);
        promptUser();
    })
}

function updateEmp() {
    inquirer.prompt([
        {
            type: "list",
            name: "empChoice",
            message: "Select employee to update.",
            choices: [
                'Name 1',
                'Name 2',
                'Name 3'
            ]
        },
        {
            type: "list",
            name: "roleChoice",
            message: "Select employee new role.",
            choices: [
                'Role 1',
                'Role 2',
                'Role 3'
            ]
        }
    ]).then(res => {
        console.log('\nEmployee role updated!\n');
        promptUser();
    })
}