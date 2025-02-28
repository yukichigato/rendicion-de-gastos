from pydantic import BaseModel
from typing import List, Tuple, Union
from uuid import UUID
from psycopg2.extensions import cursor as Cursor



class PublicUser(BaseModel):
    name: str
    rut: str
    tel: str = ''
    email: str
    status: str = 'Trabajador'
    area: str = 'Otros'

class TokenUser(PublicUser):
    id: UUID
    password: str

class User(PublicUser):
    id: UUID
    password: str
    tel: str = ''

class Report(BaseModel):
    author_id: UUID
    title: str
    details: str = ''
    type: str = 'Otros'
    amount: int
    backup_url: str