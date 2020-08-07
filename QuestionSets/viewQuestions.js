const connection = require("../db/connectDB");
const cms = require("../cms");

function viewAllEmployees() {
    connection.query('SELECT e.id AS ID, e.first_name AS "First Name", e.last_name AS "Last Name", role.title AS Role, role.salary AS "Annual Salary", department.depart AS Department, CONCAT(s.first_name," ", s.last_name) AS Manager FROM employee e INNER JOIN role ON e.role_id=role.id INNER JOIN department ON role.department_id=department.id LEFT JOIN employee s ON s.id = e.manager_id;', async function (err, res) {
        if (err) throw err;
        await console.table(res);
        cms.cmsStart();
    });
};

function viewAllDeparts() {
    connection.query("SELECT * FROM department", async function (err, res) {
        if (err) throw err;
        await console.table(res);
        cms.cmsStart();
    });
};

function viewAllRoles() {
    connection.query("SELECT role.id, role.title, role.salary, department.depart FROM role INNER JOIN department ON role.department_id=department.id;", async function (err, res) {
        if (err) throw err;
        await console.table(res);
        cms.cmsStart();
    });
}

module.exports = {
    viewAllEmployees,
    viewAllDeparts,
    viewAllRoles
};