# Dockerfile para Jenkins con Minikube, pytest y soporte para React
FROM jenkins/jenkins:latest

# Cambia al usuario root para instalar dependencias
USER root

# Actualiza el sistema e instala herramientas básicas
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
        python3-venv && \
    apt-get clean

# Configuración para Docker
RUN install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc && \
    chmod a+r /etc/apt/keyrings/docker.asc && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y docker-ce docker-ce-cli containerd.io && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Agrega el usuario Jenkins al grupo Docker
RUN groupadd docker || true && \
    usermod -aG docker jenkins

# Crea un entorno virtual para Python
RUN python3 -m venv /venv && \
    /venv/bin/pip install --upgrade pip && \
    /venv/bin/pip install --no-cache-dir pytest tensorflow

# Instala paquetes globales de Node.js
RUN npm install -g create-react-app @nestjs/cli react-scripts

# Instala kubectl
RUN curl -LO "https://dl.k8s.io/release/v1.26.0/bin/linux/amd64/kubectl" && \
    chmod +x ./kubectl && \
    mv ./kubectl /usr/local/bin/kubectl

# Instala helm (opcional)
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Instala Minikube
RUN curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && \
    chmod +x minikube && \
    mv minikube /usr/local/bin/minikube

# Agrega Minikube al PATH
ENV PATH="/usr/local/bin/minikube:${PATH}"

# Instala plugins de Jenkins
RUN jenkins-plugin-cli --plugins slack

# Monta Docker.sock para acceso al daemon de Docker
VOLUME ["/var/run/docker.sock:/var/run/docker.sock"]

# Cambia al usuario Jenkins
USER jenkins

# Establece el directorio de trabajo
WORKDIR /var/jenkins_home

# Exponer puertos
EXPOSE 8080
EXPOSE 50000

# Comando de inicio
ENTRYPOINT ["/usr/bin/tini", "--", "/usr/local/bin/jenkins.sh"]


































