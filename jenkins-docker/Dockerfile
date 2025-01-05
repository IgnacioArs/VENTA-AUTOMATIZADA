# Dockerfile actualizado
FROM jenkins/jenkins:latest

# Cambia al usuario root para instalar dependencias
USER root

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
        python3-venv && \
    apt-get clean

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

# Agrega el usuario Jenkins al grupo Docker
RUN groupadd docker || true && \
    usermod -aG docker jenkins

# Crea un entorno virtual de Python
RUN python3 -m venv /venv && \
    /venv/bin/pip install --upgrade pip

# Instala TensorFlow en el entorno virtual
RUN /venv/bin/pip install --no-cache-dir tensorflow

# Instala Create React App y NestJS CLI globalmente con npm
RUN npm install -g create-react-app @nestjs/cli

# Instala kubectl
RUN curl -LO "https://dl.k8s.io/release/v1.26.0/bin/linux/amd64/kubectl" && \
    chmod +x ./kubectl && \
    mv ./kubectl /usr/local/bin/kubectl

# Instala helm (opcional si lo necesitas)
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Instala plugins de Jenkins, incluyendo Slack Notifications
RUN jenkins-plugin-cli --plugins slack

# Cambia al usuario Jenkins para la ejecución
USER jenkins

# Establece el directorio de trabajo
WORKDIR /var/jenkins_home

# Exponer puertos para Jenkins
EXPOSE 8080
EXPOSE 50000

# Comando de inicio
ENTRYPOINT ["/usr/bin/tini", "--", "/usr/local/bin/jenkins.sh"]






























