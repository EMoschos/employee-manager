const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "HiAll08",
    database: "seed_db"
});

function addDepart(response) {
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
}

function addRole(response) {
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
    addEmployee };