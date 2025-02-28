from ..utils import connection
from psycopg2 import DatabaseError
    
def getReports (limit: int, offset: int):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT author_id, type, amount, backup_url FROM expense_report LIMIT %s OFFSET %s;",
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
    
def getReportByID (id: str):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT author_id, type, amount, backup_url FROM expense_report WHERE id = %s",
            (id,)
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
    
def createReport (
    author_id: str,
    type: str,
    amount: int,
    backup_url: str
):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO expense_report (author_id, type, amount, backup_url) VALUES (%s, %s, %s, %s) RETURNING id",
            (author_id, type, amount, backup_url)
        )
        newID = cursor.fetchone()[0]
        connection.commit()
        cursor.close()
        if newID is None:
            return []
        return newID
    
    except DatabaseError as error:
        print(f"Database error: {error}")
        connection.rollback()
        cursor.close()
        return None
    