const connection = require("../db/connectDB");
const inquirer = require("inquirer");
const cms = require("../cms");
const { printTable } = require('console-table-printer');



async function updateHR() {
    let empRoleName = await displayEmployeeRole();
    let empAllInfo = await getRoleInfoAsync();
    let roleTitle = await getRoleID();
    let roleTitleID = await getRoleTitleID(); 
    inquirer.prompt([
        {
            message: "WHICH EMPLOYEE WOULD YOU LIKE TO UPDATE THEIR ROLE?",
            type: "rawlist",
            name: "updateSelect",
            choices: [
                ...empRoleName,
                "EXIT UPDATE"
            ]
        },
        {
            message: "WHICH NEW ROLE WOULD YOU LIKE THE EMPLOYEE ASSIGNED?",
            type: "rawlist",
            name: "titleSelect",
            choices: roleTitle
        }
    ]).then(function (response) {
        let employID;
        let roleID;
        for (let i = 0; i < empAllInfo.length; i++) {
            if (response.updateSelect === empAllInfo[i].employee) {
                employID = empAllInfo[i].id
            } 
        };
        console.log(employID)
        for (let i = 0; i < roleTitleID.length; i++) {
            if (response.titleSelect === roleTitleID[i].title) {
                roleID = roleTitleID[i].id
            } 
        }
        connection.query("UPDATE employee SET role_id = ? WHERE employee.id = ?;",
            [roleID, employID],
            function (err, res) {
                if (err) throw err;
                console.log("Role Updated");
                cms.cmsStart();
            }
        );
    })
}

async function getRoleInfoAsync() {
    let roleInfo = await connection.query('SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name, " Role: ", role.title) AS employee, role.id AS roleid, role.title AS role FROM employee INNER JOIN role ON employee.role_id=role.id ORDER BY employee.id;');
    console.log(roleInfo);
    return roleInfo;
};

async function displayEmployeeRole() {
    let employeeRole = [];
    let rInfo = await getRoleInfoAsync()
    for (let i = 0; i < rInfo.length; i++) {
        employeeRole.push(rInfo[i].employee);
    }
    console.log(employeeRole);
    return employeeRole;
}

async function getRoleID() {
    let roleTitle = [];
    let empRoleInfo = await connection.query('SELECT role.title FROM role;');
    for (let i = 0; i < empRoleInfo.length; i++) {
        roleTitle.push(empRoleInfo[i].title);
    };
    return roleTitle;
}

async function getRoleTitleID() {
    let empRoleInfo = await connection.query('SELECT role.id, role.title FROM role ORDER BY role.id;');
    return empRoleInfo;
}

//Module export functions
module.exports = {
    updateHR
};