# Gestion-Cours-Tribunaux

Gestion-Cours-Tribunaux est une application de gestion des cours et tribunaux de la RDC, offrant des fonctionnalités CRUD complètes, intégrée avec une architecture moderne et une pipeline CI/CD automatisée.

## Table des matières
1. [Technologies](#technologies)
2. [Fonctionnalités](#fonctionnalités)
3. [Prérequis](#prérequis)
4. [Installation](#installation)
5. [Scripts Disponibles](#scripts-disponibles)
6. [Structure des Dossiers](#structure-des-dossiers)
7. [CI/CD](#cicd)
8. [Contribution](#contribution)

## Technologies

### Backend
- Node.js
- Express.js
- MongoDB
- Docker
- SonarQube
- GitLab CI/CD & Jenkins

### Frontend
- Vue.js 3
- Pinia
- Composition API
- Tailwind CSS
- Axios
- Vue Router

## Fonctionnalités
1. **Gestion des Tribunaux** : Ajouter, modifier, supprimer et lister les tribunaux.
2. **Analyse de Code** : Intégration de SonarQube avec couverture de code minimale de 70%.
3. **CI/CD Automatisé** : Pipelines GitLab et Jenkins pour tests, build, analyse et déploiement.
4. **Déploiement Docker** : Conteneurisation avec Docker et orchestration avec Docker Compose.
5. **Déploiement sur Firebase** : Déploiement automatique du frontend sur Firebase Hosting.

## Prérequis
- Node.js (>= 14.x)
- npm ou yarn
- Docker et Docker Compose
- MongoDB
- GitLab et/ou Jenkins

## Installation

### Backend
1. Clonez le dépôt :
    ```bash
    git clone https://github.com/votre-compte/gestion-cours-tribunaux-backend.git
    cd gestion-cours-tribunaux-backend
    ```
2. Installez les dépendances :
    ```bash
    npm install
    ```
3. Configurez les variables d'environnement :
    ```bash
    cp .env.example .env
    ```
4. Démarrez les services Docker :
    ```bash
    docker-compose up -d
    ```

### Frontend
1. Clonez le dépôt :
    ```bash
    git clone https://github.com/votre-compte/gestion-cours-tribunaux-frontend.git
    cd gestion-cours-tribunaux-frontend
    ```
2. Installez les dépendances :
    ```bash
    npm install
    ```
3. Configurez les variables d'environnement :
    ```bash
    cp .env.example .env
    ```
4. Démarrez le serveur de développement :
    ```bash
    npm run dev
    ```

## Scripts Disponibles

### Backend
- `npm run dev` : Démarrer le serveur en mode développement avec nodemon.
- `npm run test` : Exécuter les tests unitaires.
- `npm run sonar` : Lancer l'analyse SonarQube.

### Frontend
- `npm run dev` : Démarrer le serveur de développement.
- `npm run build` : Construire l'application pour la production.
- `npm run test:unit` : Exécuter les tests unitaires avec Jest.
- `npm run test:e2e` : Exécuter les tests end-to-end avec Cypress.

## Structure des Dossiers

gestion-cours-tribunaux/ ├── backend/ │ ├── config/ │ ├── controllers/ │ ├── models/ │ ├── routes/ │ ├── services/ │ ├── tests/ │ ├── Dockerfile │ ├── docker-compose.yml │ ├── sonar-project.js │ ├── server.js │ └── package.json ├── frontend/ │ ├── src/ │ │ ├── assets/ │ │ ├── components/ │ │ ├── mocks/ │ │ ├── router/ │ │ ├── services/ │ │ ├── store/ │ │ ├── views/ │ │ ├── App.vue │ │ └── main.js │ ├── cypress/ │ ├── Dockerfile │ ├── docker-compose.yml │ ├── jest.config.js │ ├── sonar-project.js │ ├── package.json │ ├── tailwind.config.js │ ├── postcss.config.js │ └── vite.config.js └── README.md


## CI/CD

### GitLab CI/CD
Pipeline intégré dans `.gitlab-ci.yml` pour exécuter les tests, l'analyse SonarQube, le build Docker, et le déploiement sur Firebase.

### Jenkins
Pipeline configuré dans `Jenkinsfile` pour automatiser les étapes de CI/CD similaires à GitLab.

## Contribution

Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour discuter des changements.

---
