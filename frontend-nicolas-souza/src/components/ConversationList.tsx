"use client";

import { useEffect, useState, useMemo } from "react";
import { ConversationCard } from "./ConversationCard";
import type { Conversation } from "@/types";
import { useConversationStore } from "@/store/conversationStore";

type FilterType =
  | "Unresolved"
  | "Unread"
  | "All"
  | "Human Requested"
  | "Resolved";

const filters: FilterType[] = [
  "Unresolved",
  "Unread",
  "All",
  "Human Requested",
  "Resolved",
];

export function ConversationList() {
  const { conversations, setConversations } = useConversationStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("Unresolved");

  useEffect(() => {
    const fetchConversations = async () => {
      if (conversations.length > 0) {
        setIsLoading(false);
        return;
      }
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/conversation";
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Falha ao buscar os dados da API.");
        const data: Conversation[] = await response.json();
        setConversations(data); // 2. Salva as conversas no estado global
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [conversations.length, setConversations]);

  const filteredConversations = useMemo(() => {
    const sortByRecentActivity = (a: Conversation, b: Conversation) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();

    if (activeFilter === "Unresolved") {
      const unresolved = conversations.filter((c) => c.status === "UNRESOLVED");
      return unresolved.sort(sortByRecentActivity);
    }

    if (activeFilter === "Unread") {
      const unread = conversations.filter(
        (c) => c.unreadMessagesCount && c.unreadMessagesCount > 0
      );
      return unread.sort(sortByRecentActivity);
    }

    if (activeFilter === "Human Requested") {
      const requested = conversations.filter(
        (c) => c.status === "HUMAN_REQUESTED"
      );
      return requested.sort(sortByRecentActivity);
    }

    if (activeFilter === "Resolved") {
      const resolved = conversations.filter((c) => c.status === "RESOLVED");
      return resolved.sort(sortByRecentActivity);
    }

    return [...conversations].sort(sortByRecentActivity);
  }, [conversations, activeFilter]);

  if (isLoading) {
    return (
      <div className="p-4 text-center text-text-muted">
        Carregando conversas...
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-400">Erro: {error}</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-text-accent mb-4 text-center">
          Conversations
        </h1>

        <div className="flex flex-wrap justify-center gap-2 text-sm">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  text-center px-3 py-2 rounded-lg border transition-all duration-200 font-semibold
                  ${
                    isActive
                      ? "bg-background-secondary border-accent shadow-lg text-accent"
                      : "bg-transparent border-transparent text-text-muted hover:bg-background-secondary hover:text-accent"
                  }
                `}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-y-auto px-2 space-y-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        {filteredConversations.map((convo) => (
          <ConversationCard key={convo.id} conversation={convo} />
        ))}
      </div>
    </div>
  );
}
