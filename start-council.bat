@echo off
echo 🧠 Starting LLM Council System
echo ================================

REM Check if we're in the right directory
if not exist "backend\main.py" (
    echo ❌ Please run this from the OmniMind-AI root directory
    pause
    exit /b 1
)

REM Check API keys
if "%OPENAI_API_KEY%"=="" (
    echo ⚠️  OPENAI_API_KEY not set - using fallback mode
    echo    Set it for full functionality: set OPENAI_API_KEY=your-key
) else (
    echo ✅ OpenAI API key configured
)

if "%TAVILY_API_KEY%"=="" (
    echo ⚠️  TAVILY_API_KEY not set - web research disabled
    echo    Set it for web search: set TAVILY_API_KEY=your-key
) else (
    echo ✅ Tavily API key configured
)

echo.
echo 🚀 Starting backend server...
echo    API will be available at: http://localhost:8000
echo    Health check: http://localhost:8000/api/council/health
echo    Docs: http://localhost:8000/docs
echo.

cd backend

REM Install dependencies if needed
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

echo 📦 Installing dependencies...
call venv\Scripts\activate
pip install -r requirements.docker.txt

echo.
echo 🎯 Test the system:
echo    python test_council.py
echo.
echo 🌐 Starting FastAPI server...

REM Start the server
uvicorn main:app --reload --port 8000 --host 0.0.0.0