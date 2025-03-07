from pydantic import BaseModel
from typing import Optional

class NewUser(BaseModel):
    name: str
    rut: str
    password: str
    tel: str = ''
    email: str
    status: str = 'Trabajador'
    area: str = 'Otros'

class PublicUser(BaseModel):
    name: str
    rut: str
    tel: str = ''
    email: str
    status: str = 'Trabajador'
    area: str = 'Otros'

class TokenUser(PublicUser):
    id: str
    password: str

class User(PublicUser):
    id: str
    password: str
    tel: str = ''

class Report(BaseModel):
    author_id: str
    type: str = 'Otros'
    amount: int
    backup_url: str

class StatusUpdate(BaseModel):
    status: str