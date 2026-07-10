import { User, Bot, FileText } from 'lucide-react';

function renderMarkdown(text) {
  if (!text) return '';

  let html = text
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded text-xs dark:bg-white/10 bg-black/10 font-mono">$1</code>');

  // Process lines for lists and paragraphs
  const lines = html.split('\n');
  let result = [];
  let inList = false;
  let listType = null;

  for (const line of lines) {
    const trimmed = line.trim();

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      if (!inList || listType !== 'ol') {
        if (inList) result.push(listType === 'ol' ? '</ol>' : '</ul>');
        result.push('<ol class="list-decimal list-inside space-y-1 my-2 ml-2">');
        inList = true;
        listType = 'ol';
      }
      result.push(`<li class="text-sm leading-relaxed">${trimmed.replace(/^\d+\.\s/, '')}</li>`);
    }
    // Bullet list
    else if (/^[-*•]\s/.test(trimmed)) {
      if (!inList || listType !== 'ul') {
        if (inList) result.push(listType === 'ol' ? '</ol>' : '</ul>');
        result.push('<ul class="list-disc list-inside space-y-1 my-2 ml-2">');
        inList = true;
        listType = 'ul';
      }
      result.push(`<li class="text-sm leading-relaxed">${trimmed.replace(/^[-*•]\s/, '')}</li>`);
    }
    // Heading
    else if (/^###?\s/.test(trimmed)) {
      if (inList) { result.push(listType === 'ol' ? '</ol>' : '</ul>'); inList = false; }
      const text = trimmed.replace(/^###?\s/, '');
      result.push(`<p class="font-semibold mt-3 mb-1">${text}</p>`);
    }
    // Empty line
    else if (trimmed === '') {
      if (inList) { result.push(listType === 'ol' ? '</ol>' : '</ul>'); inList = false; }
      result.push('<br/>');
    }
    // Regular text
    else {
      if (inList) { result.push(listType === 'ol' ? '</ol>' : '</ul>'); inList = false; }
      result.push(`<p class="text-sm leading-relaxed my-1">${trimmed}</p>`);
    }
  }
  if (inList) result.push(listType === 'ol' ? '</ol>' : '</ul>');

  return result.join('');
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const time = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={`flex items-start gap-2.5 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        isUser
          ? 'bg-gradient-to-br from-accent-blue to-blue-600'
          : 'bg-gradient-to-br from-accent-green to-accent-green-dark'
      }`}>
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-navy" />}
      </div>

      {/* Content */}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-user-bubble text-white rounded-br-sm'
            : 'dark:bg-bot-bubble-dark bg-bot-bubble-light dark:text-text-primary text-text-dark rounded-bl-sm border dark:border-border-dark border-border-light'
        }`}>
          {isUser ? (
            <p className="text-sm leading-relaxed">{message.content}</p>
          ) : (
            <div
              className="prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
            />
          )}
        </div>

        {/* Sources */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1.5 px-1">
            {message.sources.map(s => (
              <span key={s} className="inline-flex items-center gap-1 text-xs dark:text-text-muted text-text-dark-muted dark:bg-surface-dark bg-white/60 px-2 py-0.5 rounded-full">
                <FileText className="w-2.5 h-2.5" /> {s.replace('.txt', '')}
              </span>
            ))}
          </div>
        )}

        {/* Timestamp */}
        {time && (
          <span className={`text-xs dark:text-text-muted/60 text-text-dark-muted/60 mt-1 block ${isUser ? 'text-right' : 'text-left'} px-1`}>
            {time}
          </span>
        )}
      </div>
    </div>
  );
}
