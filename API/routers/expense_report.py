from fastapi import APIRouter, HTTPException
from ..models.expense_report import createReport, getReports, getReportByID
from ..types import *

reportRouter = APIRouter(prefix="/api/expense_report")

@reportRouter.post("/")
def postReport(reportData: Report):
    try:
        newID = createReport(
            reportData.author_id,
            reportData.title,
            reportData.details,
            reportData.type,
            reportData.amount,
            reportData.backup_url
        )
        return { "id": newID }
    except Exception as error:
        raise HTTPException(status_code = 500, detail = f"Server Error ${str(error)}")
    
@reportRouter.get("/{id}")
def getReport(id: str):
    try:
        rows = getReportByID(id)
        return rows
    except Exception as error:
        raise HTTPException(status_code = 500, detail = f"Server Error ${str(error)}")
    
@reportRouter.get('/')
def getAllRerports(limit: int = 999, offset: int = 0):
    try:
        rows = getReports(limit, offset)
        return rows
    except Exception as error:
        raise HTTPException(status_code = 500, detail = f"Server Error ${str(error)}")