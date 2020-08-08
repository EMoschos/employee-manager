const connection = require("../db/connectDB");
const inquirer = require("inquirer");
const cms = require("../cms");

function addHR() {
    console.log("NOTE: If you chose to 'ADD EMPLOYEE' you will be provided with choices for 'DEPARTMENT' & 'ROLE'.")
    inquirer.prompt([
        {
            message: "WHAT HR ELEMENT WOULD YOU LIKE TO ADD?",
            type: "rawlist",
            name: "addSelect",
            choices: [
                "ADD DEPARTMENT",
                "ADD ROLE",
                "ADD EMPLOYEE",
                "RETURN TO MAIN MENU",
            ]
        }
    ]).then(function (response) {
        switch (response.addSelect) {

            case ("ADD DEPARTMENT"):
                console.log("Depart")
                addDepart();
                break;

            case ("ADD ROLE"):
                console.log("Role")
                addRole();
                break;

            case ("ADD EMPLOYEE"):
                console.log("Employee")

                addEmployeeAsync();
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

// Add Depart to the database
function addDepart() {
    inquirer.prompt([
        {
            name: "newDepart",
            type: "input",
            message: "ENTER NAME OF NEW DEPARTMENT"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO department SET ?", { depart: response.newDepart },
            function (err, res) {
                if (err) throw err;
                console.log("New department Added " + response.newDepart);
                addHR();
            }
        );
    })
}

//add role work to database with selection for department from database
function addRole() {
    let departName = [];
    let departInfo = [];
    connection.query("SELECT * FROM department", function (err, data) {
        for (let i = 0; i < data.length; i++) {
            departName.push(data[i].depart);
            departInfo.push(data[i]);
        }
        inquirer.prompt([
            {
                message: "WHAT DEPARTMENT DOES THE ROLE BELONG TO?",
                type: "rawlist",
                name: "departSelect",
                choices: departName
            },
            {
                name: "newRole",
                type: "input",
                message: "ENTER NAME OF ROLE"
            },
            {
                name: "newSalary",
                type: "input",
                message: "ENTER SALARY AMOUNT OF ROLE"
            }
        ]).then(function (response) {
            let departID;
            for (let i = 0; i < departInfo.length; i++) {
                if (response.departSelect === departInfo[i].depart) {
                    departID = departInfo[i].id
                    console.log(departID);
                }
            }
            connection.query("INSERT INTO role SET ?",
                {
                    title: response.newRole,
                    salary: response.newSalary,
                    department_id: departID
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("New role Added" + res.title);
                    addHR();
                }
            );
        })
    });
};

// BELOW FUNCTIONS USED TO CREATE THE EMPLOYEE WITH SELECTIONS FOR ROLES AND MANAGERS
async function getRoleInfoAsync() {
    let roleInfo = await connection.query("SELECT * FROM role;")
    return roleInfo;
}

async function getRoleNameAsync() {
    let roleName = [];
    let data = await getRoleInfoAsync()
    for (let i = 0; i < data.length; i++) {
        roleName.push(data[i].title);
    }
    return roleName;
}

async function getManagerAsync() {
    let managerInfo = await connection.query('SELECT employee.id, employee.first_name, employee.last_name, department.depart FROM employee INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON role.department_id=department.id WHERE role.title="Manager"')
    return managerInfo;
}

async function getManagerNameAsync() {
    let managerName = [];
    let mInfo = await getManagerAsync();
    for (let i = 0; i < mInfo.length; i++) {
        managerName.push(mInfo[i].first_name + " " + mInfo[i].last_name);
    }
    return managerName;
}


// Main Function for Adding an Employee to the database
async function addEmployeeAsync() {
    let roleName = await getRoleNameAsync();
    let roleInfo = await getRoleInfoAsync();
    let managerName = await getManagerNameAsync()
    let managerInfo = await getManagerAsync()
    inquirer.prompt([
        {
            message: "WHAT IS THE EMPLOYEES ROLE?",
            type: "rawlist",
            name: "roleSelect",
            choices: roleName
        },
        {
            name: "firstName",
            type: "input",
            message: "WHAT IS THE EMPLOYEES FIRST NAME"
        },
        {
            name: "lastName",
            type: "input",
            message: "WHAT IS THE EMPLOYEES LAST NAME"
        },
        {
            message: "WHO IS THE EMPLOYEES MANAGER?",
            type: "rawlist",
            name: "managerSelect",
            choices: [...managerName, "No Manger"]
        }
    ]).then(function (response) {
        let roleID;
        let managerID;
        for (let i = 0; i < roleInfo.length; i++) {
            if (response.roleSelect === roleInfo[i].title) {
                roleID = roleInfo[i].id
                console.log(roleID);
            }
        };
        for (let i = 0; i < managerName.length; i++) {
            if (response.managerSelect === (managerInfo[i].first_name + " " + managerInfo[i].last_name)) {
                managerID = managerInfo[i].id;
                console.log("Manager Selected with ID: " + managerID)
            } else {
                console.log("No Maanager Selected for the Employee")
            }
        };
        console.log(managerInfo)
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: roleID,
                manager_id: managerID
            },
            function (err, res) {
                console.log(res)
                if (err) throw err;
                console.log("New employee added");
                addHR();
            }
        );
    })
}


//Module export functions
module.exports = {
    addHR
};