# Utiliser une image officielle de Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Installer PostgreSQL client (pour pg_isready)
RUN apt-get update && apt-get install -y postgresql-client

# Copier les fichiers package.json et package-lock.json avant d'installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Exposer le port utilisé par le backend
EXPOSE 5000

# Lancer le serveur après s'être assuré que la base de données est prête
CMD ["sh", "-c", "until pg_isready -h db -p 5432; do echo waiting for db; sleep 2; done; node server.js"]
