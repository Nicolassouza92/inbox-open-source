"use client";

import { useState } from "react";
import { ConversationList } from "@/components/ConversationList";
import { MessageView } from "@/components/MessageView";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background-primary text-text-base overflow-hidden">
      <aside
        className={`transition-all duration-300 ease-in-out bg-background-secondary border-r border-border shadow-xl flex-shrink-0 z-10 overflow-hidden
          ${isSidebarOpen ? "w-72 sm:w-80" : "w-0"}`}
      >
        <div className="w-72 sm:w-80 h-full">
          <ConversationList />
        </div>
      </aside>

      <main className="flex-grow flex flex-col min-w-0">
        <MessageView
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </main>
    </div>
  );
}
