const connection = require("../db/connectDB");
const inquirer = require("inquirer");
const cms = require("../cms");

function updateHR() {
    console.log("Choose and Employee to update")
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
}


//Module export functions
module.exports = {
    updateHR
};