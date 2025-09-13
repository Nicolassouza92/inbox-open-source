"use client";

import { useRef, useEffect, useState } from "react";
import { useConversationStore } from "@/store/conversationStore";
import { MessageInput } from "./MessageInput";
import { MessageBubble } from "./MessageBubble";
import { ConversationIdCard } from "./ConversationIdCard";
import { ArrowLeftRight, PanelLeft } from "lucide-react";

interface MessageViewProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (
    isOpen: boolean | ((prevState: boolean) => boolean)
  ) => void;
}

export function MessageView({
  isSidebarOpen,
  setIsSidebarOpen,
}: MessageViewProps) {
  const { selectedConversation, messages, isLoading, error } =
    useConversationStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [alignment, setAlignment] = useState<"left-right" | "right-left">(
    "left-right"
  );

  const toggleAlignment = () => {
    setAlignment((current) =>
      current === "left-right" ? "right-left" : "left-right"
    );
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 350);
    return () => clearTimeout(timer);
  }, [isSidebarOpen]);

  if (!selectedConversation) {
    return (
      <div className="flex h-full items-center justify-center text-text-muted bg-background-content">
        <p>Selecione uma conversa para ver as mensagens</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-text-muted bg-background-content">
        <p>Carregando mensagens...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-red-400 bg-background-content">
        <p>Erro: {error}</p>
      </div>
    );
  }

  const conversationTitle =
    selectedConversation.aiUserIdentifier ||
    selectedConversation.title ||
    "Conversa";

  return (
    <div className="h-full flex flex-col bg-background-content">
      <div className="p-2 md:p-4 flex-shrink-0 border-b border-border flex items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            title="Alternar menu"
            className="p-2 rounded-lg border border-border text-text-muted hover:bg-white hover:border-accent hover:text-accent transition-all"
          >
            <PanelLeft size={18} />
          </button>
        </div>

        <div
          className={`flex items-center gap-2 flex-1 min-w-0 ${
            isSidebarOpen ? "hidden md:flex" : "flex"
          }`}
        >
          <button
            onClick={toggleAlignment}
            title="Inverter alinhamento"
            className="p-2 rounded-lg border border-border text-text-muted hover:bg-white hover:border-accent hover:text-accent transition-all"
          >
            <ArrowLeftRight size={14} />
          </button>
          <h2 className="text-sm md:text-base font-semibold text-text-accent truncate">
            {conversationTitle}
          </h2>
        </div>

        <div
          className={`flex items-center flex-shrink-0 ${
            isSidebarOpen ? "hidden md:flex" : "flex"
          }`}
        >
          {selectedConversation && (
            <ConversationIdCard conversationId={selectedConversation.id} />
          )}
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-2 md:py-4 md:px-4">
        <div className="max-w-4xl w-full mx-auto">
          <div className="space-y-4 flex flex-col">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                alignment={alignment}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 p-2 md:p-4">
        <MessageInput />
      </div>
    </div>
  );
}
