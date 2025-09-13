export interface Assignee {
  id?: string;
  email?: string;
}

export interface Conversation {
  id: string;
  title: string | null;
  assignees: Assignee[]; 
  isAiEnabled: boolean;
  channel: string;
  status: "RESOLVED" | "UNRESOLVED" | "HUMAN_REQUESTED";
  metadata: Record<string, unknown> | null; 
  channelExternalId: string | null;
  channelCredentialsId: string | null;
  organizationId: string | null;
  mailInboxId: string | null;
  priority: "LOW" | "MEDIUM" | "HIGH";
  formId: string | null;
  agentId: string | null;
  userId: string | null;
  visitorId: string | null;
  frustration: number;
  createdAt: string;
  updatedAt: string;
  participantsContacts?: { firstName: string }[];
  aiUserIdentifier: string | null;
  unreadMessagesCount?: number;
}