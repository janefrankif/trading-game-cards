'use client';

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Loader2, 
  ShieldCheck, 
  Bot, 
  User, 
  HelpCircle,
  Code2
} from 'lucide-react';
import { CardItem } from '@/lib/marketplace-data';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCard?: CardItem | null;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export function AiConsultantModal({
  isOpen,
  onClose,
  activeCard,
}: AiConsultantModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: "Hello! I'm your TCG Marketplace Strategic Consultant. I can advise you on platform architecture, Stripe Connect escrow state machines, PSA/BGS/CGC cert verification APIs, US sales tax/1099-K compliance, and programmatic SEO indexing strategies. What would you like guidance on?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    'How do I implement escrow with Stripe Connect?',
    'What is the best Schema.org code for PSA slabs?',
    'How to prevent empty-box & chargeback fraud?',
    'Why use Headless Next.js instead of Shopify?',
  ];

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', text: textToSend }];
    setMessages(newMessages);
    if (!messageText) setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/card-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          contextCard: activeCard || null,
          topic: 'US Trading Card Marketplace Architecture & Escrow',
        }),
      });

      const data = await response.json();
      if (data.answer) {
        setMessages([...newMessages, { role: 'assistant', text: data.answer }]);
      } else {
        setMessages([
          ...newMessages,
          { role: 'assistant', text: 'Sorry, I encountered an issue retrieving the analysis. Please try again.' },
        ]);
      }
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: 'assistant', text: 'Error connecting to the consultant service. Please check your network and try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="ai-consultant-modal"
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl h-[620px] shadow-2xl text-slate-100 flex flex-col overflow-hidden relative"
      >
        {/* Header */}
        <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">TCG Marketplace Strategy Advisor</h3>
              <p className="text-[11px] text-slate-400">Expert guidance on tech stack, escrow, fees & SEO</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-slate-950/40 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
          <span className="text-slate-500 text-[10px] uppercase font-bold shrink-0 ml-1">Quick Prompts:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white whitespace-nowrap transition-colors border border-slate-700/60"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Message History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0 text-indigo-300">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white font-medium rounded-br-none'
                    : 'bg-slate-800/80 text-slate-200 border border-slate-700/60 rounded-bl-none prose-invert'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-slate-300">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-slate-400 text-xs">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/30 flex items-center justify-center text-indigo-300">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <span>Consultant analyzing marketplace protocols...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about escrow, SEO schema, shipping insurance, or tech stack..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
          <button
            id="send-ai-consultant-msg"
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
