# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json tsconfig*.json ./ 
RUN npm install

# Copy application files
COPY . .

# Compila el código TypeScript a JavaScript
RUN npm run build

# Define ARG and default ENV
ARG ENTORNO_ENV=desarrollo
ENV ENTORNO_ENV=${ENTORNO_ENV}

# Define default port for desarrollo
ENV PORT=3002

# Use RUN to determine the correct port for the environment
RUN if [ "$ENTORNO_ENV" = "produccion" ]; then echo "Producción seleccionada" && export PORT=4002; else echo "Desarrollo seleccionado" && export PORT=3002; fi

# Expose the default ports
EXPOSE 3002
EXPOSE 4002

# Start the application
CMD ["sh", "-c", "node dist/main.js --port ${PORT}"]


