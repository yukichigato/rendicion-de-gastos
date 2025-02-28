from ..utils import connection
from psycopg2 import DatabaseError
from ..types import PublicUser, TokenUser

def findUsers (limit: int, offset: int):
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
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT profile_picture_url, name, rut, tel, email, status, area FROM users WHERE id = %s",
            (id,)   # Honestly this is really stupid. 
                    # psycopg2.cursor.execute expects a tuple, so you need the trailing comma.
        )
        rows = cursor.fetchone()[0]
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
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT id, name, rut, password, status FROM users WHERE email = %s",
            (email,)    # Honestly this is really stupid. 
                        # psycopg2.cursor.execute expects a tuple, so you need the trailing comma.
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
    