# Étape 1 : Build du frontend avec Node.js
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers essentiels
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm install --only=production

# Copier tout le code source
COPY . .

# Construire l'application React
RUN npm run build

# Étape 2 : Exécution avec Nginx
FROM nginx:alpine

# Copier la configuration Nginx optimisée
COPY nginx.conf /etc/nginx/nginx.conf

# Copier l'application React buildée
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 pour accéder au frontend
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
