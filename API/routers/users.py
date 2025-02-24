from fastapi import APIRouter, HTTPException
from ..models.users import getUsers, getUserByID, createUser
from ..types import UserData

userRouter = APIRouter(prefix="/api/users")

@userRouter.get("/")
def getAllUsers(limit = 0, offset = 0):
    try:
        rows = getUsers(limit, offset)
        return rows
    except Exception as error:
        raise HTTPException(status_code = 500, detail="Server Error")

@userRouter.get("/{id}")
def getUser():
    try:
        rows = getUserByID(id)
        return rows
    except Exception as error:
        raise HTTPException(status_code = 500, detail="Server Error")

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