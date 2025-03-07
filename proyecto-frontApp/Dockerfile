# Etapa 1: Construcción del frontend
FROM node:20-alpine AS build

WORKDIR /app

# Copiar archivos del proyecto
COPY package.json package-lock.json ./
RUN npm install

# Copiar todos los archivos del frontend
COPY . .

# Copiar el archivo de entorno
COPY .env .env

# Definir argumentos de entorno
ARG VITE_ENTORNO
ARG VITE_PUERTO_DESARROLLO
ARG VITE_PUERTO_PRODUCCION
ARG VITE_ENV_MS_BUSINESS_API_URL_DESARROLLO
ARG VITE_ENV_MS_PYTHON_API_URL_DESARROLLO
ARG VITE_ENV_MS_BUSINESS_API_URL_PRODUCCION
ARG VITE_ENV_MS_PYTHON_API_URL_PRODUCCION

# Definir variables de entorno en la imagen
ENV VITE_ENTORNO=${VITE_ENTORNO}
ENV VITE_PUERTO_DESARROLLO=${VITE_PUERTO_DESARROLLO}
ENV VITE_PUERTO_PRODUCCION=${VITE_PUERTO_PRODUCCION}
ENV VITE_ENV_MS_BUSINESS_API_URL_DESARROLLO=${VITE_ENV_MS_BUSINESS_API_URL_DESARROLLO}
ENV VITE_ENV_MS_PYTHON_API_URL_DESARROLLO=${VITE_ENV_MS_PYTHON_API_URL_DESARROLLO}
ENV VITE_ENV_MS_BUSINESS_API_URL_PRODUCCION=${VITE_ENV_MS_BUSINESS_API_URL_PRODUCCION}
ENV VITE_ENV_MS_PYTHON_API_URL_PRODUCCION=${VITE_ENV_MS_PYTHON_API_URL_PRODUCCION}

# Crear el archivo `.env` para Vite basado en el entorno
RUN echo "VITE_ENTORNO=${VITE_ENTORNO}" > .env && \
    echo "VITE_PUERTO=$(if [ "$VITE_ENTORNO" = "desarrollo" ]; then echo "$VITE_PUERTO_DESARROLLO"; else echo "$VITE_PUERTO_PRODUCCION"; fi)" >> .env && \
    echo "VITE_ENV_MS_BUSINESS_API_URL=$(if [ "$VITE_ENTORNO" = "desarrollo" ]; then echo "$VITE_ENV_MS_BUSINESS_API_URL_DESARROLLO"; else echo "$VITE_ENV_MS_BUSINESS_API_URL_PRODUCCION"; fi)" >> .env && \
    echo "VITE_ENV_MS_PYTHON_API_URL=$(if [ "$VITE_ENTORNO" = "desarrollo" ]; then echo "$VITE_ENV_MS_PYTHON_API_URL_DESARROLLO"; else echo "$VITE_ENV_MS_PYTHON_API_URL_PRODUCCION"; fi)" >> .env

# Verificar que el archivo .env se creó correctamente
RUN cat .env

# Ejecutar la construcción del frontend
RUN npm run build

# Etapa 2: Configuración de Nginx
FROM nginx:latest

# Instalar apache2-utils para soporte de autenticación
RUN apt-get update && apt-get install -y apache2-utils && rm -rf /var/lib/apt/lists/*

# Copiar archivo de autenticación
COPY nginx-desarrollo/.htpasswd /etc/nginx/.htpasswd

# Copiar archivo de configuración personalizado
COPY nginx-desarrollo/nginx.conf /etc/nginx/conf.d/default.conf

# Copiar la build generada
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



