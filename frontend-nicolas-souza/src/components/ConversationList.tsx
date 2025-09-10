"use client";

import { useEffect, useState } from "react";
import { ConversationCard } from "./ConversationCard";
import type { Conversation } from "@/types";

export function ConversationList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/conversation';
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Falha ao buscar os dados da API.');
        }

        const data: Conversation[] = await response.json();
        setConversations(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []);

  if (isLoading) {
    return <div className="p-4 text-center text-text-muted">Carregando conversas...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-400">Erro: {error}</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-text-accent">Conversations</h1>
        {/* Header com os botões de filtro (estático por enquanto) */}
        <div className="flex space-x-2 mt-4 text-sm">
          <button className="bg-accent/20 text-accent font-semibold px-3 py-1 rounded-md">Unresolved</button>
          <button className="text-text-muted hover:bg-accent/10 px-3 py-1 rounded-md">Unread</button>
          <button className="text-text-muted hover:bg-accent/10 px-3 py-1 rounded-md">All</button>
        </div>
      </div>

      {/* A lista de conversas agora tem um padding diferente */}
      <div className="overflow-y-auto px-2 space-y-2">
        {isLoading && <p className="text-center text-text-muted p-4">Carregando...</p>}
        {error && <p className="text-center text-red-400 p-4">Erro: {error}</p>}
        {conversations.map((convo) => (
          <ConversationCard key={convo.id} conversation={convo} />
        ))}
      </div>
    </div>
  );
}