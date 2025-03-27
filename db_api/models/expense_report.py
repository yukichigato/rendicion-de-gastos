from ..utils import connection
from fastapi import UploadFile
from psycopg2 import DatabaseError, Binary
from io import BytesIO
from typing import *
from ..types import *
import mimetypes
    
def generate_get_many_query (
    author_id: str, # TODO : Update this with the proper UUIDv4 type
    name: str,
    type: str,      # TODO : Update this with the proper ExpenseType type
    minAmount: int,
    maxAmount: int,
    order: str
) -> Tuple[ List[str], List[str] ]:
    base_query: str = """
        SELECT
            expense_report.id,
            author_id, 
            name,
            type, 
            amount, 
            expense_report.status,
            expense_report.created_at
        FROM expense_report 
        LEFT JOIN users ON expense_report.author_id = users.id
    """

    conditions: List[str] = []
    params: List[str] = []

    if author_id is not None:
        conditions.append("author_id = %s")
        params.append(author_id)
    if name is not None:
        conditions.append("name = %s")
        params.append(name)
    if type is not None:
        conditions.append("type = %s")
        params.append(type)
    if minAmount is not None:
        conditions.append("amount >= %s")
        params.append(minAmount)
    if maxAmount is not None:
        conditions.append("amount <= %s")
        params.append(maxAmount)

    where_clause: str = " WHERE " + " AND ".join(conditions) if conditions else ""
    base_query += where_clause
    
    if order == "Newest":
        base_query += f" ORDER BY created_at DESC"
    else:
        base_query += f" ORDER BY created_at ASC"
        
    base_query += " LIMIT %s OFFSET %s"


    return base_query, params


def get_many (
    author_id: str, # TODO : Update this with the proper UUIDv4 type
    name: str,
    type: ExpenseType,
    minAmount: int,
    maxAmount: int,
    limit: int,
    offset: int,
    order: str
):
    """
    Retrieves multiple reports based on the provided filters.

    - **Parameters**:
      - `author_id` (str): The ID of the report's author (should be UUIDv4).
      - `name` (str): A name filter for reports.
      - `type` (ReportType): The type of report.
      - `minAmount` (int): The minimum amount filter.
      - `maxAmount` (int): The maximum amount filter.
      - `limit` (int): The number of results to return.
      - `offset` (int): The starting point for pagination.
      - `order` (str): Sorting order (e.g., `"Newest"` or `"Oldest"`).

    - **Returns**:
      - `list`: A list of matching reports from the database.
      - `[]`: An empty list if no reports match.
      - `None`: If a database error occurs.

    - **Error Handling**:
      - Catches `DatabaseError`, logs the error, rolls back the transaction, and returns `None` if the query fails.
    """
    cursor = connection.cursor()

    query, params = generate_get_many_query(author_id, name, type, minAmount, maxAmount, order)
    params.append(limit)
    params.append(offset)

    try:
        cursor.execute(query, tuple(params))
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
    
def get_one (id: str):
    """
    Retrieves a single expense report by its ID.

    - **Parameters**:
      - `id` (str): The unique identifier of the expense report.

    - **Returns**:
      - `tuple`: A tuple containing (`author_id`, `type`, `amount`, `created_at`, `status`).
      - `[]`: If no report is found.
      - `None`: If a database error occurs.

    - **Error Handling**:
      - Catches `DatabaseError`, logs the error, rolls back the transaction, and returns `None` if the query fails.
    """
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT author_id, type, amount, created_at, status FROM expense_report WHERE id = %s",
            (id,)
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
    
async def create_one (
    type: str,
    amount: int,
    file_name: str,
    file: UploadFile,
    author_id: str
):
    # TODO : Update
    """
    Inserts a new expense report into the database.

    - **Parameters**:
      - `author_id` (str): The ID of the report's author.
      - `type` (str): The type of the expense report.
      - `amount` (int): The amount related to the report.

    - **Returns**:
      - `tuple`: A tuple containing the newly created report's ID.
      - `[]`: If the insertion fails.
      - `None`: If a database error occurs.

    - **Error Handling**:
      - Catches `DatabaseError`, logs the error, rolls back the transaction, and returns `None` if the query fails.
    """
    cursor = connection.cursor()
    try:
        binary_data = await file.read()
        cursor.execute(
            "INSERT INTO expense_report (author_id, type, amount, file_name, file) VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (author_id, type, amount, file_name, Binary(binary_data))
        )
        row = cursor.fetchone()
        connection.commit()
        cursor.close()
        if row is None:
            return { "id": "" }
        return {"id": row["id"]}
    
    except DatabaseError as error:
        print(f"Database error: {error}")
        connection.rollback()
        cursor.close()
        return None
    
def update_one(id: str, status: str):
    """
    Updates the status of an expense report.

    - **Parameters**:
      - `id` (str): The unique identifier of the expense report.
      - `status` (str): The new status to be set.

    - **Returns**:
      - `None`: If the update is successful or if a database error occurs.

    - **Error Handling**:
      - Catches `DatabaseError`, logs the error, and rolls back the transaction in case of failure.
    """
    cursor = connection.cursor()
    try:
        cursor.execute(
            "UPDATE expense_report SET status = %s WHERE id = %s",
            (status, id)
        )
        connection.commit()
        cursor.close()
        return
    
    except DatabaseError as error:
        print(f"Database error: {error}")
        connection.rollback()
        cursor.close()
        return None
    
def get_file(id: str):
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT file_name, file FROM expense_report WHERE id = %s", (id,))
        row = cursor.fetchone()
        cursor.close()

        # if row is None:
        #     return None, None, None
        
        # Fetching file name and file-like
        file_name = row["file_name"]
        file_like = row["file"]

        # Guessing file type (PDF, PNG, JPG...)
        mime_type, _ = mimetypes.guess_type(file_name)
        if mime_type is None:
            mime_type = "application/octet-stream"

        headers = {
            "Content-Disposition": f"attachment; filename={file_name}"
        }

        # We read the bytes from the file
        file_stream = BytesIO(file_like)

        return file_stream, mime_type, headers
    
    except DatabaseError as error:
        print(f"Database error: {error}")
        connection.rollback()
        cursor.close()
        return None