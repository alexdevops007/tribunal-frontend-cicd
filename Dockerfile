# Dockerfile
FROM node:18.20.5-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les autres fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Exposer le port 5173 (par défaut pour Vite)
EXPOSE 5173

# Commande de démarrage
CMD ["npm", "run", "preview"]
