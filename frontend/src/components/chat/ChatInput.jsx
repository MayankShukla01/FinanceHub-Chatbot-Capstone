import { Send } from 'lucide-react';

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex items-end gap-2 p-3 dark:bg-navy-light/50 bg-white/50 rounded-xl border dark:border-border-dark border-border-light backdrop-blur-sm">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask me anything about finance..."
        rows={1}
        className="flex-1 bg-transparent resize-none dark:text-white text-text-dark dark:placeholder-text-muted placeholder-text-dark-muted outline-none text-sm py-1.5 max-h-24 scrollbar-none"
        style={{ minHeight: '28px' }}
        onInput={(e) => {
          e.target.style.height = '28px';
          e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px';
        }}
      />
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="p-2 rounded-lg bg-gradient-to-r from-accent-green to-accent-green-dark text-navy hover:shadow-lg hover:shadow-accent-green/25 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none cursor-pointer shrink-0"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}
