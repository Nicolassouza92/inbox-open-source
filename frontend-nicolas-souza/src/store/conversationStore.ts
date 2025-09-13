import { create } from 'zustand';
import type { Message } from '@/types/message';
import type { Conversation } from '@/types';

interface ConversationState {
  conversations: Conversation[];
  selectedConversationId: string | null;
  selectedConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  setConversations: (conversations: Conversation[]) => void;
  setSelectedConversationId: (id: string | null) => void;
  addMessage: (message: Message) => void;
  fetchMessages: (conversationId: string) => Promise<void>;
}

export const useConversationStore = create<ConversationState>((set, get) => ({
  conversations: [],
  selectedConversationId: null,
  selectedConversation: null,
  messages: [],
  isLoading: false,
  error: null,

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),

  setConversations: (conversations) => set({ conversations }),

  setSelectedConversationId: (id) => {
    const { conversations } = get();
    const selected = conversations.find(c => c.id === id) || null;
    
    set({ 
      selectedConversationId: id, 
      selectedConversation: selected,
      messages: [], 
      error: null 
    });

    if (id) {
      get().fetchMessages(id);
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