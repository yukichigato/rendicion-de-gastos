from ..utils import connection
from psycopg2 import DatabaseError
from typing import *
from ..types import *
    
def makeGetManyQuery (
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
            backup_url, 
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


def getMany (
    author_id: str, # TODO : Update this with the proper UUIDv4 type
    name: str,
    type: ReportType,
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

    query, params = makeGetManyQuery(author_id, name, type, minAmount, maxAmount, order)
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
    
def getOne (id: str):
    """
    Retrieves a single expense report by its ID.

    - **Parameters**:
      - `id` (str): The unique identifier of the expense report.

    - **Returns**:
      - `tuple`: A tuple containing (`author_id`, `type`, `amount`, `backup_url`, `created_at`, `status`).
      - `[]`: If no report is found.
      - `None`: If a database error occurs.

    - **Error Handling**:
      - Catches `DatabaseError`, logs the error, rolls back the transaction, and returns `None` if the query fails.
    """
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT author_id, type, amount, backup_url, created_at, status FROM expense_report WHERE id = %s",
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
    
def createOne (
    author_id: str,
    type: str,
    amount: int,
    backup_url: str
):
    """
    Inserts a new expense report into the database.

    - **Parameters**:
      - `author_id` (str): The ID of the report's author.
      - `type` (str): The type of the expense report.
      - `amount` (int): The amount related to the report.
      - `backup_url` (str): A URL for backup or reference data.

    - **Returns**:
      - `tuple`: A tuple containing the newly created report's ID.
      - `[]`: If the insertion fails.
      - `None`: If a database error occurs.

    - **Error Handling**:
      - Catches `DatabaseError`, logs the error, rolls back the transaction, and returns `None` if the query fails.
    """
    cursor = connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO expense_report (author_id, type, amount, backup_url) VALUES (%s, %s, %s, %s) RETURNING id",
            (author_id, type, amount, backup_url)
        )
        newID = cursor.fetchone()
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
    
def updateOne(id: str, status: str):
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