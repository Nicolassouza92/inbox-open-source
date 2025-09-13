import type { Message } from "@/types/message";
import ReactMarkdown from "react-markdown";

type Alignment = "left-right" | "all-left" | "all-right" | "right-left";

interface MessageBubbleProps {
  message: Message;
  alignment: Alignment;
}

export function MessageBubble({ message, alignment }: MessageBubbleProps) {
  const isAgent = message.from === "agent";

  let alignmentClass = "";
  if (alignment === "left-right") {
    alignmentClass = isAgent ? "self-end ml-auto" : "self-start mr-auto";
  } else if (alignment === "right-left") {
    alignmentClass = isAgent ? "self-start mr-auto" : "self-end ml-auto";
  } else if (alignment === "all-left") {
    alignmentClass = "self-start mr-auto";
  } else {
    alignmentClass = "self-end ml-auto";
  }

  const styleClasses = isAgent
    ? "bg-gradient-sent text-text-accent"
    : "bg-gradient-received text-text-accent";

  const timeColorClass = isAgent ? "text-text-accent/70" : "text-text-muted";

  return (
    <div
      className={`p-3 rounded-2xl w-fit max-w-[85%] md:max-w-lg flex flex-col shadow-bubble transition-all duration-500 ease-in-out hover:shadow-lg ${alignmentClass} ${styleClasses}`}
    >
      <div className="prose prose-sm text-justify leading-loose prose-p:my-0 prose-ul:my-0 prose-li:my-0 break-words">
        <ReactMarkdown>{message.text}</ReactMarkdown>
      </div>
      <div className={`text-[11px] mt-2 text-right ${timeColorClass}`}>
        {new Date(message.createdAt).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}
