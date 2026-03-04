from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app import models
from app.database import get_db
from app.schemas import TaskCreate, TaskUpdate, TaskResponse
from app.auth import get_current_user

router = APIRouter()


# 🔥 Helper function (avoids duplication)
def get_user_task(db: Session, task_id: int, user_id: int):
    task = (
        db.query(models.Task)
        .filter(
            models.Task.id == task_id,
            models.Task.owner_id == user_id,
        )
        .first()
    )
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found",
        )
    return task


# 🔐 CREATE TASK
@router.post(
    "/",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    db_task = models.Task(
        title=task.title,
        description=task.description,
        is_done=task.is_done,
        priority=task.priority,
        owner_id=current_user.id,
    )

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task


# 🔐 GET ALL USER TASKS
@router.get("/", response_model=List[TaskResponse])
def get_tasks(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return (
        db.query(models.Task)
        .filter(models.Task.owner_id == current_user.id)
        .all()
    )


# 🔐 GET SINGLE TASK
@router.get("/{task_id}", response_model=TaskResponse)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return get_user_task(db, task_id, current_user.id)


# 🔐 UPDATE TASK
@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    task = get_user_task(db, task_id, current_user.id)

    update_data = task_update.dict(exclude_unset=True)

    for field, value in update_data.items():
        setattr(task, field, value)

    db.commit()
    db.refresh(task)

    return task


# 🔐 DELETE TASK
@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    task = get_user_task(db, task_id, current_user.id)

    db.delete(task)
    db.commit()

    return