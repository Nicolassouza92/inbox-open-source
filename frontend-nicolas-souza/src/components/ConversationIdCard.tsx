"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface ConversationIdCardProps {
  conversationId: string;
}

export function ConversationIdCard({
  conversationId,
}: ConversationIdCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (isCopied) return;
    try {
      await navigator.clipboard.writeText(conversationId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar o ID:", err);
    }
  };

  const truncatedId = (
    <>
      <span className="hidden md:inline">{`${conversationId.slice(
        0,
        6
      )}...${conversationId.slice(-6)}`}</span>
      <span className="md:hidden">{`${conversationId.slice(0, 4)}...`}</span>
    </>
  );

  return (
    <button
      onClick={handleCopy}
      className="flex items-center space-x-2 px-2 md:px-3 py-1.5 bg-background-secondary border border-border rounded-lg text-xs text-text-muted hover:bg-white hover:border-accent transition-all duration-200 group"
      title="Copiar ID da conversa"
    >
      <span className="font-mono">{isCopied ? "Copiado!" : truncatedId}</span>
      {isCopied ? (
        <Check className="text-green-500" size={14} />
      ) : (
        <Copy size={14} className="group-hover:text-accent" />
      )}
    </button>
  );
}
