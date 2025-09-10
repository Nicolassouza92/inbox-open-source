"use client";

import { useConversationStore } from "@/store/conversationStore";
import { MessageInput } from "./MessageInput";
import { MessageBubble } from "./MessageBubble";

type Alignment = 'left-right' | 'all-left' | 'all-right';

interface MessageViewProps {
  alignment?: Alignment; // A prop é opcional, com 'left-right' como padrão
}

export function MessageView({ alignment = 'left-right' }: MessageViewProps) {
  const { selectedConversationId, messages, isLoading, error } = useConversationStore();

  if (!selectedConversationId) {
    return (
      <div className="flex h-full items-center justify-center text-text-muted">
        <p>Selecione uma conversa para ver as mensagens</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-text-muted">
        <p>Carregando mensagens...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-red-400">
        <p>Erro: {error}</p>
      </div>
    );
  }

  return (
    // <-- INÍCIO DA CORREÇÃO DO LAYOUT
    // 1. Container principal que define a coluna e ocupa toda a altura
    <div className="h-full flex flex-col">

      {/* 2. Cabeçalho com altura própria */}
      <div className="p-4 flex-shrink-0">
        <h2 className="text-xl font-bold border-b border-border pb-2 text-text-accent">
          Mensagens
        </h2>
      </div>

      {/* 3. Área de conteúdo que cresce e tem scroll */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4 flex flex-col">
          {messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              alignment={alignment}
            />
          ))}
        </div>
      </div>

      {/* 4. Rodapé com o input, com altura própria */}
      <div className="flex-shrink-0">
        <MessageInput />
      </div>

    </div>
    // <-- FIM DA CORREÇÃO DO LAYOUT
  );
}