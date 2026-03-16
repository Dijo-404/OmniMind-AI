"""
LLM Council Chat API Routes
Multi-provider chat interface for 7-agent discussions
OpenAI GPT-5.4 + Google Gemini Pro + Groq Llama 3.1
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime

from services.llm_council import llm_council_chat, ChatMessage, ChatSession

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


class AgentChatRequest(BaseModel):
    session_id: str
    agent: str  # analyst, researcher, critic, strategist, debater, synthesizer, verifier


class ChatResponse(BaseModel):
    session_id: str
    status: str
    question: str
    messages: List[ChatMessage]
    final_answer: str = ""
    agents_available: List[Dict[str, str]]


@router.post("/chat/start", response_model=dict)
async def start_chat(request: ChatRequest):
    """
    Start a new Multi-Provider LLM Council chat session
    
    Creates a session where 7 agents discuss the question using different AI providers:
    
    OpenAI GPT-5.4:
    🧠 Analyst - Logical reasoning
    🔍 Researcher - Web research
    
    Google Gemini Pro:
    ⚠️ Critic - Critical analysis
    🎯 Strategist - Strategic planning
    
    Groq Llama 3.1:
    💭 Debater - Counter arguments
    🔗 Synthesizer - Data synthesis
    
    Hybrid (Best Available):
    ✅ Verifier - Fact verification & consensus
    """
    session_id = await llm_council_chat.create_session(request.question)
    
    return {
        "session_id": session_id,
        "question": request.question,
        "status": "created",
        "message": "Multi-provider chat session started. 7 agents ready across OpenAI, Gemini, and Groq.",
        "agents": llm_council_chat.get_agent_list(),
        "providers": {
            "openai": "GPT-5.4 (Analyst, Researcher)",
            "gemini": "Gemini Pro (Critic, Strategist)", 
            "groq": "Llama 3.1 (Debater, Synthesizer)",
            "hybrid": "Best Available (Verifier)"
        }
    }


@router.post("/chat/add-agent", response_model=ChatMessage)
async def add_agent_to_chat(request: AgentChatRequest):
    """Add a specific agent's response to the chat"""
    try:
        message = await llm_council_chat.add_agent_message(request.session_id, request.agent)
        return message
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding agent: {str(e)}")


@router.post("/chat/run-all/{session_id}", response_model=ChatResponse)
async def run_all_agents(session_id: str):
    """Run all 7 agents in sequence for a complete multi-provider council discussion"""
    try:
        session = await llm_council_chat.run_full_council(session_id)
        
        return ChatResponse(
            session_id=session.session_id,
            status=session.status,
            question=session.question,
            messages=session.messages,
            final_answer=session.final_answer,
            agents_available=llm_council_chat.get_agent_list()
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error running multi-provider council: {str(e)}")


@router.get("/chat/{session_id}", response_model=ChatResponse)
async def get_chat_session(session_id: str):
    """Get current state of a chat session"""
    session = await llm_council_chat.get_session(session_id)
    
    if not session:
        raise HTTPException(status_code=404, detail="Chat session not found")
    
    return ChatResponse(
        session_id=session.session_id,
        status=session.status,
        question=session.question,
        messages=session.messages,
        final_answer=session.final_answer,
        agents_available=llm_council_chat.get_agent_list()
    )


@router.get("/agents")
async def list_agents():
    """Get list of all available agents"""
    return {
        "agents": llm_council_chat.get_agent_list(),
        "total": 5,
        "description": "5-Agent Council for multi-perspective discussions"
    }


@router.get("/chat/sessions")
async def list_chat_sessions():
    """List all active chat sessions"""
    sessions = []
    for session_id, session in llm_council_chat.sessions.items():
        sessions.append({
            "session_id": session_id,
            "question": session.question,
            "status": session.status,
            "message_count": len(session.messages),
            "created_at": session.created_at,
            "has_final_answer": bool(session.final_answer)
        })
    
    return {
        "sessions": sessions,
        "total": len(sessions)
    }


@router.delete("/chat/{session_id}")
async def delete_chat_session(session_id: str):
    """Delete a chat session"""
    if session_id not in llm_council_chat.sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    del llm_council_chat.sessions[session_id]
    return {"message": "Chat session deleted successfully"}


@router.get("/health")
async def council_health():
    """Check Multi-Provider LLM Council system health"""
    import os
    
    # Check provider availability
    providers_status = {
        "openai": {
            "configured": bool(os.getenv("OPENAI_API_KEY")),
            "model": "GPT-5.4",
            "agents": ["Analyst", "Researcher"]
        },
        "gemini": {
            "configured": bool(os.getenv("GOOGLE_API_KEY")),
            "model": "Gemini Pro", 
            "agents": ["Critic", "Strategist"]
        },
        "groq": {
            "configured": bool(os.getenv("GROQ_API_KEY")),
            "model": "Llama 3.1",
            "agents": ["Debater", "Synthesizer"]
        },
        "tavily": {
            "configured": bool(os.getenv("TAVILY_API_KEY")),
            "service": "Web Search",
            "agents": ["Researcher (enhanced)"]
        }
    }
    
    total_agents = 7
    active_providers = sum(1 for p in providers_status.values() if p.get("configured", False))
    
    return {
        "status": "healthy",
        "system": "Multi-Provider LLM Council",
        "total_agents": total_agents,
        "providers": providers_status,
        "active_providers": active_providers,
        "active_sessions": len(llm_council_chat.sessions),
        "features": [
            "Multi-provider AI discussions",
            "OpenAI GPT-5.4 integration",
            "Google Gemini Pro integration", 
            "Groq Llama 3.1 integration",
            "Web research with Tavily",
            "Cross-provider consensus building",
            "Fallback responses without API keys"
        ],
        "architecture": "7-Agent Multi-Provider Council"
    }