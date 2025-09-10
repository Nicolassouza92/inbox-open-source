"use client";

import { MessageSquare } from "lucide-react";
import type { Conversation } from "@/types";
import { useConversationStore } from "@/store/conversationStore";

interface ConversationCardProps {
  conversation: Conversation;
}

export function ConversationCard({ conversation }: ConversationCardProps) {
  const { selectedConversationId, setSelectedConversationId } = useConversationStore();
  const isSelected = selectedConversationId === conversation.id;

  // Função para formatar o tempo de forma relativa (ex: "2 hours ago")
  // Esta é uma simplificação, bibliotecas como 'date-fns' fazem isso melhor
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    const diffMinutes = Math.round(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <button
      onClick={() => setSelectedConversationId(conversation.id)}
      // Novas classes para o estilo "quadrado" e com mais informações
      className={`w-full text-left p-3 rounded-xl transition-colors flex flex-col space-y-2
        ${isSelected ? 'bg-accent/20 border-accent' : 'bg-background-primary hover:bg-accent/10 border-transparent'} border-2`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MessageSquare className="text-text-muted" size={18} />
          <p className="font-bold text-text-accent truncate">
            {conversation.aiUserIdentifier || conversation.title || `Visitor #${conversation.id.slice(-4)}`}
          </p>
        </div>
        {conversation.unreadMessagesCount && conversation.unreadMessagesCount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {conversation.unreadMessagesCount}
          </span>
        )}
      </div>
      <p className="text-sm text-text-muted line-clamp-2">
        {/* Placeholder para a última mensagem, que não temos na API de lista */}
        Clique para ver as mensagens...
      </p>
      <div className="flex justify-between items-center text-xs text-text-muted mt-2">
        <span>⚡ Jorginho</span> {/* Exemplo de agente */}
        <span>{formatRelativeTime(conversation.updatedAt)}</span>
      </div>
    </button>
  );
}