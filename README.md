# Task Manager (Full Stack)

A full-stack task management application with authentication.

The backend is built with **FastAPI** and **SQLAlchemy**, while a lightweight **React** frontend consumes the API.

---

## Features

- User registration and login
- JWT authentication
- Password hashing with bcrypt
- Protected API routes
- CRUD operations for tasks
- User-specific task ownership
- Automatic Swagger API documentation
- Dependency injection with FastAPI

---

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- JWT (python-jose)
- Passlib (bcrypt)

### Frontend
- React
- Context API
- TailwindCSS
- Fetch API

---

## Architecture

The backend follows a layered architecture:

- **routers** – API endpoints  
- **models** – database models (SQLAlchemy)  
- **schemas** – request/response validation (Pydantic)  
- **auth/security** – authentication and authorization logic  
- **database** – database connection and session management  

The frontend communicates with the backend through a small API layer and manages authentication state using React Context.

---

## Run locally

1. Create virtual environment
2. Install dependencies
```bash
pip install -r requirements.txt
