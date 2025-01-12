# Dockerfile actualizado para Jenkins con Minikube, pytest y más optimizaciones
FROM jenkins/jenkins:latest

# Cambia al usuario root para instalar dependencias
USER root

# Actualiza el sistema e instala dependencias
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        wget \
        gnupg2 \
        lsb-release \
        python3 \
        python3-pip \
        python3-dev \
        python3-venv \
        build-essential \
        nodejs \
        npm && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Agregar Docker's GPG key y repositorio
RUN install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc && \
    chmod a+r /etc/apt/keyrings/docker.asc && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && apt-get install -y --no-install-recommends \
        docker-ce docker-ce-cli containerd.io && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Agrega Jenkins al grupo Docker
RUN groupadd docker || true && usermod -aG docker jenkins

# Configurar entorno virtual para Python
RUN python3 -m venv /venv && \
    /venv/bin/pip install --upgrade pip && \
    /venv/bin/pip install --no-cache-dir \
        tensorflow \
        pytest \
        pytest-cov \
        pytest-mock \
        pylint

# Instalar Create React App y NestJS CLI globalmente con npm
RUN npm install -g create-react-app @nestjs/cli

# Instalar kubectl
RUN curl -LO "https://dl.k8s.io/release/v1.26.0/bin/linux/amd64/kubectl" && \
    chmod +x ./kubectl && mv ./kubectl /usr/local/bin/kubectl

# Instalar helm
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Instalar Minikube
RUN curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && \
    chmod +x minikube && mv minikube /usr/local/bin/minikube

# Instalar plugins de Jenkins, incluyendo Slack Notifications
RUN jenkins-plugin-cli --plugins slack

# Crear directorio para pruebas
RUN mkdir -p /var/jenkins_home/tests && chown jenkins:jenkins /var/jenkins_home/tests

# Montar Docker.sock y Minikube como volúmenes
VOLUME ["/var/run/docker.sock:/var/run/docker.sock"]
VOLUME ["/usr/local/bin/minikube:/usr/local/bin/minikube"]

# Cambiar al usuario Jenkins
USER jenkins

# Activar el entorno virtual por defecto y establecer directorio de trabajo
ENV PATH="/venv/bin:$PATH"
WORKDIR /var/jenkins_home

# Exponer puertos
EXPOSE 8080 50000

# Comando de inicio
ENTRYPOINT ["/bin/bash", "-c", "source /venv/bin/activate && /usr/local/bin/jenkins.sh"]



































