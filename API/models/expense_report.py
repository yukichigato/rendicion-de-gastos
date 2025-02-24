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