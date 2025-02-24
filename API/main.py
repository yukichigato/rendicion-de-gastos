from fastapi import FastAPI, HTTPException
from .utils import getUsers, createUser
from pydantic import BaseModel
from datetime import date

app = FastAPI()

class RendicionCreate(BaseModel):
    fecha: date
    monto: float

class RendicionUpdate(BaseModel):
    fecha: date
    monto: float

class UserData(BaseModel):
    profile_picture_url: str
    name: str
    rut: str
    password: str
    tel: str = ''
    email: str
    status: str = 'Trabajador'
    area: str = 'Otros'

# @app.get("/")
# def status():
#     print("Mmmmmm Tato")
#     return {"message": "Funcionando"}

@app.get("/api/users")
def get_users():
    rows = getUsers()
    return {"message": rows}

@app.post("/api/users")
def create_user(user: UserData):
    new_id = createUser(user.profile_picture_url, user.name, user.rut, user.password, user.tel, user.email, user.status, user.area)
    return {"message": f"User created with id {new_id}"}

# @app.post("/rendiciones")
# def create_rendicion(rendicion: RendicionCreate):
#     new_id = createRendicion(rendicion.fecha, rendicion.monto)
#     return {"message": f"Rendicion creada con ID {new_id}"}

# @app.put("/rendiciones/{rendicion_id}")
# def update_rendicion(rendicion_id: int, rendicion: RendicionUpdate):
#     # Primero verificamos si existe la rendición
#     updated_rows = updateRendicion(rendicion_id, rendicion.fecha, rendicion.monto)
#     if updated_rows == 0:
#         # Si no se actualizó ninguna fila, lanzamos una excepción 404
#         raise HTTPException(status_code=404, detail=f"Rendicion con ID {rendicion_id} no encontrada")
    
#     return {"message": f"Rendicion con ID {rendicion_id} actualizada"}

# @app.delete("/rendiciones/{rendicion_id}")
# def delete_rendicion(rendicion_id: int):
#     deleteRendicion(rendicion_id)
#     return {"message": f"Rendicion con ID {rendicion_id} eliminada"}
