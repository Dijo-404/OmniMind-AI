@echo off
echo 🚀 OmniMind AI - Full System Startup
echo =====================================

REM Check if we're in the right directory
if not exist "backend\main.py" (
    echo ❌ Please run this from the OmniMind-AI root directory
    pause
    exit /b 1
)

if not exist "frontend\package.json" (
    echo ❌ Frontend directory not found
    pause
    exit /b 1
)

echo ✅ Project structure verified
echo.

REM Check API keys
echo 🔑 Checking API configuration...
if "%OPENAI_API_KEY%"=="" (
    echo ⚠️  OPENAI_API_KEY not set
    echo    Set it for full LLM Council functionality
) else (
    echo ✅ OpenAI API key configured
)

if "%GOOGLE_API_KEY%"=="" (
    echo ⚠️  GOOGLE_API_KEY not set (optional)
    echo    Set it for Gemini Pro agents
) else (
    echo ✅ Google API key configured
)

if "%GROQ_API_KEY%"=="" (
    echo ⚠️  GROQ_API_KEY not set (optional)
    echo    Set it for Llama 3.1 agents
) else (
    echo ✅ Groq API key configured
)

if "%TAVILY_API_KEY%"=="" (
    echo ⚠️  TAVILY_API_KEY not set (optional)
    echo    Set it for web research
) else (
    echo ✅ Tavily API key configured
)

echo.
echo 📋 System will start with available providers
echo.

REM Setup frontend if needed
if not exist "frontend\node_modules" (
    echo 📦 Frontend dependencies not found
    echo    Setting up frontend first...
    call frontend-setup.bat
    if %errorlevel% neq 0 (
        echo ❌ Frontend setup failed
        pause
        exit /b 1
    )
)

echo 🎯 Starting Multi-Provider LLM Council System...
echo.
echo 🔧 System Architecture:
echo    Backend:  FastAPI + Multi-Provider LLM Council
echo    Frontend: Next.js 14 + TypeScript + Tailwind
echo    Agents:   7 agents across OpenAI/Gemini/Groq
echo.
echo 📡 Services starting:
echo    Backend:  http://localhost:8000
echo    Frontend: http://localhost:3000
echo    API Docs: http://localhost:8000/docs
echo    Health:   http://localhost:8000/api/council/health
echo.

REM Start backend in new window
echo 🔄 Starting backend server...
start "OmniMind Backend" cmd /k "cd backend && python -m uvicorn main:app --reload --port 8000"

REM Wait a moment for backend to start
echo ⏳ Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

REM Check if backend started
curl -s http://localhost:8000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend started successfully
) else (
    echo ⚠️  Backend may still be starting...
)

REM Start frontend in new window
echo 🔄 Starting frontend server...
start "OmniMind Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo 🎉 Full system startup initiated!
echo.
echo 📱 Access Points:
echo    🌐 Main App:     http://localhost:3000
echo    🔧 API Docs:     http://localhost:8000/docs  
echo    🏥 Health Check: http://localhost:8000/api/council/health
echo    📊 Council API:  http://localhost:8000/api/council/chat/start
echo.
echo 💡 Usage:
echo    1. Open http://localhost:3000 in your browser
echo    2. Sign in to access the LLM Council chat
echo    3. Ask complex questions to see 7 agents debate
echo    4. Watch multi-provider AI collaboration
echo.
echo 🛑 To stop: Close both terminal windows or press Ctrl+C in each
echo.

REM Wait for user input before closing
echo Press any key to close this window...
pause >nul