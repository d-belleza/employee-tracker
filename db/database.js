const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    // MySQL username
    user: "root",
    // MySQL password
    password: "david@1222",
    database: "employee_db"
});

// if there is connection error
connection.connect(function (err) {
    if (err) throw err;
});

class Database {
    // class constructor
    constructor(connection){
        this.connection = connection;
    }

    // class methods
    getDepts(){
        return connection.promise().query(
            'SELECT id, dept_name FROM departments;'
        );
    }

    getRoles(){
        return connection.promise().query(
            'SELECT roles.id, roles.title, departments.dept_name AS departments, roles.salary FROM roles LEFT JOIN departments on roles.department_id = departments.id;'  
        );
    }

    getEmps(){
        return connection.promise().query(
            "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept_name AS departments, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id;"
        );
    }

    createDept(department){
        return this.connection.promise().query(
            'INSERT INTO departments SET ?', {dept_name: department}
        )
    }

    createRole(role){
        return this.connection.promise().query(
            'INSERT INTO roles SET ?', role
        )
    }

    createEmp(employee){
        return this.connection.promise().query(
            'INSERT INTO employees SET ?', employee
        )
    }

    updateEmployee(roleId, employeeId){
        return this.connection.promise().query(
            'UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId]
        )
    }

    quit(){
        connection.end();
    }
}

module.exports = new Database(connection);