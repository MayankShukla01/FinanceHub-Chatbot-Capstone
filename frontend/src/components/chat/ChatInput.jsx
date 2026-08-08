import { Send } from 'lucide-react';

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend(); }
  };

  return (
    <div className="flex items-end gap-2 p-2.5 rounded-xl dark:bg-dark-input bg-light-input border dark:border-border-dark border-border-light transition-all duration-300 focus-within:dark:border-mint/30 focus-within:border-mint/40 focus-within:dark:shadow-[0_0_20px_rgba(0,232,184,0.06)] focus-within:shadow-[0_0_20px_rgba(0,232,184,0.08)]">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask me anything about finance..."
        rows={1}
        className="flex-1 bg-transparent resize-none dark:text-text-white text-text-dark placeholder:dark:text-text-dim/40 placeholder:text-text-dark-dim/50 outline-none text-sm py-1 px-1 max-h-24"
        style={{ minHeight: '24px' }}
        onInput={(e) => {
          e.target.style.height = '24px';
          e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px';
        }}
      />
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="w-8 h-8 rounded-lg bg-gradient-to-r from-mint to-mint-dim text-dark-base flex items-center justify-center hover:shadow-[0_0_16px_rgba(0,232,184,0.25)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0"
      >
        <Send className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
