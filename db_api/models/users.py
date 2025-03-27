from ..utils import connection
from psycopg2 import DatabaseError
from ..types import PublicUser, TokenUser

def findUsers (limit: int, offset: int):
    """
    Retrieves a paginated list of users.

    - **Parameters**:
      - `limit` (int): The maximum number of users to retrieve.
      - `offset` (int): The starting index for retrieval.

    - **Returns**:
      - `list[tuple]`: A list of tuples containing (`name`, `rut`, `tel`, `email`, `status`, `area`).
      - `[]`: If no users are found.
      - `None`: If a database error occurs.

    - **Error Handling**:
      - Catches `DatabaseError`, logs the error, rolls back the transaction, and returns `None` if the query fails.
    """
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT name, rut, tel, email, status, area FROM users LIMIT %s OFFSET %s;",
            (limit, offset)
        )
        rows = cursor.fetchall()
        cursor.close()
        return rows
    
    except DatabaseError as error:
        print(f"Database error: {error}")
        connection.rollback()
        cursor.close()
        if rows is None:
            return []
        return None

def findUserByID (id: str):
    """
    Retrieves user information by ID.

    - **Parameters**:
      - `id` (str): The unique identifier of the user.

    - **Returns**:
      - `tuple`: A tuple containing (`name`, `rut`, `tel`, `email`, `status`, `area`) if the user is found.
      - `[]`: If no user is found.
      - `None`: If a database error occurs.

    - **Error Handling**:
      - Catches `DatabaseError`, logs the error, rolls back the transaction, and returns `None` if the query fails.
    """
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT name, rut, tel, email, status, area FROM users WHERE id = %s",
            (id,)   # Honestly this is really stupid. 
                    # psycopg2.cursor.execute expects a tuple, so you need the trailing comma.
        )
        rows = cursor.fetchone()
        cursor.close()
        if rows is None:
            return []
        return rows
    
    except DatabaseError as error:
        print(f"Database error: {error}")
        connection.rollback()
        cursor.close()
        if rows is None:
            return []
        return None

def findUserByEmail(email: str):
    """
    Retrieves user information by email.

    - **Parameters**:
      - `email` (str): The email address of the user.

    - **Returns**:
      - `tuple`: A tuple containing (`id`, `name`, `rut`, `password`, `status`) if the user is found.
      - `[]`: If no user is found.
      - `None`: If a database error occurs.

    - **Error Handling**:
      - Catches `DatabaseError`, logs the error, rolls back the transaction, and returns `None` if the query fails.
    """
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT id, name, rut, password, status FROM users WHERE email = %s",
            (email,)    # psycopg2 requires a tuple, hence the trailing comma.
        )
        userInfo = cursor.fetchone()
        cursor.close()
        if userInfo is None:
            return []
        return userInfo
    except DatabaseError as error:
        print(f"Database error: {error}, {email}")
        connection.rollback()
        cursor.close()
        return None

def createUser (
    name: str,
    rut: str,
    password: str,
    tel: str,
    email: str,
    status: str,
    area: str
):
    """
    Creates a new user in the database.

    - **Parameters**:
      - `name` (str): The full name of the user.
      - `rut` (str): The unique identifier (RUT) of the user.
      - `password` (str): The user's hashed password.
      - `tel` (str): The user's phone number.
      - `email` (str): The user's email address.
      - `status` (str): The current status of the user.
      - `area` (str): The department or area the user belongs to.

    - **Returns**:
      - `tuple`: A tuple containing the newly created user's ID.
      - `None`: If a database error occurs.

    - **Error Handling**:
      - Catches `DatabaseError`, logs the error, rolls back the transaction, and returns `None` if the query fails.
    """
    cursor = connection.cursor()
    try:
        cursor.execute(
            """
            INSERT INTO users (name, rut, password, tel, email, status, area)
            VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id;
            """,
            (name, rut, password, tel, email, status, area)
        )
        newID = cursor.fetchone()
        connection.commit()
        cursor.close()
        return newID
    
    except DatabaseError as error:
        print(f"Database error: {error}")
        connection.rollback()
        cursor.close()
        return None
