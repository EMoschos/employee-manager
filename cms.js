const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
// const insertSQL = require("./SQLqueries/insertSQL");
// const selectSQL = require("./SQLqueries/selectSQL");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "HiAll08",
    database: "seed_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    cmsStart();
});

//Testing to see how to get info to show in inquirer
function cmsStart() {
    console.log(`
    ---------------------------
    |     TMS HR SOLUTIONS    |
    ---------------------------`);
    inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "rawlist",
            name: "startSelect",
            choices: [
                "CREATE NEW EMPLOYEE",
                "VIEW CURRENT EMPLOYEES",
                "VIEW CURRENT DEPARTMENTS",
                "VIEW CURRENT ROLES",
                "UPDATE EMPLOYEE ROLE",
                "DELETE EMPLOYEE",
                "FINISH"
            ]
        }
    ]).then(function (response) {
        switch (response.startSelect) {

            case ("CREATE NEW EMPLOYEE"):
                addHR();
                break;

            case ("VIEW CURRENT EMPLOYEES"):
                viewAllEmployees();
                break;

            case ("VIEW CURRENT DEPARTMENTS"):
                break;

            case ("VIEW CURRENT ROLES"):
                break;

            case ("UPDATE EMPLOYEE ROLE"):
                break;

            case ("DELETE EMPLOYEE"):
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


// INSERT (Add) into Table Functions
function addDepart(response) {
    connection.query("INSERT INTO department SET ?", { name: response.depart },
        function (err, res) {
            if (err) throw err;
            console.log("New department Added " + response.depart);
        }
    );
}

function addRole(response) {
    connection.query(
        "INSERT INTO role SET ?", { title: response.role, },
        function (err, res) {
            if (err) throw err;
            console.log("New role Added" + response.role);
        }
    );
}

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
                "FINISH"
            ]
        }
    ]).then(function (response) {
        switch (response.addSelect) {

            case ("ADD DEPARTMENT"):
                break;

            case ("ADD ROLE"):
                break;

            case ("ADD EMPLOYEE"):
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

// SELECT (View) from Table functions
function viewAllEmployees() {
    connection.query("SELECT * FROM employee", async function (err, res) {
        if (err) throw err;
        await console.table(res);
        cmsStart();
    });
}
