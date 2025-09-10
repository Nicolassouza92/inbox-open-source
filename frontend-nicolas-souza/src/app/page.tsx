"use client";

import { useState } from "react";
import { ConversationList } from "@/components/ConversationList";
import { MessageView } from "@/components/MessageView";
import { PanelLeft } from "lucide-react"; // Ícone de menu

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background-primary text-text-base relative overflow-hidden">

      <aside 
        className={`absolute top-0 left-0 h-full z-20 w-80 bg-background-secondary border-r border-border transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
        }
      >
        <ConversationList />
      </aside>

      {/* Conteúdo Principal (antiga coluna do centro) */}
      {/* A margem à esquerda se ajusta quando a sidebar abre/fecha */}
      <main 
        className={`flex-grow transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'ml-80' : 'ml-0'}`
        }
      >
        {/* Botão para abrir a sidebar */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="absolute top-4 left-4 z-30 text-text-muted hover:text-text-accent"
          title={isSidebarOpen ? "Fechar painel" : "Abrir painel"}
        >
          <PanelLeft size={24} />
        </button>

        <MessageView alignment="left-right" />
      </main>

    </div>
  );
}