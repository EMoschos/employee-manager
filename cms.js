const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const addQuest = require("./QuestionSets/addQuestions")
// const insertSQL = require("./SQLqueries/insertSQL");
// const selectSQL = require("./SQLqueries/selectSQL");

function init() {
    titleDisplay();
    cmsStart();
}

init();

function titleDisplay () {
    console.log(`
    ---------------------------
    |     TMS HR SOLUTIONS    |
    ---------------------------`);
}

//Testing to see how to get info to show in inquirer
function cmsStart() {
    inquirer.prompt([
        {
            message: "HOW WOULD YOU LIKE TO PROCEED?",
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
                addQuest.addHR();
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

// SELECT (View) from Table functions
function viewAllEmployees() {
    connection.query("SELECT * FROM employee", async function (err, res) {
        if (err) throw err;
        await console.table(res);
        cmsStart();
    });
}

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

module.exports.cmsStart = cmsStart; //Create own file once done
