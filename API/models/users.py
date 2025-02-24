from ..utils import connection
from psycopg2 import DatabaseError

def getUsers (limit, offset):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT profile_picture_url, name, rut, tel, email, status, area FROM users LIMIT %s OFFSET %s;",
            (limit, offset)
        )
        rows = cursor.fetchall()
        cursor.close()
        return rows
    
    except DatabaseError as error:
        print(f"Database error: {error}")
        connection.rollback()
        cursor.close()
        return None

def getUserByID (id):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT profile_picture_url, name, rut, tel, email, status, area FROM users WHERE id = %s",
            (id)
        )
        rows = cursor.fetchone()[0]
        cursor.close()
        return rows
    
    except DatabaseError as error:
        print(f"Database error: {error}")
        connection.rollback()
        cursor.close()
        return None


def createUser (profile_picture_url, name, rut, password, tel, email, status, area):
    cursor = connection.cursor()
    try:
        cursor.execute(
            """
            INSERT INTO users (profile_picture_url, name, rut, password, tel, email, status, area)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;
            """,
            (profile_picture_url, name, rut, password, tel, email, status, area)
        )
        newID = cursor.fetchone()[0]
        connection.commit()
        cursor.close()
        return newID
    
    except DatabaseError as error:
        print(f"Database error: {error}")
        connection.rollback()
        cursor.close()
        return None