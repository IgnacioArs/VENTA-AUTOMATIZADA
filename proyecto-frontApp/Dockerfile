# Etapa 1: Construcción del frontend
FROM node:21

WORKDIR /app

# Copiar archivos del proyecto
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Determinar entorno desde argumentos
ARG VITE_ENTORNO
ENV VITE_ENTORNO=${VITE_ENTORNO}

# Configuración del puerto según entorno
ARG VITE_PUERTO_DESARROLLO=${VITE_PUERTO_DESARROLLO}
ARG VITE_PUERTO_PRODUCCION=${VITE_PUERTO_PRODUCCION}

RUN if [ "$VITE_ENTORNO" = "desarrollo" ]; then \
    echo "VITE_PUERTO=${VITE_PUERTO_DESARROLLO}" >> .env; \
    else echo "VITE_PUERTO=${VITE_PUERTO_PRODUCCION}" >> .env; \
    fi

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


