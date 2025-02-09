# Étape 1 : Build du frontend avec Node.js
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le code source
COPY . .

# Construire l'application React
RUN npm run build

# Étape 2 : Exécution avec Nginx
FROM nginx:alpine

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copier l'application React buildée
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 pour accéder au frontend
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
