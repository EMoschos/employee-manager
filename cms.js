const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.log(res);
        cmsStart();
    });
});

//Testing to see how to get info to show in inquirer
function cmsStart() {
    var select = connection.query(
        "SELECT name FROM department",
        function (err, res) {
            if (err) throw err;
            console.log(JSON.stringify(res));
            console.log(res[0].name);
            inquirer.prompt([
                {
                    name: "nameFirst",
                    type: "input",
                    message: "What is the employees first name?"
                },
                {
                    name: "nameLast",
                    type: "input",
                    message: "What is the employees last name?"
                },
                {
                    name: "role",
                    type: "input",
                    message: res[0].name//Should print maintenance
                },
                {
                    name: "depart",
                    type: "input",
                    message: "What department will the employee work in?"
                }
            ]).then(function (response) {
                connection.query(
                    "INSERT INTO department SET ?",
                    {
                        name: response.depart,
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log("New department Added");
                    }
                );
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: response.role,
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log("New role Added" + res);
                    }
                );
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
            })
        }
    );
    
}