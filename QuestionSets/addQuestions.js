const inquirer = require("inquirer");
const cms = require("../cms");
const mysql = require("mysql");
const connection = require("../db/connectDB");

// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "HiAll08",
//     database: "seed_db"
// });

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId + "\n");
// });

function addHR(response) {
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

//Module export functions
module.exports = {
    addHR
};