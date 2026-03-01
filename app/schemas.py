from pydantic import BaseModel
from typing import Optional


# ========================
# TASK SCHEMAS
# ========================

class TaskBase(BaseModel):
    title: str
    description: str
    is_done: bool = False
    priority: int = 1


class TaskCreate(TaskBase):
    pass  # owner_id sættes automatisk fra current_user


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_done: Optional[bool] = None
    priority: Optional[int] = None


class TaskResponse(TaskBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True


# ========================
# USER SCHEMAS
# ========================

class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True