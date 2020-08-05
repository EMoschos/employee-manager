USE seed_db;

INSERT INTO department (name)
VALUES ("Maintenance"),("Operations");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100000.00, 1), ("Mechanic", 75000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Terry", "Moschos", 1, null), ("Barry", "Bushman", 2, 1), ("Mad", "Max", 2, 1);

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;