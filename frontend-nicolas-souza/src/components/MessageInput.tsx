"use client";

import { useState } from 'react';
import { useConversationStore } from '@/store/conversationStore';
import { Send } from 'lucide-react';

export function MessageInput() {
  const [text, setText] = useState('');
  const { selectedConversationId, fetchMessages } = useConversationStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!text.trim() || !selectedConversationId) return;

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/conversations/${selectedConversationId}/message-register`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, from: 'human' }),
      });

      if (!response.ok) throw new Error('Falha ao enviar a mensagem.');

      setText('');
      fetchMessages(selectedConversationId);

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-background-secondary">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={selectedConversationId ? "Digite sua mensagem..." : "Selecione uma conversa para responder"}
          disabled={!selectedConversationId}
          className="flex-grow bg-background-primary text-text-base px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!selectedConversationId || !text.trim()}
          className="bg-accent hover:bg-accent-hover text-white p-2 rounded-lg disabled:bg-gray-500 disabled:opacity-50 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
}