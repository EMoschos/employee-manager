
// ADDING EMPLOYEE DRAFT
connection.query("INSERT INTO employee SET ?", {
    first_name: response.nameFirst,
    last_name: response.nameLast,
},
    function (err, res) {
        if (err) throw err;
        console.log("New Employee Added" + response.nameFirst);
        connection.end();
    }
);

// Inital test to extract data from table to use for selection in inquirer
var select = connection.query(
    "SELECT name FROM department",
    function (err, res) {
        if (err) throw err;
        console.table(res)
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
            addDepart(response);
            addRole(response);
            addEmployee(response);
        })
    }
);