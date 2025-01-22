import sys
import os
from fastapi.testclient import TestClient
from main.app import app  # Asegúrate de que esta ruta sea válida en tu proyecto

# Configurar el cliente de pruebas
client = TestClient(app)

# Prueba para el endpoint raíz "/"
def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"
    assert response.json() == {"message": "Welcome to FastAPI"}

# Prueba para el endpoint "/example"
def test_example_endpoint():
    response = client.get("/example")
    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"
    assert response.json() == {"example": "This is an example endpoint"}

# Prueba para el endpoint "/home"
def test_home_endpoint():
    response = client.get("/home")
    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"
    assert "Server Running on PORT" in response.json()["message"], "Response does not contain the expected message"


