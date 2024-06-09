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

        stage('Build Frontend') {
            steps {
                script {
                    dir('backend') {
                        sh 'docker build -t $FRONTEND_CONTAINER .'
                    }
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                script {
                    dir('frontend') {
                        sh """
                        if [ \$(docker ps -a -q -f name=${FRONTEND_CONTAINER}) ]; then
                            docker stop ${FRONTEND_CONTAINER} || true
                            docker rm ${FRONTEND_CONTAINER} || true
                        fi

                        docker run -d -p 3007:3000 --name ${FRONTEND_CONTAINER} $FRONTEND_IMAGE
                        """
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    dir('backend') {
                        sh 'docker build -t $BACKEND_IMAGE .'
                    }
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                script {
                    dir('backend') {
                        sh """
                        if [ \$(docker ps -a -q -f name=${BACKEND_CONTAINER}) ]; then
                            docker stop ${BACKEND_CONTAINER} || true
                            docker rm ${BACKEND_CONTAINER} || true
                        fi

                        docker run -d -p 3006:3006 --name ${BACKEND_CONTAINER} $BACKEND_IMAGE
                        """
                    }
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
