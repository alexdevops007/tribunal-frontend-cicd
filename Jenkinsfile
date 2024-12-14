pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'gestion-tribunaux-frontend'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        REGISTRY = 'localhost:5000'
        NODE_ENV = 'production'
        SONAR_HOST_URL = 'http://localhost:9000'
        SONAR_PROJECT_KEY = 'gestion-tribunaux'
        SONAR_LOGIN = credentials('squ_19bf18734ca81d4c2a17917c8ec525505a623143') // Assurez-vous d'ajouter un jeton SonarQube dans les credentials Jenkins
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo 'Running unit tests...'
                sh 'npm run test:coverage'
            }
            post {
                always {
                    publishHTML([allowMissing: false,
                                 alwaysLinkToLastBuild: true,
                                 keepAll: true,
                                 reportDir: 'coverage',
                                 reportFiles: 'index.html',
                                 reportName: 'Coverage Report'])
                }
            }
        }

        stage('Run E2E Tests') {
            steps {
                echo 'Running end-to-end tests...'
                sh 'npm run test:e2e'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'Running SonarQube analysis...'
                withSonarQubeEnv('sonarServer') { // Nom du serveur SonarQube dans Jenkins
                    sh 'npm run sonar'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh """
                    docker build -t ${REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG} .
                    docker tag ${REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG} ${REGISTRY}/${DOCKER_IMAGE}:latest
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image to registry...'
                sh """
                    docker push ${REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}
                    docker push ${REGISTRY}/${DOCKER_IMAGE}:latest
                """
            }
        }

        stage('Deploy to Development') {
            when {
                branch 'develop'
            }
            steps {
                echo 'Deploying to Development...'
                sh """
                    docker stop vue-frontend-dev || true
                    docker rm vue-frontend-dev || true
                    docker run -d --name vue-frontend-dev \
                        -e NODE_ENV=development \
                        -p 3000:80 ${REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}
                """
            }
        }

        stage('Deploy to Preproduction') {
            when {
                branch 'preprod'
            }
            steps {
                echo 'Deploying to Preproduction...'
                sh """
                    docker stop vue-frontend-preprod || true
                    docker rm vue-frontend-preprod || true
                    docker run -d --name vue-frontend-preprod \
                        -e NODE_ENV=production \
                        -p 4000:80 ${REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}
                """
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to Production...'
                sh """
                    docker stop vue-frontend-prod || true
                    docker rm vue-frontend-prod || true
                    docker run -d --name vue-frontend-prod \
                        -e NODE_ENV=production \
                        -p 5000:80 ${REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}
                """
            }
        }
    }

    post {
        always {
            echo 'Cleaning workspace...'
            node {
                cleanWs()
            }
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            mail to: 'admin@example.com',
                 subject: "Build Failed: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                 body: "The build has failed. Check the Jenkins logs for details."
        }
    }
}
