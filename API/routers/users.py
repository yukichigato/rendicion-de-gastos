from fastapi import APIRouter, HTTPException
from ..models.users import findUsers, findUserByID, createUser, findUserByEmail
from ..types import UserData

userRouter = APIRouter(prefix="/api/users")

@userRouter.get("/")
def getAllUsers(limit = 999, offset = 0):
    try:
        rows = findUsers(limit, offset)
        return rows
    except Exception as error:
        raise HTTPException(status_code = 500, detail="Server Error")

@userRouter.get("/{id}")
def getUser(id):
    try:
        rows = findUserByID(id)
        return rows
    except Exception as error:
        raise HTTPException(status_code = 500, detail="Server Error")
    
@userRouter.get("/")
def getUserCredentials(email: str):
    try:
        rows = findUserByEmail(email)
        return rows
    except Exception as error:
        raise HTTPException(status_code = 500, detail=f"Server Error ${str(error)}")

@userRouter.post("/")
def postUser(user: UserData):
    try:
        newID = createUser(
            user.profile_picture_url,
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
        raise HTTPException(status_code = 500, detail="Server Error")