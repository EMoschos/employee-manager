USE seed_db;

INSERT INTO department (depart)
VALUES ("Maintenance"),("Operations");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100000.00, 1), ("Mechanic", 75000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Terry", "Moschos", 1, null), ("Barry", "Bushman", 2, 1), ("Mad", "Max", 2, 1);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;

-- Select and view all departments
SELECT department.id AS ID, department.depart AS DEPART FROM department;

-- Select all view all roles
SELECT role.id AS ID, role.title AS TITLE, role.salary AS SALARY, department.depart AS DEPART FROM role INNER JOIN department ON role.department_id=department.id ORDER BY role.salary DESC;

-- Search for all Employees with Manager Name
SELECT e.id AS ID, e.first_name AS "FIRST NAME", e.last_name AS "LAST NAME", role.title AS Role, role.salary AS "ANNUAL SALARY", department.depart AS DEPARTMENT, CONCAT(s.first_name," ", s.last_name) AS MANAGER
FROM employee e
INNER JOIN role ON e.role_id=role.id 
INNER JOIN department ON role.department_id=department.id
LEFT JOIN employee s ON s.id = e.manager_id
ORDER BY e.id;

-- UPDATE with test values
UPDATE employee SET role_id = 2 WHERE employee.id = 3;
