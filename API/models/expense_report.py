from ..utils import connection
from psycopg2 import DatabaseError

def createReport (author_id, title, details, type, amount, backup_url):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO expense_report (author_id, title, details, type, amount, backup_url) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
            (author_id, title, details, type, amount, backup_url)
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
    
def getReports (limit, offset):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT author_id, title, details, type, amount, backup_url FROM expense_report LIMIT %s OFFSET %s;",
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
    
def getReportByID (id: str):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT author_id, title, details, type, amount, backup_url FROM expense_report WHERE id = %s",
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