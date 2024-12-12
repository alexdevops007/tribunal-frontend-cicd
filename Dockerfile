# Étape 1 : Construction
FROM node:18.20.5 as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./
COPY vite.config.js ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Serveur pour servir les fichiers statiques
FROM nginx:stable-alpine

# Copier les fichiers construits dans le dossier nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copier le fichier de configuration nginx si nécessaire
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour accéder à l'application
EXPOSE 80

# Commande par défaut pour lancer nginx
CMD ["nginx", "-g", "daemon off;"]
