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
                        console.log('\n');
                        console.table(depts);
                        promptUser();
                    })
                break;
            case 'View all roles':
                database.getRoles()
                    .then(([rows]) => {
                        var roles = rows;
                        console.log('\n');
                        console.table(roles);
                        promptUser();
                    })
                break;
            case 'View all employees':
                database.getEmps()
                    .then(([rows]) => {
                        var employees = rows;
                        console.log('\n');
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

// add department
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
    });
}

// add role
function addRole(){
    // get department names to display
    database.getDepts()
        .then(([rows]) => {
            var departments = rows;
            const departmentChoices = departments.map(({id, dept_name}) => ({
                name: dept_name,
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
            ]).then(role => {
                    database.createRole(role)
                    console.log(`\nAdded ${role.title} to database\n`);
                    promptUser();
                })
        })
    
}

// add employee
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
        // store results
        var firstName = res.first_name;
        var lastName = res.last_name;
        
        // get role titles to display
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
                    // store result
                    var roleId = res.roleId;

                    // get manager names to display
                    database.getEmps()
                        .then(([rows]) => {
                            var employees = rows;
                            const managerChoices = employees.map(({id, first_name, last_name}) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }))
                            // add no manager choice
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
                                console.log(`\nAdded ${firstName} ${lastName} to database\n`);
                                promptUser();
                            })
                        })
                })
            })
    })
}

// update employee role
function updateEmp() {
    // get employee names to display
    database.getEmps()
        .then(([rows]) => {
            var employees = rows;
            const employeeChoices = employees.map(({id, first_name, last_name}) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Select employee to update.',
                    choices: employeeChoices
                }
            ]).then(res => {
                // store result
                var employeeId = res.employeeId;

                // get role titles to display
                database.getRoles()
                .then(([rows]) => {
                    var roles = rows;
                    const roleChoices = roles.map(({id, title}) => ({
                      name: title,
                      value: id
                    }))
      
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "roleId",
                            message: "Select new role.",
                            choices: roleChoices
                        }
                    ]).then(res => {
                            database.updateEmployee(res.roleId, employeeId);
                            console.log('\nUpdated employee role\n');
                            promptUser();
                      })
                  });
            })
        })
}