from fastapi import FastAPI
from .routers.users import userRouter
from .routers.expense_report import reportRouter

app = FastAPI()

# Endpoint: .../api/users
app.include_router(userRouter)

# Endpoint: .../api/expense_report
app.include_router(reportRouter)

app.router.redirect_slashes = False