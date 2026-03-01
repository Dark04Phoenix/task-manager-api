from fastapi import FastAPI

from app.routers import tasks, users

app = FastAPI(title="Task Manager API")

app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])
app.include_router(users.router, prefix="/users", tags=["Users"])


@app.get("/", tags=["Root"])
def root():
    return {"message": "Task Manager API is running 🔥"}