pipeline {
    agent any

    parameters {
        string(
            name: 'SERVER_IP',
            defaultValue: '34.234.236.176',
            description: 'EC2 public IP'
        )
    }

    environment {
        FRONTEND_IMAGE = "karimshahid/frontend:latest"
        BACKEND_IMAGE  = "karimshahid/backend:latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/KarimShahid/Momo_Pasal_Jenkins.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh "docker build -t ${BACKEND_IMAGE} ./backend"
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    sh """
                    docker build \
                      --build-arg VITE_API_URL=http://${params.SERVER_IP}:4000/api \
                      -t ${FRONTEND_IMAGE} \
                      ./frontend
                    """
                }
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh """
                docker push ${BACKEND_IMAGE}
                docker push ${FRONTEND_IMAGE}
                """
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@${params.SERVER_IP} \\
                    'docker compose pull &&
                     docker compose down &&
                     docker compose up -d'
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment completed successfully"
        }
        failure {
            echo "❌ Deployment failed"
        }
    }
}
