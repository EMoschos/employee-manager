USE seed_db;

INSERT INTO department (name)
VALUES ("Maintenance");

INSERT INTO department (name)
VALUES ("Operations");

INSERT INTO role (title, salary, department_id)
VALUES ("Mechanic", 75000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Terry", "Moschos", 1, 0);

SELECT * FROM employee;