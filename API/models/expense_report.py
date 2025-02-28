from ..utils import connection
from psycopg2 import DatabaseError
from ..types import Union, Tuple, UUID, Cursor, List, Report
    
def getReports (limit: int, offset: int) -> Union[ List[Tuple[Report]], None ]:
    cursor: Cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT author_id, title, details, type, amount, backup_url FROM expense_report LIMIT %s OFFSET %s;",
            (limit, offset)
        )
        rows: List[Tuple[Report]] = cursor.fetchall()
        cursor.close()
        return rows
    
    except DatabaseError as error:
        print(f"Database error: {error}")
        connection.rollback()
        cursor.close()
        if rows is None:
            return []
        return None
    
def getReportByID (id: str) -> Union[ Tuple[Report], None ]:
    cursor: Cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT author_id, title, details, type, amount, backup_url FROM expense_report WHERE id = %s",
            (id,)
        )
        rows: Tuple[Report] = cursor.fetchone()[0]
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
    author_id: UUID,
    title: str,
    details: str,
    type: str,
    amount: int,
    backup_url: str
) -> Union[ Tuple[UUID], None ]:
    cursor: Cursor = connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO expense_report (author_id, title, details, type, amount, backup_url) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
            (author_id, title, details, type, amount, backup_url)
        )
        newID: Tuple[UUID] = cursor.fetchone()[0]
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
    