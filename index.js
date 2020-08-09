// require dependencies and modules
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const database = require('./db/database')
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
                database.getDepts()
                    .then(([rows]) => {
                        var depts = rows;
                        console.table(depts);
                        promptUser();
                    })
                break;
            case 'View all roles':
                database.getRoles()
                    .then(([rows]) => {
                        var roles = rows;
                        console.table(roles);
                        promptUser();
                    })
                break;
            case 'View all employees':
                database.getEmps()
                    .then(([rows]) => {
                        var employees = rows;
                        console.table(employees);
                        promptUser();
                    })
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
                database.quit();
                break;
        }
    })
}

function addDept(){
    inquirer.prompt([
        {
            type: 'input',
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
            type: 'input',
            name: 'role',
            message: 'What is the name of the role?',
            validate: nameInput => {
                if (nameInput) {
                return true;
                } else {
                console.log('Please enter a role!');
                return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the role salary?',
            validate: nameInput => {
                if (nameInput) {
                return true;
                } else {
                console.log('Please enter a salary!');
                return false;
                }
            }
        },
        {
            type: "list",
            name: "deptChoice",
            message: "Select role's department.",
            choices: [
                'Department 1',
                'Department 2',
                'Department 3'
            ]
        }
    ]).then(role => {
        console.log(`Added ${role.name} to database`);
        promptUser();
    })
}

function addEmp(){
    inquirer.prompt([
        {
            type: 'input',
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
            type: 'input',
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