# TP Docker - Gestion de Contacts
## Déploiement Multi-Conteneurs Sans Docker Compose

### 🎯 Objectif
Démontrer les défis de la gestion manuelle de conteneurs multiples et justifier l'utilité de Docker Compose.

### 🏗️ Architecture
- **Frontend** : Node.js + Express + HTML/CSS/JS
- **Base de données** : MySQL 8.0
- **Réseau** : Docker network personnalisé

### 🚀 Démarrage manuel (Sans Docker Compose)

```bash
# 1. Construction des images
docker build -t contacts-db ./database
docker build -t contacts-frontend ./frontend

# 2. Création du réseau
docker network create contacts-network

# 3. Lancement des conteneurs
docker run -d --name contacts-db-container --network contacts-network -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=contacts_db contacts-db
docker run -d --name contacts-frontend-container --network contacts-network -p 3000:3000 -e DB_HOST=contacts-db-container -e DB_USER=root -e DB_PASSWORD=password -e DB_NAME=contacts_db contacts-frontend

# 4. Accès à l'application
http://localhost:3000
