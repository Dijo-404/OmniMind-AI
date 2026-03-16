'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Sparkles, Paperclip, MoreHorizontal, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function MultiAgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your Multi-Agent Strategic Intelligence. How can I assist you with your project planning today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I've analyzed your request regarding "${userMessage.content}". Our strategic agents are currently synthesizing a comprehensive response based on your current project parameters. What specific details would you like to explore first?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full transition-colors duration-200 bg-[var(--bg-main)]">
      {/* Chat Header */}
      <div className="px-8 py-4 border-b border-[var(--border-primary)] flex items-center justify-between bg-[var(--bg-sidebar)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
            <MessageSquare className="text-white w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">Chat Support</h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] text-[var(--text-secondary)]">Active</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <Paperclip size={18} />
          </button>
          <button className="p-1.5 border border-[var(--border-primary)] rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] transition-all">
            History
          </button>
        </div>
      </div>

      {/* Messages Viewport */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-8 py-8 space-y-6 scrollbar-hide"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                msg.role === 'assistant' ? 'bg-[var(--bg-sidebar)] text-blue-600 border-[var(--border-primary)]' : 'bg-blue-600 text-white border-blue-700'
              }`}>
                {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`max-w-[80%] space-y-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'assistant' 
                    ? 'bg-[var(--glass-bg)] text-[var(--text-primary)] rounded-tl-none border border-[var(--border-primary)] shadow-sm' 
                    : 'bg-blue-600 text-white rounded-tr-none shadow-md'
                }`}>
                  {msg.content}
                </div>
                <p className="text-[10px] text-[var(--text-secondary)] px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--bg-sidebar)] flex items-center justify-center shrink-0 border border-[var(--border-primary)]">
                <Bot size={16} className="text-blue-600" />
              </div>
              <div className="flex items-center gap-1 p-3 bg-[var(--glass-bg)] rounded-2xl rounded-tl-none border border-[var(--border-primary)]">
                <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-6 border-t border-[var(--border-primary)] bg-[var(--bg-sidebar)]">
        <div className="relative max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="w-full bg-[var(--bg-main)] border border-[var(--border-primary)] rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-[var(--text-secondary)]"
            style={{ color: 'var(--text-primary)' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 bottom-2 px-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-center mt-3 text-[10px] text-[var(--text-secondary)]">
          Responses are generated based on available project data.
        </p>
      </div>
    </div>
  );
}
