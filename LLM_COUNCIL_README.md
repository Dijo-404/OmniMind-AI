# 🧠 LLM Council - Multi-Agent Chat System

A powerful 5-agent debate system integrated into OmniMind-AI where specialized AI agents discuss and debate complex questions to reach consensus.

## 🤖 The 5 Agents

| Agent | Role | Emoji | Specialty |
|-------|------|-------|-----------|
| **Analyst** | Logical Reasoning | 🧠 | Breaks down problems systematically |
| **Researcher** | Web Research | 🔍 | Finds current facts using Tavily search |
| **Critic** | Critical Analysis | ⚠️ | Identifies flaws and risks |
| **Debater** | Alternative Views | 💭 | Presents counter-arguments |
| **Verifier** | Fact Checking | ✅ | Validates and synthesizes final answer |

## 🚀 Quick Start

### 1. Set up API Keys

```bash
# Required for full functionality
export OPENAI_API_KEY="your-openai-key"
export TAVILY_API_KEY="your-tavily-key"  # Optional, for web research
```

### 2. Test the System

```bash
cd backend
python test_council.py
```

### 3. Start the Backend

```bash
cd backend
uvicorn main:app --reload --port 8000
```

## 📡 API Endpoints

### Start a Chat Session
```bash
POST /api/council/chat/start
{
  "question": "Should I invest in renewable energy stocks?"
}
```

### Add Individual Agent
```bash
POST /api/council/chat/add-agent
{
  "session_id": "abc123",
  "agent": "analyst"  # or researcher, critic, debater, verifier
}
```

### Run Full Council Discussion
```bash
POST /api/council/chat/run-all/{session_id}
```

### Get Chat Session
```bash
GET /api/council/chat/{session_id}
```

## 🔧 Usage Examples

### Python Example
```python
import requests

# Start session
response = requests.post("http://localhost:8000/api/council/chat/start", 
    json={"question": "Will AGI happen before 2035?"})
session_id = response.json()["session_id"]

# Run full council
result = requests.post(f"http://localhost:8000/api/council/chat/run-all/{session_id}")
chat_data = result.json()

print("Final Answer:", chat_data["final_answer"])
```

### cURL Example
```bash
# Start chat
curl -X POST "http://localhost:8000/api/council/chat/start" \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the pros and cons of remote work?"}'

# Run full council (replace SESSION_ID)
curl -X POST "http://localhost:8000/api/council/chat/run-all/SESSION_ID"
```

## 🏗️ Architecture

```
User Question
     ↓
Chat Session Created
     ↓
┌─────────────────────────────────────┐
│  🧠 Analyst → 🔍 Researcher         │
│       ↓            ↓                │
│  ⚠️ Critic ← 💭 Debater ← ✅ Verifier │
└─────────────────────────────────────┘
     ↓
Final Consensus Generated
```

## 🎯 Features

- **Multi-Agent Discussions**: 5 specialized agents with different perspectives
- **Web Research**: Real-time search integration via Tavily API
- **Fallback Mode**: Works without API keys (limited functionality)
- **Chat Interface**: Step-by-step conversation flow
- **Individual Agents**: Add specific agents to ongoing discussions
- **Full Council**: Run all agents in sequence automatically
- **Session Management**: Persistent chat sessions with history

## 🔍 Example Output

```
Question: "Should I start a tech startup in 2026?"

🧠 Analyst: Based on market analysis, tech startups in 2026 face both opportunities and challenges...

🔍 Researcher: Recent data shows that 73% of startups fail within 10 years, but AI and climate tech sectors show 40% growth...

⚠️ Critic: The main risks include market saturation, funding challenges, and regulatory uncertainty...

💭 Debater: However, consider the alternative perspective - waiting might mean missing the AI revolution window...

✅ Verifier: Synthesizing all viewpoints, the decision depends on your specific niche, funding, and risk tolerance...

🎯 Final Consensus: Starting a tech startup in 2026 can be viable if you focus on emerging niches like AI tools, climate tech, or healthcare innovation. Key success factors include...
```

## 🛠️ Configuration

### Environment Variables
```bash
# Core LLM (Required for full functionality)
OPENAI_API_KEY=your_openai_key

# Web Research (Optional)
TAVILY_API_KEY=your_tavily_key

# Existing OmniMind-AI config
DATABASE_URL=postgresql+asyncpg://...
REDIS_URL=redis://...
```

### Fallback Mode
- System works without API keys
- Provides template responses
- Useful for testing and development

## 🧪 Testing

```bash
# Test individual components
python test_council.py

# Test API endpoints
curl http://localhost:8000/api/council/health

# Check agent list
curl http://localhost:8000/api/council/agents
```

## 🔗 Integration

The LLM Council integrates seamlessly with the existing OmniMind-AI platform:

- Uses the same FastAPI backend
- Shares database and Redis connections
- Compatible with existing authentication
- Can be extended with more agents or features

## 📈 Next Steps

1. **Frontend Integration**: Add React components for chat interface
2. **WebSocket Support**: Real-time agent responses
3. **Agent Customization**: User-defined agent personalities
4. **Voting System**: Agent consensus scoring
5. **Memory**: Cross-session learning and context

---

**Ready to start debating with AI agents? Fire up the backend and ask your first question!** 🚀