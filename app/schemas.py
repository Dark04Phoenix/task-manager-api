from pydantic import BaseModel


class TaskBase(BaseModel):
    title: str
    description: str
    is_done: bool = False


class TaskCreate(TaskBase):
    pass


class TaskUpdate(TaskBase):
    pass


class TaskResponse(TaskBase):
    id: int

    class Config:
        from_attributes = True   # ⭐ VIGTIGT (Pydantic v2)