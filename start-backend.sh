#!/bin/bash
echo "Starting Backend..."
cd backend || exit

# Check if the virtual environment exists and activate it
if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
else
    echo "Virtual environment not found in backend/venv. Ensure you have set it up."
fi

uvicorn main:app --reload
