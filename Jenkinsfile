pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'gazintest/frontend'
        BACKEND_IMAGE = 'gazintest/backend'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'personal_token', url: 'https://github.com/gabrielparanhosdev/cryptoai_website'
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    dir('frontend') {
                        sh 'ls -al'
                        sh """
                        docker build -t $FRONTEND_IMAGE .

                        if [ \$(docker ps -a -q -f name=${FRONTEND_IMAGE}) ]; then
                            docker stop ${FRONTEND_IMAGE} || true
                            docker rm ${FRONTEND_IMAGE} || true
                        fi

                        docker run -d -p 3007:3007 --name ${FRONTEND_IMAGE} $FRONTEND_IMAGE
                        """
                    }
                }
            }
        }

        stage('Build Backend') {
            sh 'ls -al'
            steps {
                script {
                    dir('backend') {
                        sh """
                        docker build -t $BACKEND_IMAGE .

                        if [ \$(docker ps -a -q -f name=${BACKEND_IMAGE}) ]; then
                            docker stop ${BACKEND_IMAGE} || true
                            docker rm ${BACKEND_IMAGE} || true
                        fi

                        docker run -d -p 3006:3006 --name ${BACKEND_IMAGE} $BACKEND_IMAGE
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
