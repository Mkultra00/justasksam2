import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { SEVERITY_CONFIG, type Severity } from "@/lib/constants";
import { type ChatMessage as ChatMessageType } from "@/lib/store";

interface Props {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: Props) => {
  const isUser = message.role === "user";

  // Strip severity marker from display
  const displayContent = message.content.replace(/\[SEVERITY:\s*(low|moderate|high|emergency)\]/gi, "").trim();

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-card border border-border rounded-bl-md"
        }`}
      >
        {!isUser && message.severity && (
          <div className="mb-2">
            <SeverityBadge severity={message.severity} />
          </div>
        )}
        <div className={`prose prose-sm max-w-none ${isUser ? "prose-invert" : ""}`}>
          <ReactMarkdown>{displayContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

const SeverityBadge = ({ severity }: { severity: Severity }) => {
  const config = SEVERITY_CONFIG[severity];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${config.bgClass} ${config.textClass}`}>
      {severity === "low" && "🟢"}
      {severity === "moderate" && "🟡"}
      {severity === "high" && "🔴"}
      {severity === "emergency" && "🚨"}
      {config.label}
    </span>
  );
};

export default ChatMessage;
