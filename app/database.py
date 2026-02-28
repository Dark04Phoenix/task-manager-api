from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "sqlite:///./tasks.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # kun til SQLite
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()   #base class som er en klasse som alle dine ORM-modeller vil arve fra. 
                            #Det giver dig mulighed for at definere dine databasemodeller ved hjælp 
                            #af klasser, og SQLAlchemy vil håndtere oversættelsen mellem disse klasser og de faktiske database-tabeller.

from sqlalchemy.orm import Session
from fastapi import Depends


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()