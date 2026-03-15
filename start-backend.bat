@echo off
echo Starting Backend...
cd backend
if exist venv\Scripts\activate.bat (
    call venv\Scripts\activate.bat
) else (
    echo Virtual environment not found in backend\venv. Ensure you have set it up.
)
uvicorn main:app --reload
