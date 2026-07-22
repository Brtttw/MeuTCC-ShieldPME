CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    description VARCHAR(255)
)

CREATE TABLE users (
    id 	INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
	ON UPDATE CURRENT_TIMESTAMP,
    role_id INT NOT NULL,
    CONSTRAINT fk_users_role
	FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE role_permissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    CONSTRAINT fk_role_permissions_role
	FOREIGN KEY (role_id)
	REFERENCES roles(id),
    CONSTRAINT fk_role_permissions_permission
	FOREIGN KEY (permissions_id) 
	REFERENCES permissions(id)
);


