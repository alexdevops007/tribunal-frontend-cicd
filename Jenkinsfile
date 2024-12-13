pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
        DOCKER_IMAGE = 'vue-gestion-tribunaux'
        SONARQUBE_SERVER = 'SonarQube'
        DOCKER_CREDENTIALS = 'docker-credentials-id'
    }

    stages {
        stage('Checkout') {
            steps {
                // Récupérer le code depuis le dépôt Git
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    // Installer les dépendances
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Construire le frontend
                    sh 'npm run build'
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                script {
                    // Exécuter les tests unitaires
                    sh 'npm run test'
                }
            }
        }

        stage('Run E2E Tests') {
            steps {
                script {
                    // Exécuter les tests E2E avec Cypress
                    sh 'npm run test:e2e'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv(SONARQUBE_SERVER) {
                    // Exécuter l'analyse SonarQube
                    sh 'npm run sonar'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Construire une image Docker pour le frontend
                    sh """
                        docker build -t ${DOCKER_IMAGE}:latest .
                    """
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    script {
                        // Pousser l'image Docker sur le registre
                        sh """
                            echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
                            docker tag ${DOCKER_IMAGE}:latest your-docker-repo/${DOCKER_IMAGE}:latest
                            docker push your-docker-repo/${DOCKER_IMAGE}:latest
                        """
                    }
                }
            }
        }

        stage('Deploy to Development') {
            steps {
                script {
                    // Déployer sur l'environnement de développement
                    sh """
                        docker-compose -f docker-compose.yml up -d vue-frontend
                    """
                }
            }
        }

        stage('Deploy to Pre-Production') {
            steps {
                script {
                    // Déployer sur l'environnement de préproduction
                    sh """
                        docker-compose -f docker-compose.yml up -d vue-frontend-preprod
                    """
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    // Déployer sur l'environnement de production
                    sh """
                        docker-compose -f docker-compose.yml up -d vue-frontend-prod
                    """
                }
            }
        }
    }

    post {
        always {
            // Nettoyer l'espace de travail après l'exécution
            cleanWs()
        }
        success {
            // Notifier en cas de succès
            mail to: 'egec.rdc1@gmail.com',
                 subject: "Build Succès: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Le build ${env.BUILD_NUMBER} du job ${env.JOB_NAME} a réussi. Détails : ${env.BUILD_URL}"
        }
        failure {
            // Notifier en cas d'échec
            mail to: 'egec.rdc1@gmail.com',
                 subject: "Build Échec: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Le build ${env.BUILD_NUMBER} du job ${env.JOB_NAME} a échoué. Détails : ${env.BUILD_URL}"
        }
    }
}
