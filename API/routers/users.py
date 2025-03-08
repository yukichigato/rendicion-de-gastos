from fastapi import APIRouter, HTTPException, Query, status
from ..models.users import findUsers, findUserByID, createUser, findUserByEmail
from ..types import NewUser, Optional

userRouter = APIRouter(prefix="/api/users")

@userRouter.get("/{id}")
def getUser(id: str):
    """
    Gets a user that matches the parameter ID.

    - **Parameters**:
      - `id`: The unique identifier of the user.

    - **Returns**:
      - The info of a user (rows).

    - **Error Handling**:
      - If an error occurs during report fetching, a 500 Internal Server Error is returned with a generic message.

    Example:
    GET /expense_report/71a7955b-764b-453c-b4c0-a677400e6af1
    Response: 
    {
        "name": "Yukichi Takeda",
        "rut": "12.345.678-9",
        "tel": "",
        "email": "yukichi@email.com",
        "status": "Trabajador",
        "area": "Otros"
    }
    """
    try:
        rows = findUserByID(id)
        return rows
    except Exception as error:
        print(f"Server Error: {str(error)}")
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = "An unexpected error occurred while processing your request."
        )
    
@userRouter.get("")
def getUserCredentials(
    email: Optional[str] = Query(None),
    limit: Optional[int] = Query(999),
    offset: Optional[int] = Query(0)
):
    """
    Gets either one user that matches the email, or all users (subject to limit and offset).

    - **Parameters**:
      -  `email`: Email of the user to fetch, optional.
      -  `limit`: Maximum amounts of users to retrieve.
      -  `offset`: Starting index for retrieval.

    - **Returns**:
      - An array of user information or a single user if email is provided, and user is found (rows).

    - **Error Handling**:
      - If an error occurs during report fetching, a 500 Internal Server Error is returned with a generic message.

    Example:
    GET /expense_report
    Response: 
    [
        {
            "name": "Yukichi Takeda",
            "rut": "12.345.678-9",
            "tel": "",
            "email": "yukichi@email.com",
            "status": "Trabajador",
            "area": "Otros"
        },
        {
            "name": "Sapphire Mane",
            "rut": "98.765.432-1",
            "tel": "",
            "email": "sapphiremane@email.com",
            "status": "Trabajador",
            "area": "Otros"
        }
    ]

    Example:
    GET /expense_report?email=yukichi%40email.com
    Response: 
    {
        "name": "Yukichi Takeda",
        "rut": "12.345.678-9",
        "tel": "",
        "email": "yukichi@email.com",
        "status": "Trabajador",
        "area": "Otros"
    }
    """
    try:
        if email is not None:
            rows = findUserByEmail(email)
            return rows
        else:
            rows = findUsers(limit, offset)
            return rows
            
    except Exception as error:
        print(f"Server Error: {str(error)}")
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = "An unexpected error occurred while processing your request."
        )


@userRouter.post("")
def postUser(user: NewUser):
    """
    Creates a new user on the provided `user`.

    - **Parameters**:
      - `user`: A `NewUser` object containing:
        - `name`: The real full name of the user.
        - `rut`: A real chilean RUT, belonging to the user.
        - `password`: Encrypted password of the user.
        - `tel`: Telephone number string of the user, optional.
        - `email`: Email of the user.
        - `status`: Workplace status of the user, has to be one of the allowed strings in the database.
        - `area`: Workplace area of the user, has to be one of the allowed strings in the database.

    - **Returns**:
      - The newly created UUID for the user. (`newID`).

    - **Error Handling**:
      - If an error occurs during report creation, a 500 Internal Server Error is returned with a generic message.

    Example:
    POST /expense_report
    Request body: 
    {
        "name": "Yukichi Takeda",
        "rut": "12.345.678-9",
        "password": "$2a$12$3ix5tz3aFY0WiLpttxhWLu0y1FueDruWBUdCmBKWuSPULgjPPT9G"
        "tel": "",
        "email": "yukichi@email.com",
        "status": "Trabajador",
        "area": "Otros"
    }
    Response: 
    { "newID": "71a7955b-764b-453c-b4c0-a677400e6af1" }
    """
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
        print(f"Server Error: {str(error)}")
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = "An unexpected error occurred while processing your request."
        )