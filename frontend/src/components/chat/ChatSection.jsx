import { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import SuggestedQuestions from './SuggestedQuestions';
import TypingIndicator from './TypingIndicator';
import { sendMessage } from '../../services/api';

const WELCOME_MSG = {
  role: 'assistant',
  content: "👋 **Welcome to FinanceHub AI!**\n\nI'm your friendly guide to the Indian stock market. I can help you understand:\n\n- **Stocks & Markets** — BSE, NSE, Sensex, Nifty\n- **Mutual Funds & SIP** — Types, NAV, compounding\n- **IPO, Bonds, Taxation** — And much more!\n\nAsk me anything, or try one of the suggested questions below. No question is too basic — I'm here to help beginners! 🚀",
  sources: [],
  timestamp: new Date().toISOString(),
};

export default function ChatSection({ pendingQuestion, onQuestionHandled }) {
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const processedRef = useRef('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle pending question from topic explorer
  useEffect(() => {
    if (pendingQuestion && pendingQuestion !== processedRef.current) {
      processedRef.current = pendingQuestion;
      handleSend(pendingQuestion);
      if (onQuestionHandled) onQuestionHandled();
    }
  }, [pendingQuestion]);

  const handleSend = async (text) => {
    const msg = text || input.trim();
    if (!msg || isLoading) return;

    const userMsg = {
      role: 'user',
      content: msg,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = [...messages, userMsg]
        .filter(m => m.role !== 'system')
        .slice(-6)
        .map(m => ({ role: m.role, content: m.content }));

      const data = await sendMessage(msg, history);

      const botMsg = {
        role: 'assistant',
        content: data.answer,
        sources: data.sources || [],
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        role: 'assistant',
        content: err.response?.status === 500
          ? "Sorry, I encountered a server error. Please make sure the backend is running (`uvicorn app.main:app --reload` in the backend directory)."
          : err.code === 'ERR_NETWORK'
          ? "I can't reach the backend server. Please make sure it's running on http://localhost:8000."
          : "Sorry, something went wrong. Please try again.",
        sources: [],
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="chat" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold dark:text-white text-text-dark mb-4">
            Ask <span className="text-gradient-green">FinanceHub AI</span>
          </h2>
          <p className="dark:text-text-muted text-text-dark-muted text-lg flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-green" /> Powered by Gemini AI & RAG Technology
          </p>
        </div>

        {/* Chat container */}
        <div className="rounded-2xl dark:glass-card-dark glass-card-light overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-3 border-b dark:border-border-dark border-border-light">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-green to-accent-green-dark flex items-center justify-center">
              <Bot className="w-4 h-4 text-navy" />
            </div>
            <div>
              <p className="font-medium text-sm dark:text-white text-text-dark">FinanceHub AI</p>
              <p className="text-xs text-accent-green flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" /> Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          {messages.length <= 1 && (
            <div className="px-5 pb-2">
              <SuggestedQuestions onQuestionClick={(q) => handleSend(q)} />
            </div>
          )}

          {/* Input */}
          <div className="px-4 pb-4">
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={() => handleSend()}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
