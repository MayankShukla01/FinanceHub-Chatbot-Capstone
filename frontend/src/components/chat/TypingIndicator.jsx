import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-mint to-mint-dim flex items-center justify-center shrink-0">
        <Bot className="w-3.5 h-3.5 text-dark-base" />
      </div>
      <div className="dark:bg-dark-card bg-light-card rounded-2xl rounded-bl-md border dark:border-border-dark border-border-light px-4 py-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-mint animate-bounce-dot" />
        <span className="w-1.5 h-1.5 rounded-full bg-mint animate-bounce-dot" style={{ animationDelay: '0.2s' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-mint animate-bounce-dot" style={{ animationDelay: '0.4s' }} />
        <span className="dark:text-text-dim text-text-dark-dim text-xs ml-2">Thinking...</span>
      </div>
    </div>
  );
}
