DROP DATABASE IF EXISTS seed_db;
CREATE database seed_db;
USE seed_db;

CREATE TABLE department (  
id  INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL (10, 2),
department_id INT NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT, 
first_name VARCHAR(30), 
last_name VARCHAR(30),
role_id INT NOT NULL,
manager_id INT, 
PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Maintenance");

INSERT INTO department (name)
VALUES ("Operations");

INSERT INTO role (title, salary, department_id)
VALUES ("Mechanic", 75000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Terry", "Moschos", 1, 0);

SELECT * FROM employee;