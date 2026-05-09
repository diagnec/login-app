pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "cheikh9708"
        FRONTEND_IMAGE = "cheikh9708/frontend:latest"
        BACKEND_IMAGE  = "cheikh9708/backend:latest"
    }

    stages {

        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Verify Tools') {
            steps {
                sh '''
                    docker --version
                    kubectl version --client
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh "docker build -t $FRONTEND_IMAGE ./frontend"
            }
        }

        stage('Build Backend Image') {
            steps {
                sh "docker build -t $BACKEND_IMAGE ./backend"
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([string(credentialsId: 'docker-password', variable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u $DOCKERHUB_USER --password-stdin
                    '''
                }
            }
        }

        stage('Push Images') {
            steps {
                sh """
                    docker push $FRONTEND_IMAGE
                    docker push $BACKEND_IMAGE
                """
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl apply -f k8s/
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline réussi ✅"
        }
        failure {
            echo "Pipeline échoué ❌"
        }
    }
}
