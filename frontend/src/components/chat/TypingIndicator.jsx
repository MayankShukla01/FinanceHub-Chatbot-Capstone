import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-green to-accent-green-dark flex items-center justify-center shrink-0">
        <Bot className="w-4 h-4 text-navy" />
      </div>
      <div className="dark:bg-bot-bubble-dark bg-bot-bubble-light rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-accent-green animate-bounce-dot" />
        <span className="w-2 h-2 rounded-full bg-accent-green animate-bounce-dot" style={{ animationDelay: '0.2s' }} />
        <span className="w-2 h-2 rounded-full bg-accent-green animate-bounce-dot" style={{ animationDelay: '0.4s' }} />
        <span className="dark:text-text-muted text-text-dark-muted text-xs ml-2">FinanceHub AI is thinking...</span>
      </div>
    </div>
  );
}
