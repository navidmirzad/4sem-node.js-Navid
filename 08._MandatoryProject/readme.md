SQL:

CREATE TABLE applications (
	applicationId INT AUTO_INCREMENT PRIMARY KEY,
	Position varchar(255),
    CompanyName varchar(255),
    Location varchar(255),
    workModel varchar(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description varchar(255)
);

INSERT INTO applications (Position, CompanyName, Location, workModel, description) 
VALUES 
('Software Engineer', 'ABC Technologies', 'New York', 'Full-time', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
('Data Analyst', 'XYZ Inc.', 'San Francisco', 'Remote', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
('Product Manager', '123 Enterprises', 'Los Angeles', 'Hybrid', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
('Marketing Specialist', 'Acme Corporation', 'Chicago', 'Full-time', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'),
('Graphic Designer', 'Widgets Ltd.', 'Miami', 'Part-time', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
