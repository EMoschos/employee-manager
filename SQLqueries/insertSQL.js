//Currently not in USE 7/08/20

const connection = require("../db/connectDB");
const inquirer = require("inquirer");

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
            }
        );
    })
}

async function addRole() {
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
                    console.log("New role Added" + res);
                }
            );
        })
    });

}

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

module.exports = {
    addDepart,
    addRole,
    addEmployee
};