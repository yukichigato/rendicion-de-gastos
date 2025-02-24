from fastapi import APIRouter, HTTPException
from ..models.expense_report import createReport
from ..types import ReportData

reportRouter = APIRouter(prefix="/api/expense_report")

@reportRouter.post("/")
def postReport(reportData: ReportData):
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
        raise HTTPException(status_code = 500, detail="Server Error")