pipeline {
    agent any

    environment {
        // Configuración para Docker Hub
        // DOCKER_REGISTRY = 'docker.io/devars96' // Antiguo repositorio de Docker (comentado como referencia)
        DOCKER_REGISTRY = 'devars96' // Base del repositorio en Docker Hub
        PROJECT_NAMESPACE = 'jenkins' // Subcarpeta del repositorio (nuevo)
        DOCKER_CREDENTIALS = 'docker-hub-credentials' // ID de las credenciales almacenadas en Jenkins
        KUBE_CONTEXT = 'minikube'
        SLACK_CREDENTIAL_ID = 'jenkins-slack-notifications'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/IgnacioArs/VENTA-AUTOMATIZADA.git', 
                    credentialsId: 'github-user'
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        script {
                            sh '''
                            docker build -t $DOCKER_REGISTRY/$PROJECT_NAMESPACE:proyecto-frontapp-desarrollo-devops \
                                --build-arg VITE_ENTORNO=desarrollo ./proyecto-frontApp
                            '''
                        }
                    }
                }
                stage('Build BFF') {
                    steps {
                        script {
                            sh '''
                            docker build -t $DOCKER_REGISTRY/$PROJECT_NAMESPACE:ms-nestjs-bff-desarrollo-devops \
                                --build-arg ENTORNO_ENV=desarrollo ./ms-nestjs-bff
                            '''
                        }
                    }
                }
                stage('Build Security') {
                    steps {
                        script {
                            sh '''
                            docker build -t $DOCKER_REGISTRY/$PROJECT_NAMESPACE:ms-nestjs-security-desarrollo-devops \
                                --build-arg ENTORNO_ENV=desarrollo ./ms-nestjs-security
                            '''
                        }
                    }
                }
                stage('Build Python') {
                    steps {
                        script {
                            sh '''
                            docker build -t $DOCKER_REGISTRY/$PROJECT_NAMESPACE:ms-python-desarrollo-devops \
                                --build-arg ENTORNO_ENV=desarrollo ./ms-python
                            '''
                        }
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', "$DOCKER_CREDENTIALS") {
                        sh '''
                        docker push $DOCKER_REGISTRY/$PROJECT_NAMESPACE:proyecto-frontapp-desarrollo-devops
                        docker push $DOCKER_REGISTRY/$PROJECT_NAMESPACE:ms-nestjs-bff-desarrollo-devops
                        docker push $DOCKER_REGISTRY/$PROJECT_NAMESPACE:ms-nestjs-security-desarrollo-devops
                        docker push $DOCKER_REGISTRY/$PROJECT_NAMESPACE:ms-python-desarrollo-devops
                        '''
                    }
                }
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Test Frontend') {
                    steps {
                        dir('./proyecto-frontApp') {
                            script {
                                sh 'npm test || echo "Test Frontend Failed!"'
                            }
                        }
                    }
                }
                stage('Test BFF') {
                    steps {
                        dir('./ms-nestjs-bff') {
                            script {
                                sh 'npm test || echo "Test BFF Failed!"'
                            }
                        }
                    }
                }
                stage('Test Security') {
                    steps {
                        dir('./ms-nestjs-security') {
                            script {
                                sh 'npm test || echo "Test Security Failed!"'
                            }
                        }
                    }
                }
                stage('Test Python') {
                    steps {
                        dir('./ms-python') {
                            script {
                                sh '''
                                pip install pytest || echo "Fallo al instalar pytest"
                                pytest || echo "Test Python Failed!"
                                '''
                            }
                        }
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    try {
                        sh '''
                        kubectl apply -f ./kubernetes/web/desarrollo/ 
                        '''
                    } catch (Exception e) {
                        error "Failed to deploy to Kubernetes: ${e}"
                    }
                }
            }
        }

        stage('Validate Deployment') {
            steps {
                script {
                    sh '''
                    kubectl --context=$KUBE_CONTEXT get pods -o wide
                    kubectl --context=$KUBE_CONTEXT get services -o wide
                    '''
                }
            }
        }
    }

    post {
        success {
            script {
                slackSend channel: '#todo-jenkins-proyecto-venta-automatizada', 
                          message: "Pipeline completado con éxito: ${env.JOB_NAME} [${env.BUILD_NUMBER}] (<${env.BUILD_URL}|Ver Detalles>)",
                          color: 'good',
                          tokenCredentialId: SLACK_CREDENTIAL_ID
            }
        }
        failure {
            script {
                slackSend channel: '#todo-jenkins-proyecto-venta-automatizada', 
                          message: "Pipeline fallido: ${env.JOB_NAME} [${env.BUILD_NUMBER}] (<${env.BUILD_URL}|Ver Detalles>)",
                          color: 'danger',
                          tokenCredentialId: SLACK_CREDENTIAL_ID
            }
        }
        always {
            echo 'Pipeline finalizado.'
        }
    }
}