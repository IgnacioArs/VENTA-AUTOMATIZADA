# Usa la imagen oficial de Jenkins como base
FROM jenkins/jenkins:latest

# Cambia al usuario root para instalar dependencias
USER root

# Actualiza el sistema e instala herramientas básicas y dependencias necesarias
RUN apt-get update && \
    apt-get install -y ca-certificates curl wget gnupg2 lsb-release python3 python3-pip python3-dev build-essential nodejs npm python3-venv && \
    apt-get clean

# Agrega la clave GPG de Docker
RUN install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc && \
    chmod a+r /etc/apt/keyrings/docker.asc

# Agrega el repositorio de Docker
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update

# Instala Docker CLI
RUN apt-get install -y docker-ce-cli && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Agrega el usuario Jenkins al grupo Docker para permitir acceso al socket de Docker
RUN groupadd docker && usermod -aG docker jenkins

# Crea un entorno virtual de Python para dependencias futuras
RUN python3 -m venv /venv && \
    /venv/bin/pip install --upgrade pip

# Instala Create React App y NestJS CLI globalmente con npm
RUN npm install -g create-react-app @nestjs/cli

# Instala kubectl para interacción con Kubernetes desde Jenkins
RUN curl -LO "https://dl.k8s.io/release/v1.26.0/bin/linux/amd64/kubectl" && \
    chmod +x ./kubectl && \
    mv ./kubectl /usr/local/bin/kubectl

# Cambia de nuevo al usuario Jenkins para la ejecución segura de Jenkins
USER jenkins

# Configura el directorio de trabajo de Jenkins
WORKDIR /var/jenkins_home

# Exponer puertos para Jenkins
EXPOSE 8080
EXPOSE 50000


























