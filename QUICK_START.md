# 🚀 Quick Start Guide - ChatGPT-like LLM Council

## 🎯 What You Get

A **ChatGPT-like interface** where **5 AI agents debate** your questions:

- 🧠 **Analyst** - Logical reasoning
- 🔍 **Researcher** - Web research  
- ⚠️ **Critic** - Critical analysis
- 💭 **Debater** - Alternative viewpoints
- ✅ **Verifier** - Fact checking

## ⚡ 30-Second Setup

### 1. Start Backend
```bash
cd OmniMind-AI
start-council.bat  # Windows
# or
./start-council.sh  # Linux/Mac
```

### 2. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Open Browser
```
http://localhost:3000
```

**That's it!** You now have a ChatGPT-like interface with 5 AI agents.

## 🔑 Optional: Full AI Power

For complete functionality, set these API keys:

```bash
# Windows
set OPENAI_API_KEY=your-openai-key
set TAVILY_API_KEY=your-tavily-key

# Linux/Mac
export OPENAI_API_KEY="your-openai-key"
export TAVILY_API_KEY="your-tavily-key"
```

**Without API keys**: System works in demo mode with template responses.

## 💬 How to Use

1. **Type your question** in the chat input
2. **Press Enter** or click Send
3. **Watch 5 agents discuss** your question step by step
4. **Get final consensus** from all perspectives

### Example Questions
- "Should I invest in AI stocks in 2026?"
- "What are the pros and cons of remote work?"
- "Will renewable energy replace fossil fuels by 2030?"
- "How should I prepare for career changes in the AI era?"

## 🏗️ Architecture

```
Frontend (localhost:3000)
    ↓
Backend API (localhost:8000)
    ↓
┌─────────────────────────────────────┐
│  🧠 Analyst → 🔍 Researcher         │
│       ↓            ↓                │
│  ⚠️ Critic ← 💭 Debater ← ✅ Verifier │
└─────────────────────────────────────┘
    ↓
Final Consensus
```

## 🔧 Troubleshooting

### Frontend won't start?
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend errors?
```bash
cd backend
pip install -r requirements.docker.txt
python test_council.py
```

### API not working?
- Check backend is running on port 8000
- Verify `http://localhost:8000/api/council/health`
- Check browser console for errors

## 📱 What You'll See

### Chat Interface
- **Left sidebar**: Agent list and status
- **Main area**: ChatGPT-like conversation
- **Input box**: Type questions and get instant responses

### Agent Responses
Each agent responds with their unique perspective:
```
🧠 Analyst: "Let me break this down logically..."
🔍 Researcher: "Based on current market data..."
⚠️ Critic: "The main risks I see are..."
💭 Debater: "However, consider this alternative..."
✅ Verifier: "Synthesizing all viewpoints..."
```

### Final Consensus
After all agents respond, you get a comprehensive final answer combining all perspectives.

## 🎉 Success!

You now have a **ChatGPT-like multi-agent AI system** running locally!

- **Ask complex questions** and get multi-perspective answers
- **Watch AI agents debate** in real-time
- **Get comprehensive insights** from 5 different AI specialists

**Ready to start your first AI council discussion?** 🧠💭⚡