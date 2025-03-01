from ..utils import connection
from psycopg2 import DatabaseError
from typing import List, Tuple
    
def makeGetManyQuery (
    author_id: str, # TODO : Update this with the proper UUIDv4 type
    name: str,
    type: str,      # TODO : Update this with the proper ExpenseType type
    minAmount: int,
    maxAmount: int,
) -> Tuple[ List[str], List[str] ]:
    base_query: str = """
        SELECT 
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
    base_query += " LIMIT %s OFFSET %s"

    return base_query, params


def getMany (
    author_id: str, # TODO : Update this with the proper UUIDv4 type
    name: str,
    type: str,      # TODO : Update this with the proper ExpenseType type
    minAmount: int,
    maxAmount: int,
    limit: int,
    offset: int
):
    cursor = connection.cursor()

    query, params = makeGetManyQuery(author_id, name, type, minAmount, maxAmount)
    params.append(limit)
    params.append(offset)

    print(query, params)

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
    