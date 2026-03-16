#!/bin/bash

echo "🚀 OmniMind AI - Full System Startup"
echo "====================================="

# Check if we're in the right directory
if [ ! -f "backend/main.py" ]; then
    echo "❌ Please run this from the OmniMind-AI root directory"
    exit 1
fi

if [ ! -f "frontend/package.json" ]; then
    echo "❌ Frontend directory not found"
    exit 1
fi

echo "✅ Project structure verified"
echo ""

# Check API keys
echo "🔑 Checking API configuration..."
if [ -z "$OPENAI_API_KEY" ]; then
    echo "⚠️  OPENAI_API_KEY not set"
    echo "   Set it for full LLM Council functionality"
else
    echo "✅ OpenAI API key configured"
fi

if [ -z "$GOOGLE_API_KEY" ]; then
    echo "⚠️  GOOGLE_API_KEY not set (optional)"
    echo "   Set it for Gemini Pro agents"
else
    echo "✅ Google API key configured"
fi

if [ -z "$GROQ_API_KEY" ]; then
    echo "⚠️  GROQ_API_KEY not set (optional)"
    echo "   Set it for Llama 3.1 agents"
else
    echo "✅ Groq API key configured"
fi

if [ -z "$TAVILY_API_KEY" ]; then
    echo "⚠️  TAVILY_API_KEY not set (optional)"
    echo "   Set it for web research"
else
    echo "✅ Tavily API key configured"
fi

echo ""
echo "📋 System will start with available providers"
echo ""

# Setup frontend if needed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Frontend dependencies not found"
    echo "   Setting up frontend first..."
    ./frontend-setup.sh
    if [ $? -ne 0 ]; then
        echo "❌ Frontend setup failed"
        exit 1
    fi
fi

echo "🎯 Starting Multi-Provider LLM Council System..."
echo ""
echo "🔧 System Architecture:"
echo "   Backend:  FastAPI + Multi-Provider LLM Council"
echo "   Frontend: Next.js 14 + TypeScript + Tailwind"
echo "   Agents:   7 agents across OpenAI/Gemini/Groq"
echo ""
echo "📡 Services starting:"
echo "   Backend:  http://localhost:8000"
echo "   Frontend: http://localhost:3000"
echo "   API Docs: http://localhost:8000/docs"
echo "   Health:   http://localhost:8000/api/council/health"
echo ""

# Function to start backend
start_backend() {
    echo "🔄 Starting backend server..."
    cd backend
    
    # Check if virtual environment exists
    if [ ! -d "venv" ]; then
        echo "📦 Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install dependencies if needed
    if [ ! -f "venv/pyvenv.cfg" ] || [ requirements.docker.txt -nt venv/pyvenv.cfg ]; then
        echo "📦 Installing Python dependencies..."
        pip install -r requirements.docker.txt
    fi
    
    # Start the server
    python -m uvicorn main:app --reload --port 8000 &
    BACKEND_PID=$!
    cd ..
    
    echo "✅ Backend started (PID: $BACKEND_PID)"
}

# Function to start frontend
start_frontend() {
    echo "🔄 Starting frontend server..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    
    echo "✅ Frontend started (PID: $FRONTEND_PID)"
}

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down services..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo "✅ Backend stopped"
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo "✅ Frontend stopped"
    fi
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start services
start_backend
sleep 5  # Wait for backend to initialize

# Check if backend started successfully
if curl -s http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ Backend started successfully"
else
    echo "⚠️  Backend may still be starting..."
fi

start_frontend

echo ""
echo "🎉 Full system startup completed!"
echo ""
echo "📱 Access Points:"
echo "   🌐 Main App:     http://localhost:3000"
echo "   🔧 API Docs:     http://localhost:8000/docs"
echo "   🏥 Health Check: http://localhost:8000/api/council/health"
echo "   📊 Council API:  http://localhost:8000/api/council/chat/start"
echo ""
echo "💡 Usage:"
echo "   1. Open http://localhost:3000 in your browser"
echo "   2. Sign in to access the LLM Council chat"
echo "   3. Ask complex questions to see 7 agents debate"
echo "   4. Watch multi-provider AI collaboration"
echo ""
echo "🛑 To stop: Press Ctrl+C"
echo ""

# Wait for user interrupt
while true; do
    sleep 1
done