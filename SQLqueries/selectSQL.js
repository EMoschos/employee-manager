const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "HiAll08",
    database: "seed_db"
});

function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end()
    });
}

module.exports = { 
    viewAllEmployees
};