from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.testclient import TestClient  # Aquí agregamos TestClient
import uvicorn
import os
from dotenv import load_dotenv
from app.src.routes import route_chat_bot

# Cargar el archivo .env
load_dotenv()

# Crear la instancia de FastAPI
app = FastAPI(
    title="Mi API INTELIGENCIA ARTIFICIAL MS",
    description="Consumo Api IA",
    version="1.0.0",
    openapi_url="/openapi.json",  # URL para la especificación OpenAPI
    docs_url="/api/python/docs/swagger"
)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3002','http://localhost:4002','http://192.168.49.2:32002'],  # Permite todas las fuentes. Cambia esto para restringir orígenes específicos.
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"]   # Permite todos los encabezados
)

# Incluir el router de las rutas
app.include_router(route_chat_bot.route)

# Ruta para comprobar el puerto
@app.get("/home")
async def init():
    # Seleccionar el puerto según el entorno
    if entorno_env == "desarrollo":
        port = int(os.getenv("PORT_DESARROLLO"))  # Puerto para desarrollo
    else:
        port = int(os.getenv("PORT_PRODUCCION"))  # Puerto para producción
    return f"Server Running on PORT: {port}"

# Configuración para pruebas
client = TestClient(app)

# Ejemplo de prueba simple
def test_home_endpoint():
    response = client.get("/home")
    assert response.status_code == 200
    assert "Server Running on PORT" in response.text

# Arrancar el servidor Uvicorn
if __name__ == "__main__":
    # Leer el entorno de ejecución (desarrollo o producción)
    entorno_env = os.getenv("ENTORNO_ENV", "desarrollo")  # Por defecto es "desarrollo"
    
    # Seleccionar el puerto según el entorno
    if entorno_env == "desarrollo":
        port = int(os.getenv("PORT_DESARROLLO"))  # Puerto para desarrollo
    else:
        port = int(os.getenv("PORT_PRODUCCION"))  # Puerto para producción

    # Arrancar el servidor Uvicorn
    uvicorn.run(app, host="127.0.0.1", port=port)


