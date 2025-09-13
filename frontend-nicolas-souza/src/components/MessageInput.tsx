"use client";

import { useState, useRef } from "react";
import { useConversationStore } from "@/store/conversationStore";
import { Send, Paperclip } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import type { Message } from "@/types/message";

export function MessageInput() {
  const [text, setText] = useState("");
  const { selectedConversationId, addMessage } = useConversationStore();
  const [isSending, setIsSending] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async () => {
    if (!text.trim() || !selectedConversationId || isSending) return;

    setIsSending(true);
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/conversations/${selectedConversationId}/message-register`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, from: "agent" }),
      });

      if (!response.ok) throw new Error("Falha ao enviar a mensagem.");

      const responseData = await response.json();
      const newMessage: Message = responseData.message;

      addMessage(newMessage);
      setText("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await sendMessage();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Arquivo selecionado:", file.name);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl w-full mx-auto flex items-center p-2 rounded-xl shadow-md border border-border bg-background-primary"
    >
      <button
        type="button"
        title="Anexar arquivo"
        onClick={handleAttachmentClick}
        className="p-2 text-text-muted hover:text-accent transition-colors self-end mb-0.5"
      >
        <Paperclip size={20} />
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <TextareaAutosize
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          selectedConversationId
            ? "Digite sua mensagem..."
            : "Selecione uma conversa para responder"
        }
        disabled={!selectedConversationId || isSending}
        className="flex-grow bg-transparent text-text-base px-2 py-1.5 focus:outline-none disabled:opacity-50 resize-none w-full"
        maxRows={5}
      />

      <button
        type="submit"
        disabled={!selectedConversationId || !text.trim() || isSending}
        className="bg-accent hover:bg-accent-hover text-white p-2 rounded-lg disabled:bg-gray-500 disabled:opacity-50 transition-colors self-end"
      >
        <Send size={20} />
      </button>
    </form>
  );
}
