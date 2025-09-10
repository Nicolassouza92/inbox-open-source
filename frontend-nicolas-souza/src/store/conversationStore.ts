import { create } from 'zustand';
import type { Message } from '@/types/message';

interface ConversationState {
  selectedConversationId: string | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  setSelectedConversationId: (id: string | null) => void;
  fetchMessages: (conversationId: string) => Promise<void>;
}

export const useConversationStore = create<ConversationState>((set) => ({
  selectedConversationId: null,
  messages: [],
  isLoading: false,
  error: null,

  setSelectedConversationId: (id) => {
    set({ selectedConversationId: id, messages: [], error: null });
    if (id) {
      useConversationStore.getState().fetchMessages(id);
    }
  },

  fetchMessages: async (conversationId) => {
    set({ isLoading: true, error: null });
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/conversation/${conversationId}/messages/50`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Falha ao buscar mensagens.');
      }
      const data = await response.json();
      set({ messages: (data.messages || []).reverse(), isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },
}));