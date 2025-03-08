from fastapi import APIRouter, HTTPException, Query, status
from ..models.expense_report import createOne, getMany, getOne, updateOne
from ..types import *

reportRouter = APIRouter(prefix="/api/expense_report")

@reportRouter.get("/{id}")
def getReportByID(id: str):             # TODO : Update this with the proper UUIDv4 type
    """
    Gets an expense report that matches the parameter ID.

    - **Parameters**:
      - `id`: The unique identifier of the expense report. UUIDv4 string.

    - **Returns**:
      - The info of an expense report (rows).

    - **Error Handling**:
      - If an error occurs during report fetching, a 500 Internal Server Error is returned with a generic message.

    Example:
    GET /expense_report/522768a3-dd71-4ffb-a123-e72f1520f645
    Response: 
    {
        "author_id": "2d0ca061-e786-4f75-ac81-09c009285ba7",
        "type": "Otros",
        "amount": 1000,
        "backup_url": "https://example.com/backup",
        "created_at": 2013-01-02 03:45:00,
        "status": "Pending"
    }
    """
    try:
        rows = getOne(id)
        return rows
    except Exception as error:
        print(f"Server Error: {str(error)}")
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = "An unexpected error occurred while processing your request."
        )
    
@reportRouter.get('')
def getReports(
    author_id: str = Query(None),   # TODO : Update this with the proper UUIDv4 type
    name: str = Query(None),
    type: ReportType = Query(None),
    minAmount: int = Query(None),
    maxAmount: int = Query(None),
    limit: int = Query(999),
    offset: int = Query(0),
    order: str = Query('Newest')
):
    """
    Gets all expense reports that match the input parameters.

    - **Parameters**:
      -  `author_id`: The unique identifier of the expense report's author.
      -  `name`: Name of the report's author.
      -  `type`: The report's type, has to be one of the allowed ones in the database.
      -  `minAmount`: Minimum amount related to the expense report.
      -  `maxAmount`: Maximum amount related to the expense report.
      -  `limit`: Maximum amounts of expense reports to fetch.
      -  `offset`: Starting index for retrieval.
      -  `order`: Order in which the expense reports will be shown (Newest/Oldest).

    - **Returns**:
      - An array of expense report information (rows).

    - **Error Handling**:
      - If an error occurs during report fetching, a 500 Internal Server Error is returned with a generic message.

    Example:
    GET /expense_report?name=Yukichi+Takeda&maxAmount=3990&type=Other&offset=0&limit=0&order=Newest
    Response: 
    [
        {
            "author_id": "2d0ca061-e786-4f75-ac81-09c009285ba7",
            "type": "Otros",
            "amount": 1000,
            "backup_url": "https://example.com/backup",
            "created_at": 2013-01-02 03:45:00,
            "status": "Pending"
        },
        {
            "author_id": "cb717c99-7d9c-43cd-a614-5d039baa39d2",
            "type": "Otros",
            "amount": 3400,
            "backup_url": "https://example.com/backup2",
            "created_at": 2013-01-01 16:45:00,
            "status": "Accepted"
        }
    ]
    """
    try:
        rows = getMany(
            author_id,
            name,
            type,
            minAmount,
            maxAmount,
            limit,
            offset,
            order
        )
        return rows
    except Exception as error:
        print(f"Server Error: {str(error)}")
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = "An unexpected error occurred while processing your request."
        )

@reportRouter.post("")
def postReport(reportData: Report):
    """
    Creates a new report based on the provided `reportData`.

    - **Parameters**:
      - `reportData`: A `Report` object containing:
        - `author_id`: The ID of the report's author. UUIDv4 string.
        - `type`: The report's type, has to be one of the allowed strings in the database.
        - `amount`: The amount related to the report, positive.
        - `backup_url`: A URL for the expense backup.

    - **Returns**:
      - The newly created UUID for the expense report. (`newID`).

    - **Error Handling**:
      - If an error occurs during report creation, a 500 Internal Server Error is returned with a generic message.

    Example:
    POST /expense_report
    Request body: 
    {
        "author_id": "2d0ca061-e786-4f75-ac81-09c009285ba7",
        "type": "Otros",
        "amount": 1000,
        "backup_url": "https://example.com/backup"
    }
    Response: 
    { "newID": "522768a3-dd71-4ffb-a123-e72f1520f645" }
    """
    try:
        newID = createOne(
            reportData.author_id,
            reportData.type,
            reportData.amount,
            reportData.backup_url
        )
        return newID
    except Exception as error:
        print(f"Server Error: {str(error)}")
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = "An unexpected error occurred while processing your request."
        )
    
@reportRouter.patch("/{id}")
def patchRerort(id: str, status_update: StatusUpdate):             # TODO : Update this with the proper UUIDv4 type
    """
    Updates an expense report's status that matches the parameter ID.

    - **Parameters**:
      - `id`: The ID of the expense report. UUIDv4 string.

    - **Error Handling**:
      - If an error occurs during report update, a 500 Internal Server Error is returned with a generic message.

    Example:
    PATCH /expense_report/522768a3-dd71-4ffb-a123-e72f1520f645
    Request body: 
    { "status": "Accepted" }
    """
    try:
        updateOne(id, status_update.status)
        return
    except Exception as error:
        print(f"Server Error: {str(error)}")
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = "An unexpected error occurred while processing your request."
        )