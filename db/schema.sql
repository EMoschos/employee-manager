DROP DATABASE IF EXISTS seed_db;
CREATE database seed_db;
USE seed_db;

CREATE TABLE department (  
id  INT NOT NULL AUTO_INCREMENT,
depart VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL (10, 2),
department_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT, 
first_name VARCHAR(30), 
last_name VARCHAR(30),
role_id INT NOT NULL,
manager_id INT, 
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES employee(id)
);