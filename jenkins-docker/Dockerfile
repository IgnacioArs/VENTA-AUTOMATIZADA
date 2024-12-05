# Usar la imagen oficial de Jenkins LTS (Long Term Support)
FROM jenkins/jenkins:lts

# Establecer el usuario root para poder instalar paquetes
USER root

# Actualizar el sistema e instalar dependencias del sistema necesarias
RUN apt-get update && \
    apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    curl \
    git \
    build-essential \
    ca-certificates \
    apt-transport-https \
    software-properties-common \
    nodejs \
    npm \
    && apt-get clean

# Actualizar pip
RUN pip3 install --upgrade pip

# Instalar dependencias de Python que necesita tu microservicio
RUN pip3 install fastapi \
    uvicorn \
    requests \
    pydantic \
    python-dotenv \
    tensorflow \
    nltk

# Agregar el repositorio oficial de Docker
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list

# Instalar Docker CLI
RUN apt-get update && \
    apt-get install -y docker-ce-cli && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Exponer los puertos de Jenkins y los puertos de tus microservicios
EXPOSE 8080        
EXPOSE 50000       
EXPOSE 3000        
# Puerto de Jenkins para acceder al panel
# Puerto para agentes de Jenkins
# Puerto para tu servicio de Python (FastAPI)

# Instalar Node.js y NPM para ReactJS y NestJS
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Instalar plugins de Jenkins
RUN jenkins-plugin-cli --plugins "nodejs docker-workflow python kubernetes workflow-aggregator pipeline-utility-steps git"

# Cambiar al usuario Jenkins para evitar ejecutar Jenkins como root
USER jenkins

# Definir el comando para iniciar Jenkins
CMD ["java", "-jar", "/usr/share/jenkins/jenkins.war"]







