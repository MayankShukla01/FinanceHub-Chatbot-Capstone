import { Bot, User, FileText } from 'lucide-react';

function renderMarkdown(text) {
  if (!text) return '';
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');

  const lines = html.split('\n');
  let result = [];
  let inList = false;
  let listType = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^\d+\.\s/.test(trimmed)) {
      if (!inList || listType !== 'ol') { if (inList) result.push(listType === 'ol' ? '</ol>' : '</ul>'); result.push('<ol class="list-decimal list-inside space-y-1 my-2 ml-1">'); inList = true; listType = 'ol'; }
      result.push(`<li class="text-sm leading-relaxed">${trimmed.replace(/^\d+\.\s/, '')}</li>`);
    } else if (/^[-*•]\s/.test(trimmed)) {
      if (!inList || listType !== 'ul') { if (inList) result.push(listType === 'ol' ? '</ol>' : '</ul>'); result.push('<ul class="list-disc list-inside space-y-1 my-2 ml-1">'); inList = true; listType = 'ul'; }
      result.push(`<li class="text-sm leading-relaxed">${trimmed.replace(/^[-*•]\s/, '')}</li>`);
    } else if (/^###?\s/.test(trimmed)) {
      if (inList) { result.push(listType === 'ol' ? '</ol>' : '</ul>'); inList = false; }
      result.push(`<p class="font-semibold mt-3 mb-1 text-sm">${trimmed.replace(/^###?\s/, '')}</p>`);
    } else if (trimmed === '') {
      if (inList) { result.push(listType === 'ol' ? '</ol>' : '</ul>'); inList = false; }
    } else {
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
    <div className={`flex items-start gap-3 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
        isUser ? 'bg-gradient-to-br from-blue to-violet' : 'bg-gradient-to-br from-mint to-mint-dim'
      }`}>
        {isUser ? <User className="w-3.5 h-3.5 text-white" /> : <Bot className="w-3.5 h-3.5 text-dark-base" />}
      </div>

      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-r from-blue to-violet/90 text-white rounded-br-md'
            : 'dark:bg-dark-card dark:border-border-dark bg-light-card border-border-light border rounded-bl-md dark:text-text-white text-text-dark'
        }`}>
          {isUser ? (
            <p className="text-sm leading-relaxed">{message.content}</p>
          ) : (
            <div className="chat-markdown" dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }} />
          )}
        </div>

        {!isUser && message.sources?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1.5 px-1">
            {message.sources.map(s => (
              <span key={s} className="inline-flex items-center gap-1 text-[10px] dark:text-text-dim text-text-dark-dim dark:bg-dark-card bg-light-input px-2 py-0.5 rounded-full border dark:border-border-dark border-border-light">
                <FileText className="w-2.5 h-2.5" /> {s.replace('.txt', '')}
              </span>
            ))}
          </div>
        )}

        {time && (
          <span className={`text-[10px] dark:text-text-dim/50 text-text-dark-dim/50 mt-1 block px-1 ${isUser ? 'text-right' : ''}`}>
            {time}
          </span>
        )}
      </div>
    </div>
  );
}
