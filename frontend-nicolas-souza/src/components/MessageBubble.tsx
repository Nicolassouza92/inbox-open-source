import type { Message } from "@/types/message";

type Alignment = 'left-right' | 'all-left' | 'all-right';

interface MessageBubbleProps {
  message: Message;
  alignment: Alignment;
}

export function MessageBubble({ message, alignment }: MessageBubbleProps) {
  const isAgent = message.from === 'agent';

  let alignmentClass = '';
  if (alignment === 'all-left') {
    alignmentClass = 'self-start mr-auto';
  } else if (alignment === 'all-right') {
    alignmentClass = 'self-end ml-auto';
  } else {
    alignmentClass = isAgent ? 'self-end ml-auto' : 'self-start mr-auto';
  }

  const colorClass = isAgent ? 'bg-message-sent' : 'bg-message-received';
  
  return (
    <div 
      className={`p-3 rounded-lg max-w-lg flex flex-col ${alignmentClass} ${colorClass}`}
    >
      <p className="text-text-base">{message.text}</p>
      <div className="text-xs text-text-base/70 mt-1 text-right">
        {new Date(message.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}