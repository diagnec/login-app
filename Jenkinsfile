pipeline{
    agent any

    environment {
        DOCKER_USER = 'cheikh9708'

        FRONTEND_IMAGE = "${DOCKER_USER}/frontend:latest"

        BACKEND_IMAGE = "${DOCKER_USER}/backend:latest"
    }

    stages {

        stage('Clone Repository') {

            steps {
                git 
            }
        }

        stage('Verify Docker') {
            steps {
                sh 'docker --version'
            }
        }

        stage('Build Frontend Docker Image') {

            steps {
                sh 'docker build -t $FRONTEND_IMAGE ./frontend'
            }
        }

        stage('Build Backend Docker Image') {

            steps {
                sh 'docker build -t $BACKEND_IMAGE ./backend'
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',

                    usernameVariable: 'DOCKER_USERNAME',

                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh '''
                    echo $DOCKER_PASSWORD | docker login \
                    -u $DOCKER_USERNAME \
                    --password-stdin
                    '''
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh 'docker push $FRONTEND_IMAGE'
            }
        }

        stage('Push Backend Image') {
            steps {
                sh 'dpcker push $BACKEND_IMAGE'
            }
        }
        
        stage('Deploy Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }

    post {
        success {
            echo 'Application deployée avec succès!'
        }

        failure {
            echo 'Pipeline échouée!'
        }
    } 
        
}