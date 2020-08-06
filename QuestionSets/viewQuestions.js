const connection = require("../db/connectDB");
const cms = require("../cms");

function viewAllEmployees() {
    connection.query("SELECT * FROM employee", async function (err, res) {
        if (err) throw err;
        await console.table(res);
        cms.cmsStart();
    });
};

function viewAllDeparts() {
    connection.query("SELECT * FROM department", async function (err, res) {
        if (err) throw err;
        await console.table(res);
        cms.cmsStart();
    });
};

function viewAllRoles() {
    connection.query("SELECT * FROM role", async function (err, res) {
        if (err) throw err;
        await console.table(res);
        cms.cmsStart();
    });
}

module.exports = {
    viewAllEmployees,
    viewAllDeparts,
    viewAllRoles
};