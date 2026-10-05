CREATE TABLE sites (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100),
    url VARCHAR(255) NOT NULL UNIQUE,
    backend_stack VARCHAR(255),
    database_stack VARCHAR(255),
    repsitory_url VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	ON UPDATE CURRENT_TIMESTAMP,

    company_id INT NOT NULL,

    CONSTRAINT fk_sites_company
	FOREIGN KEY (company_id)
	REFERENCES companies(id)
);
