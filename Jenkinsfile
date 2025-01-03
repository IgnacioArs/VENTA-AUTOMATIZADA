pipeline {
    agent any

    environment {
        // Configuración para Docker Hub
        //DOCKER_REGISTRY = 'docker.io/devars96' // Antiguo repositorio de Docker (comentado como referencia)
        DOCKER_REGISTRY = 'docker.io/devars96/jenkins' // Nuevo repositorio de Docker
        DOCKER_CREDENTIALS = 'docker-hub-credentials' // ID de las credenciales almacenadas en Jenkins
        KUBE_CONTEXT = 'minikube'
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
                        sh 'docker build -t $DOCKER_REGISTRY/proyecto-frontapp-desarrollo-devops --build-arg VITE_ENTORNO=desarrollo ./proyecto-frontApp'
                    }
                }
                stage('Build BFF') {
                    steps {
                        sh 'docker build -t $DOCKER_REGISTRY/ms-nestjs-bff-desarrollo-devops --build-arg ENTORNO_ENV=desarrollo ./ms-nestjs-bff'
                    }
                }
                stage('Build Security') {
                    steps {
                        sh 'docker build -t $DOCKER_REGISTRY/ms-nestjs-security-desarrollo-devops --build-arg ENTORNO_ENV=desarrollo ./ms-nestjs-security'
                    }
                }
                stage('Build Python') {
                    steps {
                        sh 'docker build -t $DOCKER_REGISTRY/ms-python-desarrollo-devops --build-arg ENTORNO_ENV=desarrollo ./ms-python'
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', "$DOCKER_CREDENTIALS") {
                        sh '''
                        // Push hacia el nuevo repositorio
                        docker push $DOCKER_REGISTRY/proyecto-frontapp-desarrollo-devops
                        docker push $DOCKER_REGISTRY/ms-nestjs-bff-desarrollo-devops
                        docker push $DOCKER_REGISTRY/ms-nestjs-security-desarrollo-devops
                        docker push $DOCKER_REGISTRY/ms-python-desarrollo-devops

                        // Comentado el repositorio antiguo para referencia
                        // docker push antiguo-repositorio/proyecto-frontapp-desarrollo-devops
                        // docker push antiguo-repositorio/ms-nestjs-bff-desarrollo-devops
                        // docker push antiguo-repositorio/ms-nestjs-security-desarrollo-devops
                        // docker push antiguo-repositorio/ms-python-desarrollo-devops
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
                            sh 'npm test'
                        }
                    }
                }
                stage('Test BFF') {
                    steps {
                        dir('./ms-nestjs-bff') {
                            sh 'npm test'
                        }
                    }
                }
                stage('Test Security') {
                    steps {
                        dir('./ms-nestjs-security') {
                            sh 'npm test'
                        }
                    }
                }
                stage('Test Python') {
                    steps {
                        dir('./ms-python') {
                            sh 'pytest'
                        }
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                dir('./kubernetes/web/desarrollo') {
                    sh '''
                    kubectl --context=$KUBE_CONTEXT apply -f ms-nestjs-bff-deployment-desarrollo.yaml
                    kubectl --context=$KUBE_CONTEXT apply -f ms-nestjs-bff-service-desarrollo.yaml
                    kubectl --context=$KUBE_CONTEXT apply -f ms-nestjs-security-deployment-desarrollo.yaml
                    kubectl --context=$KUBE_CONTEXT apply -f ms-nestjs-security-service-desarrollo.yaml
                    kubectl --context=$KUBE_CONTEXT apply -f ms-python-deployment-desarrollo.yaml
                    kubectl --context=$KUBE_CONTEXT apply -f ms-python-service-desarrollo.yaml
                    kubectl --context=$KUBE_CONTEXT apply -f nginx-deployment-desarrollo.yaml
                    kubectl --context=$KUBE_CONTEXT apply -f nginx-service-desarrollo.yaml
                    '''
                }
            }
        }

        stage('Validate Deployment') {
            steps {
                sh '''
                kubectl --context=$KUBE_CONTEXT get pods -o wide
                kubectl --context=$KUBE_CONTEXT get services -o wide
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}

