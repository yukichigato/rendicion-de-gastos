from ..utils import connection
from psycopg2 import DatabaseError
from ..types import Union, Tuple, List, PublicUser, Cursor, UUID, TokenUser

def findUsers (limit: int, offset: int) -> Union[List[Tuple[PublicUser]], None]:
    cursor: Cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT name, rut, tel, email, status, area FROM users LIMIT %s OFFSET %s;",
            (limit, offset)
        )
        rows: List[Tuple[PublicUser]] = cursor.fetchall()
        cursor.close()
        return rows
    
    except DatabaseError as error:
        print(f"Database error: {error}")
        connection.rollback()
        cursor.close()
        return None

def findUserByID (id: UUID) -> Union[Tuple[PublicUser], None]:
    cursor: Cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT profile_picture_url, name, rut, tel, email, status, area FROM users WHERE id = %s",
            (id)
        )
        rows: Tuple[PublicUser] = cursor.fetchone()[0]
        cursor.close()
        return rows
    
    except DatabaseError as error:
        print(f"Database error: {error}")
        connection.rollback()
        cursor.close()
        return None

def findUserByEmail(email: str) -> Union[ Tuple[TokenUser], None ]:
    cursor: Cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT id, name, rut, password, status FROM users WHERE email = %s",
            (email)
        )
        userInfo: Tuple[TokenUser] = cursor.fetchOne()[0]
        cursor.close()
        return userInfo
    except DatabaseError as error:
        print(f"Database error: {error}")
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
) -> Union[ Tuple[UUID], None]:
    cursor: Cursor = connection.cursor()
    try:
        cursor.execute(
            """
            INSERT INTO users (name, rut, password, tel, email, status, area)
            VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id;
            """,
            (name, rut, password, tel, email, status, area)
        )
        newID: Tuple[UUID] = cursor.fetchone()[0]
        connection.commit()
        cursor.close()
        return newID
    
    except DatabaseError as error:
        print(f"Database error: {error}")
        connection.rollback()
        cursor.close()
        return None
    