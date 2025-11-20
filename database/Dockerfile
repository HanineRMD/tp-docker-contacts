# Utilisation de l'image officielle MySQL
FROM mysql:8.0

# Variables d'environnement
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=contacts_db

# Copie du script d'initialisation
COPY init.sql /docker-entrypoint-initdb.d/

# Exposition du port MySQL
EXPOSE 3306