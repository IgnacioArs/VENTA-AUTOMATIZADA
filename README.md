# VENTA-AUTOMATIZADA
![devops](https://github.com/user-attachments/assets/4826ea40-ade8-4d8a-9984-5db511d57c05)

# Kubernetes DevOps Project

Este proyecto implementa un entorno de desarrollo y producción utilizando Kubernetes para desplegar y administrar aplicaciones modernas. Incluye múltiples servicios, configuraciones de despliegue, y un sistema de gestión de tráfico con Ingress.

---

## Descripción

El objetivo de este proyecto es demostrar habilidades avanzadas de **DevOps** y **orquestación de contenedores** con Kubernetes. El proyecto incluye la implementación de un entorno que soporta múltiples servicios, cada uno configurado para desarrollo y producción, usando tecnologías modernas.

---

## Tecnologías Utilizadas

- **Kubernetes**: Orquestador de contenedores para despliegue y administración.
- **Docker**: Creación de imágenes de contenedores para las aplicaciones.
- **NGINX**: Servidor proxy inverso y balanceador de carga.
- **Node.js**: Backend con NestJS.
- **Python**: Microservicios escritos en Python.
- **ConfigMaps y Secrets**: Para manejar configuraciones sensibles y no sensibles.
- **Ingress Controller**: Gestión de tráfico HTTP y HTTPS.
- **Helm** (opcional): Plantillas de configuración para simplificar despliegues.
- **Jenkins**: Herramienta de automatizacion pruebas y despliegue.
---

## Estructura del Proyecto
## IA CHATBOT TENSORFLOW KERAS OBJETIVO AUTOMATIZAR VENTAS CON CREACION DE REDES NEURONALES
El proyecto está organizado de la siguiente manera:
- MS-PYTHON <-> MS-NESTJS-SECURITY <--- MS-NESTJS-BFF <---proyecto-frontApp


---

## Características Implementadas

1. **Ambientes Separados**:
   - Configuración para entornos de **desarrollo** y **producción**.
   - ConfigMaps diferenciados para cada entorno.

2. **Servicios Implementados**:
   - **Frontend**: Aplicación estática o SPA (React).
   - **NestJS Backend BFF**: API REST escrita en Node.js.
   - **NestJS Backend SECURITY**: API REST escrita en Node.js.
   - **Python Service CHATBOT REDES NEURONALES**: Microservicio adicional en Python.
   - **NGINX**: Servidor proxy inverso para enrutar tráfico.

3. **Control de Tráfico con Ingress**:
   - Redirección HTTP y HTTPS a los servicios adecuados según el entorno.
   - Ingress Controller configurado para manejar múltiples subdominios y rutas.

4. **Uso de NodePort**:
   - Exposición de servicios mediante puertos específicos para desarrollo local.

5. **Despliegue de Contenedores**:
   - Uso de imágenes Docker específicas para desarrollo y producción.
   - Política de `imagePullPolicy` configurada para usar imágenes locales.

6. **Automatizacion con Jenkins**:
   - Uso de imágenes Docker específicas para desarrollo y producción.
   - Automatizacion , Continues integration , Continues Delivery, Continues Deployments.

---

## Configuración Inicial

### Requisitos Previos

- **Kubernetes Cluster**: Minikube, Kind, o un clúster real.
- **Docker**: Para crear imágenes de contenedores.
- **Kubectl**: Herramienta CLI para interactuar con Kubernetes.
- **Jenkins**: Herramienta Automatizacion CI/CD y delivery (Dockerhub) (instalacion de plugins - y crecion de credenciales).

### Estructura del Jenkinsfile
- **1)** Clonar el repositorio.
- **2)** Construir las imágenes Docker para cada servicio.
- **3)** Realizar los tests.
- **4)** Subir las imágenes (si usas un registro como DockerHub o Nexus).
- **5)** Aplicar los archivos YAML para los deployments y services en Kubernetes.

### Explicación de las etapas
- **Checkout**: Clona el repositorio desde GitHub.
- **Build Docker Images**: Construye las imágenes Docker para cada microservicio.
                        Los ARG de construcción se ajustan para el entorno de desarrollo.
- **Run Tests**: Corre los tests para cada microservicio usando las herramientas específicas (e.g., npm test, pytest).
- **Deploy to Kubernetes**: Aplica los archivos YAML de configuración en tu clúster de Minikube.
- **Ngrok**: Automatizar ejecución de pipelines mediante eventos webhooks (ngrok,jenkins,git)