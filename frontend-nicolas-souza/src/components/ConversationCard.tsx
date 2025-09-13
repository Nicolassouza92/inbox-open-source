"use client";

import { MessageSquare } from "lucide-react";
import type { Conversation } from "@/types";
import { useConversationStore } from "@/store/conversationStore";

interface ConversationCardProps {
  conversation: Conversation;
}

export function ConversationCard({ conversation }: ConversationCardProps) {
  const { selectedConversationId, setSelectedConversationId } =
    useConversationStore();
  const isSelected = selectedConversationId === conversation.id;

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    const diffMinutes = Math.round(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const getAssigneeName = () => {
    if (conversation.agentId) {
      return `Agente #${conversation.agentId.slice(0, 6)}`;
    }
    return "Não atribuído";
  };

  return (
    <button
      onClick={() => setSelectedConversationId(conversation.id)}
      className={`w-full text-left p-3 rounded-xl flex flex-col transition-all duration-200 ease-in-out border shadow-md
        ${
          isSelected
            ? "bg-white border-accent shadow-lg"
            : "bg-gradient-card border-border hover:border-accent hover:shadow-lg hover:-translate-y-1"
        }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <MessageSquare className="text-text-muted" size={16} />
          <p className="font-bold text-sm text-text-accent truncate">
            {conversation.aiUserIdentifier ||
              conversation.title ||
              `Visitor #${conversation.id.slice(-4)}`}
          </p>
        </div>
        {conversation.unreadMessagesCount &&
          conversation.unreadMessagesCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {conversation.unreadMessagesCount}
            </span>
          )}
      </div>
      <p className="text-xs text-text-muted line-clamp-2 tracking-wide">
        Clique para ver as mensagens...
      </p>
      <div className="flex justify-between items-center text-xs text-text-muted mt-1">
        <span>⚡ {getAssigneeName()}</span>
        <span>{formatRelativeTime(conversation.updatedAt)}</span>
      </div>
    </button>
  );
}
