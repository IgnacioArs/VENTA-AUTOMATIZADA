from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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
    allow_origins=[
        "http://localhost:3002",
        "http://localhost:4002",
        "http://192.168.49.2:32002"
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"]   # Permite todos los encabezados
)

# Incluir el router de las rutas
app.include_router(route_chat_bot.route)

# Endpoint raíz
@app.get("/")
async def read_root():
    return {"message": "Welcome to FastAPI"}

# Endpoint de ejemplo
@app.get("/example")
async def read_example():
    return {"example": "This is an example endpoint"}

# Ruta para comprobar el puerto
@app.get("/home")
async def init():
    entorno_env = os.getenv("ENTORNO_ENV", "desarrollo")
    # Seleccionar el puerto según el entorno
    if entorno_env == "desarrollo":
        port = int(os.getenv("PORT_DESARROLLO"))  # Puerto para desarrollo
    else:
        port = int(os.getenv("PORT_PRODUCCION"))  # Puerto para producción
    return {"message": f"Server Running on PORT: {port}"}

# Arrancar el servidor Uvicorn
if __name__ == "__main__":
    entorno_env = os.getenv("ENTORNO_ENV", "desarrollo")  # Por defecto es "desarrollo"
    # Seleccionar el puerto según el entorno
    if entorno_env == "desarrollo":
        port = int(os.getenv("PORT_DESARROLLO"))  # Puerto para desarrollo
    else:
        port = int(os.getenv("PORT_PRODUCCION"))  # Puerto para producción
    # Arrancar el servidor Uvicorn
    uvicorn.run(app, host="127.0.0.1", port=port)


