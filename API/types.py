from pydantic import BaseModel

class UserData(BaseModel):
    name: str
    rut: str
    password: str
    tel: str = ''
    email: str
    status: str = 'Trabajador'
    area: str = 'Otros'

class ReportData(BaseModel):
    author_id: str
    title: str
    details: str = ''
    type: str = 'Otros'
    amount: int
    backup_url: str