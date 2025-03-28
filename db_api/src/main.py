from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers.users import userRouter
from .routers.expense_report import reportRouter

app = FastAPI()

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Accept requests from any origin
    allow_credentials=True,  # Allow cookies
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Endpoint: .../api/users
app.include_router(userRouter)

# Endpoint: .../api/expense_report
app.include_router(reportRouter)

app.router.redirect_slashes = False