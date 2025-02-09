# Utiliser une image officielle de Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Installer PostgreSQL client (pour pg_isready)
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Copier les fichiers package.json et package-lock.json avant d'installer les dépendances
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm install --omit=dev

# Copier tout le code source
COPY . .

# Exposer le port utilisé par le backend
EXPOSE 5000

# Définir les variables d'environnement pour la connexion à la DB
ENV DB_HOST=${DB_HOST}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV DB_PORT=${DB_PORT}

# Attendre que la base de données soit prête avant de démarrer le serveur
CMD ["sh", "-c", "until pg_isready -h $DB_HOST -p $DB_PORT; do echo waiting for db; sleep 2; done; node server.js"]
