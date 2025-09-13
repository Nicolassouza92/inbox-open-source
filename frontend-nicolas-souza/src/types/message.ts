export interface Message {
  id: string;
  text: string;
  from: "human" | "agent";
  conversationId: string;
  createdAt: string;
  html: string | null;
}