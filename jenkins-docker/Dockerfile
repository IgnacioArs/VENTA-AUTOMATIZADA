# Dockerfile actualizado para Jenkins con Minikube, pytest y SonarScanner
FROM jenkins/jenkins:latest

# Cambia al usuario root para instalar dependencias
USER root

RUN apt-get update && apt-get install -y sudo

# Configurar Jenkins para ejecutar sudo sin contraseña
RUN echo "jenkins ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# Actualiza el sistema y herramientas básicas
RUN apt-get update && \
    apt-get install -y \
        ca-certificates \
        curl \
        wget \
        gnupg2 \
        lsb-release \
        python3 \
        python3-pip \
        python3-dev \
        build-essential \
        nodejs \
        npm \
        python3-venv \
        unzip \
        nano && \
    apt-get clean

# Instala SonarScanner (última versión estable disponible públicamente)
RUN apt-get update && apt-get install -y unzip wget && \
    cd /opt && \
    wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-7.0.2.4839-linux-x64.zip && \
    unzip sonar-scanner-cli-7.0.2.4839-linux-x64.zip && \
    mv sonar-scanner-7.0.2.4839-linux-x64 sonar-scanner && \
    rm sonar-scanner-cli-7.0.2.4839-linux-x64.zip && \
    echo 'export PATH=$PATH:/opt/sonar-scanner/bin' >> /etc/profile && \
    echo 'export SONAR_SCANNER_HOME=/opt/sonar-scanner' >> /etc/profile


# Agrega SonarScanner al PATH
ENV PATH="$PATH:/opt/sonar-scanner/bin"
ENV SONAR_SCANNER_HOME=/opt/sonar-scanner


# Agrega Docker's GPG key
RUN install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc && \
    chmod a+r /etc/apt/keyrings/docker.asc

# Agrega el repositorio de Docker utilizando VERSION_CODENAME
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update

# Instala Docker
RUN apt-get install -y docker-ce docker-ce-cli containerd.io && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Agrega el usuario Jenkins a los grupos Docker y Minikube
RUN groupadd docker || true && \
    usermod -aG docker jenkins && \
    groupadd minikube || true && \
    usermod -aG minikube jenkins

# Crea un entorno virtual de Python
RUN python3 -m venv /venv && \
    /venv/bin/pip install --upgrade pip

# Instala TensorFlow y pytest en el entorno virtual
RUN /venv/bin/pip install --no-cache-dir tensorflow pytest

# Instala Create React App y NestJS CLI globalmente con npm
RUN npm install -g create-react-app @nestjs/cli

# Instala kubectl
RUN curl -LO "https://dl.k8s.io/release/v1.26.0/bin/linux/amd64/kubectl" && \
    chmod +x ./kubectl && \
    mv ./kubectl /usr/local/bin/kubectl

# Instala helm (opcional si lo necesitas)
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Instala Minikube
RUN curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && \
    chmod +x minikube && \
    mv minikube /usr/local/bin/minikube

# Agrega Minikube al PATH
ENV PATH="/usr/local/bin/minikube:${PATH}"

# Configura el contexto de Kubernetes dentro del contenedor
RUN mkdir -p /var/jenkins_home/.kube && \
    touch /var/jenkins_home/.kube/config && \
    chown -R jenkins:jenkins /var/jenkins_home/.kube && \
    mkdir -p /var/jenkins_home/workspace && \
    chmod -R 775 /var/jenkins_home/workspace

# Exporta la variable de entorno KUBECONFIG
ENV KUBECONFIG=/var/jenkins_home/.kube/config

# Instala plugins de Jenkins, incluyendo Slack Notifications
RUN jenkins-plugin-cli --plugins slack

# Descarga el plugin 'workflow-support.hpi' para Jenkins
RUN wget -P /var/jenkins_home/plugins/ https://updates.jenkins.io/latest/workflow-support.hpi

# Establece parámetros de memoria para Java
ENV JAVA_ARGS="-Xmx2048m -Xms512m"

# Monta Docker.sock para permitir acceso desde el contenedor
VOLUME ["/var/run/docker.sock:/var/run/docker.sock"]

# Agrega Minikube como volumen para compartir contexto
VOLUME ["/usr/local/bin/minikube:/usr/local/bin/minikube"]

# Cambia al usuario Jenkins para la ejecución
USER jenkins

# Establece el directorio de trabajo
WORKDIR /var/jenkins_home

# Exponer puertos para Jenkins
EXPOSE 8080
EXPOSE 50000

# Comando de inicio
ENTRYPOINT ["/usr/bin/tini", "--", "/usr/local/bin/jenkins.sh"]





































