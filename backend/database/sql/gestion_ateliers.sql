CREATE DATABASE IF NOT EXISTS gestion_ateliers
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE gestion_ateliers;

CREATE TABLE role_types (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role_type_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    CONSTRAINT fk_users_role
        FOREIGN KEY (role_type_id) REFERENCES role_types(id)
        ON DELETE RESTRICT
);

CREATE TABLE ateliers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    duree INT NOT NULL,
    formateur_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    CONSTRAINT fk_ateliers_formateur
        FOREIGN KEY (formateur_id) REFERENCES users(id)
        ON DELETE SET NULL
);

CREATE TABLE atelier_participant (
    user_id BIGINT UNSIGNED NOT NULL,
    atelier_id BIGINT UNSIGNED NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, atelier_id),
    CONSTRAINT fk_inscription_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_inscription_atelier
        FOREIGN KEY (atelier_id) REFERENCES ateliers(id)
        ON DELETE CASCADE
);

INSERT INTO role_types (name, created_at, updated_at) VALUES
('Administrateur', NOW(), NOW()),
('Formateur', NOW(), NOW()),
('Participant', NOW(), NOW());




INSERT INTO users (email, name, password, role_type_id, created_at, updated_at)
VALUES
('admin@gmail.com', 'Admin', '1234', 1, NOW(), NOW()),
('f1@gmail.com', 'Amin', '1234', 2, NOW(), NOW()),
('f2@gmail.com', 'Chahd', '1234', 2, NOW(), NOW()),
('f3@gmail.com', 'Amel', '1234', 2, NOW(), NOW()),
('p1@gmail.com', 'Ahmed', '1234', 3, NOW(), NOW()),
('p2@gmail.com', 'Sara', '1234', 3, NOW(), NOW()),
('p3@gmail.com', 'Yasmine', '1234', 3, NOW(), NOW());

INSERT INTO ateliers
(titre, description, date, duree, formateur_id, created_at, updated_at)
VALUES
('Développement Web', 'Formation HTML, CSS et JavaScript', '2026-12-10', 3, 2, NOW(), NOW()),
('Programmation Python', 'Initiation à Python', '2026-12-15', 4, 3, NOW(), NOW()),
('Développement Angular', 'Création d applications avec Angular', '2026-12-20', 5, 2, NOW(), NOW());

INSERT INTO atelier_participant
(user_id, atelier_id, date_inscription)
VALUES
(5, 1, NOW()),
(6, 1, NOW()),
(7, 2, NOW()),
(5, 3, NOW()),
(6, 3, NOW());