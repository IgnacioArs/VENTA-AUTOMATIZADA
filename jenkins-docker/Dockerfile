# Usa la imagen oficial de Jenkins como base
FROM jenkins/jenkins:latest

# Cambia al usuario root para instalar dependencias
USER root

# Capa 1: Actualiza el sistema y herramientas básicas
RUN apt-get update && \
    apt-get install -y ca-certificates curl wget gnupg2 lsb-release python3 python3-pip python3-dev build-essential nodejs npm python3-venv && \
    apt-get clean

# Capa 2: Agrega Docker's GPG key
RUN install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc && \
    chmod a+r /etc/apt/keyrings/docker.asc

# Capa 3: Agrega el repositorio de Docker utilizando VERSION_CODENAME
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update

# Capa 4: Instala Docker
RUN apt-get install -y docker-ce-cli && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Agrega el usuario jenkins al grupo docker para permitir el acceso al socket de Docker
RUN groupadd docker && usermod -aG docker jenkins

# Capa 5: Crea un entorno virtual y activa
RUN python3 -m venv /venv && \
    /venv/bin/pip install --upgrade pip

# Capa 6: Instalar TensorFlow en el entorno virtual
RUN /venv/bin/pip install --no-cache-dir tensorflow

# Capa 7: Instala Create React App y NestJS CLI globalmente con npm
RUN npm install -g create-react-app @nestjs/cli

# Instalar kubectl con reintentos
RUN curl -LO "https://dl.k8s.io/release/v1.26.0/bin/linux/amd64/kubectl" && \
    chmod +x ./kubectl && \
    mv ./kubectl /usr/local/bin/kubectl

# Cambia de nuevo al usuario jenkins para la ejecución de Jenkins
USER jenkins

# Establece el directorio de trabajo
WORKDIR /var/jenkins_home

# Exponer puertos para Jenkins
EXPOSE 8080
EXPOSE 50000

























