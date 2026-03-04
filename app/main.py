from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tasks, users

app = FastAPI(title="Task Manager API")

# CORS SKAL være efter app = FastAPI(...)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])
app.include_router(users.router, prefix="/users", tags=["Users"])


@app.get("/", tags=["Root"])
def root():
    return {"message": "Task Manager API is running 🔥"}