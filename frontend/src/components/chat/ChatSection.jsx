import { useState, useRef, useEffect } from 'react';
import { Bot, ChevronRight } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { sendMessage } from '../../services/api';


const QUICK_TOPICS = [
  { label: 'What is SIP?', q: 'What is SIP and how does it work?' },
  { label: 'Stock Market Basics', q: 'What is the stock market and how does it work in India?' },
  { label: 'Mutual Funds 101', q: 'What are mutual funds and how do they work?' },
  { label: 'Opening a Demat', q: 'What is a Demat account and how do I open one?' },
  { label: 'IPO Guide', q: 'What is an IPO and how do I apply for one in India?' },
  { label: 'Nifty 50 Explained', q: 'What is Nifty 50 and why is it important?' },
  { label: 'PPF & Bonds', q: 'What is PPF and how do government bonds work in India?' },
  { label: 'Tax on Stocks', q: 'How are stocks and mutual funds taxed in India? Explain STCG and LTCG.' },
];

const WELCOME_MSG = {
  role: 'assistant',
  content: "Welcome to **FinanceHub**! \n\nGot questions about the Indian stock market? I can help with topics like SIP, mutual funds, IPOs, taxation, and more.\n\nPick something below or type your own question.",
  sources: [],
  timestamp: new Date().toISOString(),
};

export default function ChatSection({ pendingQuestion, onQuestionHandled }) {
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const processedRef = useRef('');

  const scrollToBottom = () => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };
  useEffect(() => { scrollToBottom(); }, [messages, isLoading]);

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

    const userMsg = { role: 'user', content: msg, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = [...messages, userMsg]
        .filter(m => m.role !== 'system')
        .slice(-6)
        .map(m => ({ role: m.role, content: m.content }));

      const data = await sendMessage(msg, history);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.answer,
        sources: data.sources || [],
        timestamp: new Date().toISOString(),
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: err.code === 'ERR_NETWORK'
          ? "Can't reach the server. Make sure the backend is running on http://localhost:8000."
          : "Something went wrong. Please try again.",
        sources: [],
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const showTopics = messages.length <= 1 && !isLoading;

  return (
    <section id="chat" className="py-8 px-4 min-h-[60vh]">
      <div className="max-w-3xl mx-auto">
        {/* Chat container */}
        <div className="rounded-2xl dark:bg-dark-surface/60 bg-light-surface border dark:border-border-dark border-border-light overflow-hidden backdrop-blur-sm shadow-xl dark:shadow-[0_0_60px_rgba(0,0,0,0.3)] shadow-[0_4px_40px_rgba(0,0,0,0.06)]">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3 border-b dark:border-border-dark border-border-light">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mint to-mint-dim flex items-center justify-center">
              <Bot className="w-4 h-4 text-dark-base" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm dark:text-text-white text-text-dark">FinanceHub</p>
              <p className="text-[10px] dark:text-mint text-mint-dim flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" /> Online
              </p>
            </div>
            <div className="flex items-center gap-1 text-[10px] dark:text-text-dim text-text-dark-dim">
              Instant answers
            </div>
          </div>

          {/* Messages */}
          <div ref={chatContainerRef} className="h-[480px] overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}

            {/* Quick topics — shown only at start */}
            {showTopics && (
              <div className="pt-2 animate-fade-in">
                <p className="text-xs dark:text-text-dim text-text-dark-dim mb-3 px-1">Popular topics:</p>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_TOPICS.map(t => (
                    <button
                      key={t.label}
                      onClick={() => handleSend(t.q)}
                      className="group flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm dark:bg-dark-card bg-light-input border dark:border-border-dark border-border-light dark:text-text-white text-text-dark hover:dark:border-mint/30 hover:border-mint/40 hover:dark:bg-dark-card-hover transition-all duration-200 cursor-pointer"
                    >
                      <span className="text-xs">{t.label}</span>
                      <ChevronRight className="w-3 h-3 dark:text-text-dim text-text-dark-dim group-hover:text-mint group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 pb-4 pt-2">
            <ChatInput value={input} onChange={setInput} onSend={() => handleSend()} disabled={isLoading} />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[10px] dark:text-text-dim/40 text-text-dark-dim/40 mt-4">
          For educational purposes only — not a substitute for professional financial advice.
        </p>
      </div>
    </section>
  );
}
