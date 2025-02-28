from fastapi import APIRouter, HTTPException
from ..models.users import findUsers, findUserByID, createUser, findUserByEmail
from ..types import *

userRouter = APIRouter(prefix="/api/users")

@userRouter.get("/")
def getAllUsers(limit: int = 999, offset: int = 0):
    try:
        rows: List[Tuple[PublicUser]] = findUsers(limit, offset)
        return rows
    except Exception as error:
        raise HTTPException(status_code = 500, detail = f"Server Error ${str(error)}")

@userRouter.get("/{id}")
def getUser(id: str):
    try:
        rows: Tuple[PublicUser] = findUserByID(id)
        return rows
    except Exception as error:
        raise HTTPException(status_code = 500, detail = f"Server Error ${str(error)}")
    
@userRouter.get("/")
def getUserCredentials(email: str = ""):
    try:
        rows: Tuple[PublicUser] = findUserByEmail(email)
        return rows
    except Exception as error:
        raise HTTPException(status_code = 500, detail = f"Server Error ${str(error)}")

@userRouter.post("/")
def postUser(user: User):
    try:
        newID: Tuple[UUID] = createUser(
            user.name,
            user.rut,
            user.password,
            user.tel,
            user.email,
            user.status,
            user.area
        )
        return { "id": newID }
    except Exception as error:
        raise HTTPException(status_code = 500, detail = f"Server Error ${str(error)}")