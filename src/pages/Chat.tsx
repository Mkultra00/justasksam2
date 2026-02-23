import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, Trash2 } from "lucide-react";
import samAvatar from "@/assets/sam-avatar.png";
import { Button } from "@/components/ui/button";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import EmergencyAlert from "@/components/EmergencyAlert";
import { useAppStore } from "@/lib/store";
import { streamChat } from "@/lib/chat";
import { detectEmergencyKeywords, getFirstAidGuidance, parseSeverityFromResponse } from "@/lib/safety";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prefill = (location.state as any)?.prefill as string | undefined;
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages, isStreaming, addMessage, updateMessage, clearMessages, setIsStreaming,
    ageGroup, model, triggerEmergency,
  } = useAppStore();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isStreaming]);

  const handleSend = async (text: string) => {
    // Tier 1: Client-side keyword detection
    if (detectEmergencyKeywords(text)) {
      const guidance = getFirstAidGuidance(text);
      triggerEmergency(text, guidance);
    }

    addMessage({ role: "user", content: text });
    setIsStreaming(true);

    let assistantId: string | null = null;
    let assistantContent = "";

    const chatMessages = [...messages, { role: "user" as const, content: text }].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    await streamChat({
      messages: chatMessages,
      model,
      ageGroup,
      onDelta: (chunk) => {
        assistantContent += chunk;
        if (!assistantId) {
          assistantId = addMessage({ role: "assistant", content: assistantContent });
        } else {
          updateMessage(assistantId, { content: assistantContent });
        }
      },
      onDone: () => {
        // Parse severity from completed response
        if (assistantId) {
          const severity = parseSeverityFromResponse(assistantContent);
          updateMessage(assistantId, { severity });
          if (severity === "emergency") {
            const guidance = getFirstAidGuidance(text);
            triggerEmergency(text, guidance);
          }
        }
        setIsStreaming(false);
      },
      onError: (err) => {
        if (!assistantId) {
          addMessage({ role: "assistant", content: `I'm sorry, I encountered an error: ${err}` });
        } else {
          updateMessage(assistantId, { content: `I'm sorry, I encountered an error: ${err}` });
        }
        setIsStreaming(false);
      },
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <button onClick={() => navigate("/")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src={samAvatar} alt="Sam avatar" className="w-10 h-10 rounded-full shadow-sm" />
          <h1 className="text-lg font-serif font-semibold text-foreground">Just Ask Sam 2</h1>
        </button>
        <div className="flex gap-1">
          {messages.length > 0 && (
            <Button variant="ghost" size="icon" onClick={clearMessages}>
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">Describe your child's symptoms or concerns.</p>
            <p className="text-xs mt-1">I'll provide guidance and let you know if you should see a doctor.</p>
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isStreaming && !messages.some((m) => m.role === "assistant" && m.id === messages[messages.length - 1]?.id) && (
          <TypingIndicator />
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isStreaming} prefill={prefill} />

      {/* Emergency Overlay */}
      <EmergencyAlert />
    </div>
  );
};

export default Chat;
