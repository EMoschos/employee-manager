const connection = require("../db/connectDB");
const inquirer = require("inquirer");
const cms = require("../cms");
// const insertSQL = require("../SQLqueries/insertSQL");

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
                "FINISH"
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
                break;

            case ("RETURN TO MAIN MENU"):
                console.log("Main Menu");
                cms.cmsStart();
                break;

            case ("FINISH"):
                connection.end();
                process.exit();
                break;

            default:
                console.log("not valid selection");
                connection.end()
                process.exit()
                break;

        }
    })
};

//Add Functions for each HR Element
function addDepart() {
    inquirer.prompt([
        {
            name: "newDepart",
            type: "input",
            message: "ENTER NAME OF NEW DEPARTMENT"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO department SET ?", { name: response.newDepart },
            function (err, res) {
                if (err) throw err;
                console.log("New department Added " + response.newDepart);
                addHR();
            }
        );
    })
}

function addRole() {
    let departName = [];
    let departInfo = [];
    connection.query("SELECT * FROM department", function (err, data) {
        for (let i = 0; i < data.length; i++) {
            departName.push(data[i].name);
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
                if (response.departSelect === departInfo[i].name) {
                    departID = departInfo[i].id
                    console.log(departID);
                }
            }
           
            connection.query("INSERT INTO role SET ?",
                {
                    title: response.newRole,
                    salary: response.newSalary,
                    department_id: departID,
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

//Still need to make it work
function addEmployee(response) {
    connection.query(
        "INSERT INTO employee SET ?",
        {
            first_name: response.nameFirst,
            last_name: response.nameLast,
        },
        function (err, res) {
            if (err) throw err;
            console.log("New Empliyee Added" + res);
            connection.end();
        }
    );
}

//Module export functions
module.exports = {
    addHR
};