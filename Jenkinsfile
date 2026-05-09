pipeline {
    agent any

    environment {
        DOCKER_USER = "cheikh9708"
        FRONTEND_IMAGE = "${DOCKER_USER}/frontend:latest"
        BACKEND_IMAGE  = "${DOCKER_USER}/backend:latest"
        K8S_NAMESPACE = "default"
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
                sh """
                docker build -t ${FRONTEND_IMAGE} ./frontend
                """
            }
        }

        stage('Build Backend Image') {
            steps {
                sh """
                docker build -t ${BACKEND_IMAGE} ./backend
                """
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([string(credentialsId: 'docker-password', variable: 'DOCKER_PASSWORD')]) {
                    sh '''
                    echo $DOCKER_PASSWORD | docker login -u cheikh9708 --password-stdin
                    '''
                }
            }
        }

        stage('Push Images') {
            steps {
                sh """
                docker push ${FRONTEND_IMAGE}
                docker push ${BACKEND_IMAGE}
                """
            }
        }

        stage('Setup Kubernetes Config') {
            steps {
                withCredentials([string(credentialsId: 'kube-token', variable: 'KUBE_TOKEN')]) {
                    sh '''
                    set -e

                    mkdir -p $HOME/.kube

                    cat > $HOME/.kube/config <<EOF
apiVersion: v1
kind: Config
clusters:
- name: minikube
  cluster:
    server: https://$(minikube ip):8443
    insecure-skip-tls-verify: true

contexts:
- name: jenkins
  context:
    cluster: minikube
    user: jenkins

current-context: jenkins

users:
- name: jenkins
  user:
    token: $KUBE_TOKEN
EOF

                    kubectl get nodes
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl apply -f k8s/

                kubectl rollout status deployment/frontend-deployment || true
                kubectl rollout status deployment/backend-deployment || true
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline réussi 🚀"
        }

        failure {
            echo "Pipeline échoué ❌"
        }
    }
}
