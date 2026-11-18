# Gestion des ateliers

## a. Explication de l'architecture

Ce projet est une application web de gestion des ateliers.

Il utilise trois parties principales :

- **Frontend Angular :** permet à l'administrateur et aux formateurs de gérer les ateliers et de consulter les participants.
- **Backend Laravel :** gère les données, les utilisateurs, les ateliers et les inscriptions. Il fournit une API REST.
- **Application Python Flask :** permet aux participants de créer un compte, consulter les ateliers et s'inscrire.

La base de données utilisée est MySQL.

## b. Instructions d'installation

### 1. Base de données MySQL

- Démarrer MySQL avec XAMPP ou un autre serveur.
- Créer la base de données `gestion_ateliers`.
- Importer le fichier `gestion_ateliers.sql` dans phpMyAdmin.

### 2. Backend LaraveL  


Ouvrir un terminal dans le dossier `backend` :


composer install


Configurer le fichier .env avec les informations MySQL :
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gestion_ateliers
DB_USERNAME=root
DB_PASSWORD=

Puis exécuter :
php artisan key:generate
php artisan serve


### 3. Frontend Angular
Ouvrir un terminal dans le dossier frontend :
npm install
ng serve

Accéder à l'application :

http://localhost:4200