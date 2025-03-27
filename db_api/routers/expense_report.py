from fastapi import APIRouter, HTTPException, status, UploadFile, Form, File,  Query
from fastapi.responses import StreamingResponse
from ..models.expense_report import create_one, get_many, get_one, update_one, get_file
from ..types import *

reportRouter = APIRouter(prefix="/api/expense_report")

@reportRouter.get("/{id}")
def get_report_by_id(id: str):             # TODO : Update this with the proper UUIDv4 type
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
        "created_at": 2013-01-02 03:45:00,
        "status": "Pending"
    }
    """
    try:
        rows = get_one(id)
        return rows
    except Exception as error:
        print(f"Server Error: {str(error)}")
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = "An unexpected error occurred while processing your request."
        )
    
@reportRouter.get('/')
def get_many_reports(
    author_id: str = Query(None),   # TODO : Update this with the proper UUIDv4 type
    name: str = Query(None),
    type: ExpenseType = Query(None),
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
            "created_at": 2013-01-02 03:45:00,
            "status": "Pending"
        },
        {
            "author_id": "cb717c99-7d9c-43cd-a614-5d039baa39d2",
            "type": "Otros",
            "amount": 3400,
            "created_at": 2013-01-01 16:45:00,
            "status": "Accepted"
        }
    ]
    """
    try:
        rows = get_many(
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
async def post_new_report(
  type: str = Form(...),
  amount: int = Form(...),
  file_name: str = Form(...), 
  file: UploadFile = File(...),
  author_id: str = Form(...)
):
    # TODO : Update
    """
    Creates a new report based on the provided `reportData`.

    - **Parameters**:
      - `reportData`: A `Report` object containing:
        - `author_id`: The ID of the report's author. UUIDv4 string.
        - `type`: The report's type, has to be one of the allowed strings in the database.
        - `amount`: The amount related to the report, positive.

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
    }
    Response: 
    { "newID": "522768a3-dd71-4ffb-a123-e72f1520f645" }
    """
    try:
        newID = await create_one(
            type,
            amount,
            file_name,
            file,
            author_id
        )
        return newID
    except Exception as error:
        print(f"Server Error: {str(error)}")
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = "An unexpected error occurred while processing your request."
        )
    
@reportRouter.patch("/{id}")
def patch_report(id: str, status_update: StatusUpdate):             # TODO : Update this with the proper UUIDv4 type
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
        update_one(id, status_update.status)
        return
    except Exception as error:
        print(f"Server Error: {str(error)}")
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = "An unexpected error occurred while processing your request."
        )
    
@reportRouter.get("/file/{id}")
async def get_one_file(id: str):
    try:
        file_stream, mime_type, headers = get_file(id)

        '''
        # Since we're working with file-like objects, we use a streaming response, not 
        # a JSONResponse(), used by default by FastAPI

        
        # Please keep in mind that returning 
        #   {"id": rows["id"], "title": rows["title"], "file": StreamingResponse(BytesIO(rows["file"]))}
        # is NOT possible, since it's a different response type (JSONResponse()).
        '''
        return StreamingResponse(file_stream, media_type = mime_type, headers = headers)
    
    except Exception as error:
        print(f"Server Error: {str(error)}")
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = "An unexpected error occurred while processing your request."
        )