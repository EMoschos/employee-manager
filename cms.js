const mysql = require("mysql");
const inquirer = require("inquirer");
const addQuest = require("./QuestionSets/addQuestions")
const viewQuest = require("./QuestionSets/viewQuestions")
const updateQuest = require("./QuestionSets/updateQuestions")
const connection = require("./db/connectDB");
// const insertSQL = require("./SQLqueries/insertSQL");
// const selectSQL = require("./SQLqueries/selectSQL");

function init() {
    console.log(`
    ---------------------------
    |     TMS HR SOLUTIONS    |
    ---------------------------`);
    cmsStart();
}
init();

//Testing to see how to get info to show in inquirer
function cmsStart() {
    inquirer.prompt([
        {
            message: "HOW WOULD YOU LIKE TO PROCEED?",
            type: "rawlist",
            name: "startSelect",
            choices: [
                "CREATE NEW HR ELEMENT",
                "VIEW HR ELEMENTS",
                "UPDATE EMPLOYEE ROLE",
                "DELETE EMPLOYEE",
                "FINISH"
            ]
        }
    ]).then(function (response) {
        switch (response.startSelect) {

            case ("CREATE NEW HR ELEMENT"):
                addQuest.addHR();
                break;

            case ("VIEW HR ELEMENTS"):
                viewQuest.viewHR();
                break;

            case ("UPDATE EMPLOYEE ROLE"):
                updateQuest.updateHR()
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

module.exports.cmsStart = cmsStart; //Create own file once done
