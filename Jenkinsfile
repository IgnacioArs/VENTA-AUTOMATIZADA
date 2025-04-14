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
 
         stage('Clean Workspace') {
             steps {
                 script {
                     sh '''
                     echo "Eliminando archivos del workspace..."
                     rm -rf $WORKSPACE/*
                     echo "Workspace limpio."
                     '''
                 }
             }
         }
 
 
         stage('Set Environment') {
             steps {
                 sh '''
                 export PATH="$WORKSPACE/ms-python/venv/bin:$PATH"
                 echo $PATH
                 '''
             }
         }
 
 
         stage('Checkout') {
             steps {
                 git branch: 'main', 
                     url: 'https://github.com/IgnacioArs/VENTA-AUTOMATIZADA.git', 
                     credentialsId: 'github-user'
             }
         }
 

        stage('Setup Minikube Docker Env') {
            steps {
                script {
                    def dockerEnv = sh(
                        script: "minikube -p minikube docker-env",
                        returnStdout: true
                    ).trim()
                    
                    // Esto ejecuta TODO en una sola shell para mantener las variables
                    sh """
                        ${dockerEnv}
                        echo 'Minikube Docker environment set'
                        docker info
                    """
                }
            }
        }


 
         stage('Build Docker Images') {
             parallel {
                 stage('Build Frontend') {
                     steps {
                         script {
                             sh '''
                             docker build -t $DOCKER_REGISTRY/$PROJECT_NAMESPACE:proyecto-frontapp-desarrollo-devops \
                                 --build-arg VITE_ENTORNO=desarrollo \
                                 --build-arg VITE_PUERTO_DESARROLLO=3003 \
                                 --build-arg VITE_PUERTO_PRODUCCION=4003 \
                                 --build-arg VITE_ENV_MS_BUSINESS_API_URL_DESARROLLO=http://127.0.0.1:32002 \
                                 --build-arg VITE_ENV_MS_PYTHON_API_URL_DESARROLLO=http://127.0.0.1:32002 \
                                 ./proyecto-frontApp
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
                                 echo "Instalando dependencias frontend..."
                                 sh 'npm install --legacy-peer-deps'
                                 echo "Ejecutando pruebas de frontend..."
                                 sh 'npm run test || echo "Pruebas fallidas, revisa los logs"'
                             }
                         }
                     }
                 }
 
 
                 stage('Test BFF') {
                     steps {
                         dir('./ms-nestjs-bff') {
                             script {
                                 echo "Ejecutando pruebas de seguridad BFF..."
                                 sh 'npm test || echo "Pruebas de seguridad fallidas, revisa los logs"'
                             }
                         }
                     }
                 }
 
 
                 stage('Test Security') {
                     steps {
                         dir('./ms-nestjs-security') {
                             script {
                                 echo "Ejecutando pruebas de seguridad security ..."
                                 sh 'npm test || echo "Pruebas de seguridad fallidas, revisa los logs"'
                             }
                         }
                     }
                 }
 
 
                 stage('Test Python') {
                     steps {
                         dir('./ms-python') {
                             script {
                                 sh '''
                                     if [ ! -d ".venv" ]; then
                                         python3 -m venv .venv
                                     fi
                                     . .venv/bin/activate
                                     pip install --upgrade pip setuptools wheel
                                     pip install -r requirements.txt --timeout=10000
                                     pytest tests/ -v --maxfail=1 --disable-warnings --tb=long
                                 '''
                             }
                         }
                     }
                 }
 
 
            }
         }


        stage('SonarQube Analysis') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
                         sh '''
                         sonar-scanner \
                         -Dsonar.token=$SONAR_TOKEN
                         -Dsonar.token=$SONAR_TOKEN \
                         -Dproject.settings=sonar-project.properties
                         '''
                    }
                }
            }
        }
 
 
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    try {
                        // Entrar en el contexto del Docker de Minikube
                        sh "eval \$(minikube -p minikube docker-env) && docker info"

                        // Mostrar contenido del workspace
                        echo "Contenido del directorio actual:"
                        sh "pwd && ls -la"

                        // Aplicar manifiestos YAML con manejo de errores
                        echo "Aplicando los archivos YAML..."
                        sh """
                            if ! kubectl apply -f kubernetes/web/desarrollo; then
                                echo "Error al aplicar los manifiestos YAML"
                                exit 1
                            fi
                        """

                        // Esperar a que los pods arranquen
                        echo "Esperando a que los pods se inicien..."
                        sh "sleep 10"

                    } catch (Exception e) {
                        error "Error en el despliegue: ${e}"
                    }
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
