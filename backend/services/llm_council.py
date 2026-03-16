"""
LLM Council System - 5 Deep Agents Debate Architecture
Multi-agent debate system where 5 specialized agents debate and produce final consensus.
"""
import os
import asyncio
from typing import Dict, List, Any, Optional
from datetime import datetime

from langchain_openai import ChatOpenAI
from langchain_community.tools.tavily_search import TavilySearchResults
from pydantic import BaseModel


"""
LLM Council Chat System - Multi-Provider 7 Agents
Enhanced chat interface with OpenAI, Gemini, and Groq models
"""
import os
from typing import Dict, List, Any
from datetime import datetime
from pydantic import BaseModel

try:
    from langchain_openai import ChatOpenAI
    from langchain_google_genai import ChatGoogleGenerativeAI
    from langchain_groq import ChatGroq
    from langchain_community.tools.tavily_search import TavilySearchResults
    LANGCHAIN_AVAILABLE = True
except ImportError:
    LANGCHAIN_AVAILABLE = False


class ChatMessage(BaseModel):
    agent: str
    role: str
    message: str
    timestamp: datetime
    confidence: float = 0.8


class ChatSession(BaseModel):
    session_id: str
    question: str
    messages: List[ChatMessage] = []
    status: str = "active"  # active, completed
    created_at: datetime
    final_answer: str = ""


