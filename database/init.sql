-- Création de la base de données
CREATE DATABASE IF NOT EXISTS contacts_db;
USE contacts_db;

-- Création de la table contacts
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion de données de test (optionnel)
INSERT IGNORE INTO contacts (nom, email) VALUES
('hanine romdhane', 'hanine.romthane@email.com'),
('sirine romthane', 'syrine.rmd@email.com'),
('asil rmd', 'asil.rmd@email.com');