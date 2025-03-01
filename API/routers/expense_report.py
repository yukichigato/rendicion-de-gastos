from fastapi import APIRouter, HTTPException, Query
from ..models.expense_report import createOne, getMany, getOne
from ..types import *

reportRouter = APIRouter(prefix="/api/expense_report")

@reportRouter.post("")
def postReport(reportData: Report):
    try:
        newID = createOne(
            reportData.author_id,
            reportData.type,
            reportData.amount,
            reportData.backup_url
        )
        return newID
    except Exception as error:
        raise HTTPException(status_code = 500, detail = f"Server Error ${str(error)}")
    
@reportRouter.get("/{id}")
def getReportByID(id: str):             # TODO : Update this with the proper UUIDv4 type
    try:
        rows = getOne(id)
        return rows
    except Exception as error:
        raise HTTPException(status_code = 500, detail = f"Server Error ${str(error)}")
    
@reportRouter.get('')
def getReports(
    author_id: str = Query(None),   # TODO : Update this with the proper UUIDv4 type
    name: str = Query(None),
    type: str = Query(None),        # TODO : Update this with the proper ExpenseType type
    minAmount: int = Query(None),
    maxAmount: int = Query(None),
    limit: int = Query(999),
    offset: int = Query(0),
    order: str = Query('Newest')
):
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
        raise HTTPException(status_code = 500, detail = f"Server Error {str(error)}")