class LLMCouncilChat:
    """
    🧠 7-Agent Multi-Provider Council
    
    OpenAI Agents:
    - Agent 1: Analyst - Logical reasoning (GPT-5.4)
    - Agent 2: Researcher - Web research (GPT-5.4)
    
    Google Gemini Agents:
    - Agent 3: Critic - Critical analysis (Gemini Pro)
    - Agent 4: Strategist - Strategic planning (Gemini Pro)
    
    Groq Agents:
    - Agent 5: Debater - Counter arguments (Llama 3.1)
    - Agent 6: Synthesizer - Data synthesis (Llama 3.1)
    
    Hybrid Agent:
    - Agent 7: Verifier - Final verification (Best available model)
    """
    
    def __init__(self):
        self.sessions: Dict[str, ChatSession] = {}
        
        # Initialize multiple LLM providers
        self.llms = {}
        
        # OpenAI GPT-5.4
        if LANGCHAIN_AVAILABLE and os.getenv("OPENAI_API_KEY"):
            self.llms['openai'] = ChatOpenAI(
                model="gpt-5.4",
                temperature=0.7,
                api_key=os.getenv("OPENAI_API_KEY")
            )
        
        # Google Gemini Pro
        if LANGCHAIN_AVAILABLE and os.getenv("GOOGLE_API_KEY"):
            self.llms['gemini'] = ChatGoogleGenerativeAI(
                model="gemini-pro",
                temperature=0.7,
                google_api_key=os.getenv("GOOGLE_API_KEY")
            )
        
        # Groq Llama
        if LANGCHAIN_AVAILABLE and os.getenv("GROQ_API_KEY"):
            self.llms['groq'] = ChatGroq(
                model="llama-3.1-70b-versatile",
                temperature=0.7,
                groq_api_key=os.getenv("GROQ_API_KEY")
            )
        
        # Tavily Search
        self.search_available = bool(os.getenv("TAVILY_API_KEY"))
        if self.search_available:
            try:
                self.search = TavilySearchResults(k=3)
            except:
                self.search_available = False
        
        # Enhanced agent configurations with provider assignments
        self.agents = {
            "analyst": {
                "name": "Analyst",
                "role": "Logical Reasoning Specialist",
                "emoji": "🧠",
                "provider": "openai",
                "model": "GPT-5.4",
                "prompt": "You are an analytical AI powered by GPT-5.4. Break down problems logically and provide structured reasoning with clear frameworks."
            },
            "researcher": {
                "name": "Researcher", 
                "role": "Research Specialist",
                "emoji": "🔍",
                "provider": "openai",
                "model": "GPT-5.4",
                "prompt": "You are a research agent powered by GPT-5.4. Find facts, analyze data, and provide evidence-based insights with web research."
            },
            "critic": {
                "name": "Critic",
                "role": "Critical Analyst", 
                "emoji": "⚠️",
                "provider": "gemini",
                "model": "Gemini Pro",
                "prompt": "You are a critical analysis agent powered by Google Gemini Pro. Find flaws, identify risks, and challenge assumptions constructively."
            },
            "strategist": {
                "name": "Strategist",
                "role": "Strategic Planner",
                "emoji": "🎯",
                "provider": "gemini", 
                "model": "Gemini Pro",
                "prompt": "You are a strategic planning agent powered by Google Gemini Pro. Develop comprehensive strategies, roadmaps, and implementation plans."
            },
            "debater": {
                "name": "Debater",
                "role": "Alternative Viewpoints",
                "emoji": "💭",
                "provider": "groq",
                "model": "Llama 3.1",
                "prompt": "You are a debate agent powered by Groq Llama 3.1. Present counter-arguments, alternative perspectives, and challenge consensus."
            },
            "synthesizer": {
                "name": "Synthesizer",
                "role": "Data Synthesis",
                "emoji": "🔗",
                "provider": "groq",
                "model": "Llama 3.1", 
                "prompt": "You are a synthesis agent powered by Groq Llama 3.1. Combine different viewpoints, identify patterns, and create unified insights."
            },
            "verifier": {
                "name": "Verifier",
                "role": "Fact Checker & Consensus Builder",
                "emoji": "✅",
                "provider": "hybrid",
                "model": "Best Available",
                "prompt": "You are a verification agent using the best available model. Check facts, validate claims, and build final consensus from all perspectives."
            }
        }

    async def create_session(self, question: str) -> str:
        """Create a new chat session"""
        import uuid
        session_id = str(uuid.uuid4())[:8]
        
        session = ChatSession(
            session_id=session_id,
            question=question,
            created_at=datetime.utcnow()
        )
        
        self.sessions[session_id] = session
        return session_id

    async def get_session(self, session_id: str) -> Optional[ChatSession]:
        """Get chat session"""
        return self.sessions.get(session_id)

    async def run_agent_response(self, agent_key: str, question: str, context: str = "") -> str:
        """Get response from a specific agent using their assigned LLM provider"""
        agent = self.agents[agent_key]
        provider = agent.get("provider", "openai")
        
        # Get the appropriate LLM
        llm = None
        if provider == "hybrid":
            # Use best available model for hybrid agent
            llm = self.llms.get('openai') or self.llms.get('gemini') or self.llms.get('groq')
        else:
            llm = self.llms.get(provider)
        
        if not llm:
            # Fallback responses when LLM not available
            fallbacks = {
                "analyst": f"🧠 Analyst (GPT-5.4): I would analyze '{question}' by breaking it into logical components. (Set OPENAI_API_KEY for full analysis)",
                "researcher": f"🔍 Researcher (GPT-5.4): I would research '{question}' using web sources. (Set OPENAI_API_KEY + TAVILY_API_KEY for real research)",
                "critic": f"⚠️ Critic (Gemini Pro): I would identify potential issues with '{question}'. (Set GOOGLE_API_KEY for detailed critique)",
                "strategist": f"🎯 Strategist (Gemini Pro): I would develop strategic plans for '{question}'. (Set GOOGLE_API_KEY for strategic analysis)",
                "debater": f"💭 Debater (Llama 3.1): I would present alternative viewpoints on '{question}'. (Set GROQ_API_KEY for full debate)",
                "synthesizer": f"🔗 Synthesizer (Llama 3.1): I would synthesize different perspectives on '{question}'. (Set GROQ_API_KEY for synthesis)",
                "verifier": f"✅ Verifier (Best Model): I would fact-check and verify information about '{question}'. (Set API keys for verification)"
            }
            return fallbacks.get(agent_key, "Agent response unavailable")
        
        # Build prompt with provider context
        full_prompt = f"""{agent['prompt']}

Question: {question}

{f"Previous discussion: {context}" if context else ""}

Provide a focused response as the {agent['role']} using {agent['model']}. Keep it concise but insightful."""

        try:
            # Add search for researcher
            if agent_key == "researcher" and self.search_available:
                try:
                    search_results = self.search.run(question)
                    search_text = "\n".join([f"- {result}" for result in search_results[:2]])
                    full_prompt += f"\n\nSearch Results:\n{search_text}"
                except:
                    pass
            
            response = await llm.ainvoke(full_prompt)
            return f"{agent['emoji']} {agent['name']} ({agent['model']}): {response.content}"
            
        except Exception as e:
            return f"{agent['emoji']} {agent['name']} ({agent['model']}): Error - {str(e)}"

    async def add_agent_message(self, session_id: str, agent_key: str) -> ChatMessage:
        """Add a message from a specific agent to the chat"""
        session = self.sessions.get(session_id)
        if not session:
            raise ValueError("Session not found")
        
        # Get context from previous messages
        context = "\n".join([f"{msg.agent}: {msg.message}" for msg in session.messages[-3:]])
        
        # Get agent response
        response = await self.run_agent_response(agent_key, session.question, context)
        
        # Create message
        message = ChatMessage(
            agent=self.agents[agent_key]["name"],
            role=self.agents[agent_key]["role"],
            message=response,
            timestamp=datetime.utcnow()
        )
        
        session.messages.append(message)
        return message

    async def run_full_council(self, session_id: str) -> ChatSession:
        """Run all 7 agents in sequence"""
        session = self.sessions.get(session_id)
        if not session:
            raise ValueError("Session not found")
        
        # Run each agent in the enhanced sequence
        agent_sequence = ["analyst", "researcher", "critic", "strategist", "debater", "synthesizer", "verifier"]
        
        for agent_key in agent_sequence:
            await self.add_agent_message(session_id, agent_key)
        
        # Generate final consensus
        await self.generate_final_consensus(session_id)
        
        session.status = "completed"
        return session

    async def generate_final_consensus(self, session_id: str):
        """Generate final consensus from all agent responses using best available model"""
        session = self.sessions.get(session_id)
        if not session or not session.messages:
            return
        
        # Get best available LLM for consensus
        best_llm = self.llms.get('openai') or self.llms.get('gemini') or self.llms.get('groq')
        
        if not best_llm:
            session.final_answer = "🎯 Final Answer: All 7 agents have provided their perspectives across OpenAI, Gemini, and Groq models. Set API keys for AI-generated consensus."
            return
        
        # Summarize all agent responses
        agent_summary = "\n\n".join([f"{msg.agent}: {msg.message}" for msg in session.messages])
        
        consensus_prompt = f"""Based on the multi-provider AI discussion below from 7 specialized agents using GPT-5.4, Gemini Pro, and Llama 3.1, provide a final consensus answer to: "{session.question}"

Multi-Provider Agent Discussion:
{agent_summary}

Synthesize insights from all three AI providers (OpenAI, Google, Groq) and provide a balanced final answer:"""

        try:
            response = await best_llm.ainvoke(consensus_prompt)
            model_info = "GPT-5.4" if 'openai' in self.llms else "Gemini Pro" if 'gemini' in self.llms else "Llama 3.1"
            session.final_answer = f"🎯 Multi-Provider Consensus ({model_info}): {response.content}"
        except Exception as e:
            session.final_answer = f"🎯 Multi-Provider Consensus: Error generating consensus - {str(e)}"

    def get_agent_list(self) -> List[Dict[str, str]]:
        """Get list of all agents"""
        return [
            {
                "key": key,
                "name": agent["name"],
                "role": agent["role"],
                "emoji": agent["emoji"]
            }
            for key, agent in self.agents.items()
        ]


# Global instance
llm_council_chat = LLMCouncilChat()