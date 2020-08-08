const connection = require("../db/connectDB");
const inquirer = require("inquirer");
const cms = require("../cms");
const { printTable } = require('console-table-printer');

function viewHR() {
    console.log("Viewing HR")
    inquirer.prompt([
        {
            message: "WHAT HR ELEMENT WOULD YOU LIKE TO VIEW?",
            type: "rawlist",
            name: "viewSelect",
            choices: [
                "VIEW CURRENT DEPARTMENTS",
                "VIEW CURRENT ROLES",
                "VIEW CURRENT EMPLOYEES",
                "RETURN TO MAIN MENU",
            ]
        }
    ]).then(function (response) {
        switch (response.viewSelect) {

            case ("VIEW CURRENT EMPLOYEES"):
                viewAllEmployees();
                break;

            case ("VIEW CURRENT DEPARTMENTS"):
                viewAllDeparts();
                break;

            case ("VIEW CURRENT ROLES"):
                viewAllRoles();
                break;

            case ("RETURN TO MAIN MENU"):
                console.log("Main Menu");
                cms.cmsStart();
                break;

            default:
                console.log("not valid selection");
                connection.end()
                process.exit()
                break;

        }
    })
};

// Functions containg querie responses to questions
function viewAllDeparts() {
    connection.query("SELECT department.id AS ID, department.depart AS DEPART FROM department;", async function (err, res) {
        if (err) throw err;
        await printTable(res);
        viewHR();
    });
};

function viewAllRoles() {
    connection.query("SELECT role.id AS ID, role.title AS TITLE, role.salary AS SALARY, department.depart AS DEPART FROM role INNER JOIN department ON role.department_id=department.id ORDER BY role.salary DESC;", async function (err, res) {
        if (err) throw err;
        await printTable(res);
        viewHR();
    });
};

function viewAllEmployees() {
    connection.query('SELECT e.id AS ID, e.first_name AS "FIRST NAME", e.last_name AS "LAST NAME", role.title AS ROLE, role.salary AS "ANNUAL SALARY", department.depart AS DEPARTMENT, CONCAT(s.first_name," ", s.last_name) AS MANAGER FROM employee e INNER JOIN role ON e.role_id=role.id INNER JOIN department ON role.department_id=department.id LEFT JOIN employee s ON s.id = e.manager_id ORDER BY e.id ASC;', async function (err, res) {
        if (err) throw err;
        await printTable(res);
        viewHR();
    });
};

module.exports = {
    viewHR,
    viewAllEmployees,
    viewAllDeparts,
    viewAllRoles
};