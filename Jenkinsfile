pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'gazintest/frontend'
        BACKEND_IMAGE = 'gazintest/backend'
        FRONTEND_CONTAINER = 'frontend_container'
        BACKEND_CONTAINER = 'backend_container'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'personal_token', url: 'https://github.com/gabrielparanhosdev/gazin-test'
            }
        }

        stage('Build and Deploy with Docker Compose') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d --build'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker system prune -f'
        }
    }
}
