from fastapi import APIRouter, HTTPException, Query
from ..models.users import findUsers, findUserByID, createUser, findUserByEmail
from ..types import NewUser, Optional

userRouter = APIRouter(prefix="/api/users")

@userRouter.get("")
def getUserCredentials(
    email: Optional[str] = Query(None),
    limit: Optional[int] = Query(999),
    offset: Optional[int] = Query(0)
):

    try:
        if email is not None:
            rows = findUserByEmail(email)
            return rows
        else:
            rows = findUsers(limit, offset)
            return rows
            
    except Exception as error:
        raise HTTPException(status_code = 500, detail = f"Server Error {str(error)}")

@userRouter.get("/{id}")
def getUser(id: str):
    try:
        rows = findUserByID(id)
        return rows
    except Exception as error:
        raise HTTPException(status_code = 500, detail = f"Server Error ${str(error)}")

@userRouter.post("")
def postUser(user: NewUser):
    try:
        newID = createUser(
            user.name,
            user.rut,
            user.password,
            user.tel,
            user.email,
            user.status,
            user.area
        )
        return newID
    except Exception as error:
        raise HTTPException(status_code = 500, detail = f"Server Error ${str(error)}")