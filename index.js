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
            name: 'department',
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
    ]).then(({department}) => {
        database.createDept(department);
        console.log(`\nAdded ${department.name} to database\n`);
        promptUser();
    }).catch(console.log);
}

function addRole(){
    database.getDepts()
        .then(([rows]) => {
            var departments = rows;
            const departmentChoices = departments.map(({id, name}) => ({
                name: name,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the name of the role?',
                    validate: nameInput => {
                        if (nameInput) {
                        return true;
                        } else {
                        console.log('Please enter role!');
                        return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary rate?',
                    validate: salaryInput => {
                        if (salaryInput) {
                        return true;
                        } else {
                        console.log('Please enter a salary!');
                        return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Which department is the role under?',
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    database.createRole(role)
                        .then(() => console.log(`\nAdded ${role.title} to database\n`))
                        .then(() => promptUser())
                })
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
        }
    ]).then(res => {
        var firstName = res.first_name;
        var lastName = res.last_name;
        
        database.getRoles()
            .then(([rows]) => {
                var roles = rows;
                const roleChoices = roles.map(({id, title}) => ({
                    name: title,
                    value: id
                }))
                
                inquirer.prompt(
                    {
                        type: "list",
                        name: "roleId",
                        message: "Select employee role.",
                        choices: roleChoices
                    }
                ).then(res => {
                    var roleId = res.roleId;

                    database.getEmps()
                        .then(([rows]) => {
                            var employees = rows;
                            const managerChoices = employees.map(({id, first_name, last_name}) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }))
                            // default with no manager assigned
                            managerChoices.unshift({name: "None", value: null});

                            inquirer.prompt(
                                {
                                    type: 'list',
                                    name: 'managerId',
                                    message: 'Select employee manager.',
                                    choices: managerChoices
                                }
                            ).then(res => {
                                var employee = {
                                    manager_id: res.managerId,
                                    role_id: roleId,
                                    first_name: firstName,
                                    last_name: lastName
                                }

                                database.createEmp(employee)
                                    .then(() => console.log(`\nAdded ${firstName} ${lastName} to database\n`))
                                    .then(() => promptUser())
                            })
                        })
                })
            })
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