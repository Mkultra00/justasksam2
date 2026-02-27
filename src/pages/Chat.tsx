import { useEffect, useRef, useCallback } from "react";
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
  const isEmergencyMode = (location.state as any)?.emergency as boolean | undefined;
  const scrollRef = useRef<HTMLDivElement>(null);
  const emergencyInitRef = useRef(false);

  const {
    messages, isStreaming, addMessage, updateMessage, clearMessages, setIsStreaming,
    ageGroup, model, triggerEmergency,
  } = useAppStore();

  const lastMessageContent = messages.length > 0 ? messages[messages.length - 1]?.content : "";

  // Clear messages when starting a new chat session
  useEffect(() => {
    clearMessages();
    emergencyInitRef.current = false;
  }, [clearMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages.length, isStreaming, lastMessageContent]);

  // Auto-start emergency conversation
  useEffect(() => {
    if (isEmergencyMode && !emergencyInitRef.current && messages.length === 0) {
      emergencyInitRef.current = true;
      // Add the AI's initial emergency question
      addMessage({
        role: "assistant",
        content: "🚨 **I'm here to help. Stay calm.**\n\nWhat is the emergency? Tell me:\n- **What happened?**\n- **How old is the child?**\n- **Are they conscious and breathing?**",
      });
    }
  }, [isEmergencyMode, messages.length, addMessage]);

  // Buffered rendering for readable streaming
  const bufferRef = useRef("");
  const renderingRef = useRef(false);
  const assistantIdRef = useRef<string | null>(null);
  const assistantContentRef = useRef("");
  const streamDoneRef = useRef(false);

  const flushBuffer = useCallback(() => {
    if (renderingRef.current) return;
    renderingRef.current = true;

    const tick = () => {
      if (bufferRef.current.length === 0) {
        renderingRef.current = false;
        if (streamDoneRef.current) {
          // Parse severity after done
          const severity = parseSeverityFromResponse(assistantContentRef.current);
          if (assistantIdRef.current) {
            updateMessage(assistantIdRef.current, { severity });
            if (severity === "emergency") {
              const guidance = getFirstAidGuidance("");
              triggerEmergency("", guidance);
            }
          }
          setIsStreaming(false);
          streamDoneRef.current = false;
        }
        return;
      }

      // Render a few characters at a time for a readable pace
      const chunkSize = Math.max(1, Math.min(3, bufferRef.current.length));
      const chars = bufferRef.current.slice(0, chunkSize);
      bufferRef.current = bufferRef.current.slice(chunkSize);
      assistantContentRef.current += chars;

      if (!assistantIdRef.current) {
        assistantIdRef.current = addMessage({ role: "assistant", content: assistantContentRef.current });
      } else {
        updateMessage(assistantIdRef.current, { content: assistantContentRef.current });
      }

      setTimeout(tick, 18);
    };

    tick();
  }, [addMessage, updateMessage, setIsStreaming, triggerEmergency]);

  const handleSend = async (text: string) => {
    // Tier 1: Client-side keyword detection
    if (detectEmergencyKeywords(text)) {
      const guidance = getFirstAidGuidance(text);
      triggerEmergency(text, guidance);
    }

    addMessage({ role: "user", content: text });
    setIsStreaming(true);

    // Reset refs
    assistantIdRef.current = null;
    assistantContentRef.current = "";
    bufferRef.current = "";
    streamDoneRef.current = false;

    const chatMessages = [...messages, { role: "user" as const, content: text }].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    await streamChat({
      messages: chatMessages,
      model,
      ageGroup,
      emergencyMode: !!isEmergencyMode,
      onDelta: (chunk) => {
        bufferRef.current += chunk;
        flushBuffer();
      },
      onDone: () => {
        streamDoneRef.current = true;
        flushBuffer();
      },
      onError: (err) => {
        bufferRef.current = "";
        if (!assistantIdRef.current) {
          addMessage({ role: "assistant", content: `I'm sorry, I encountered an error: ${err}` });
        } else {
          updateMessage(assistantIdRef.current, { content: `I'm sorry, I encountered an error: ${err}` });
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
          <img src={samAvatar} alt="Sam avatar" className="w-[66px] h-[66px] rounded-full shadow-sm object-cover" />
          <h1 className="text-2xl font-serif font-semibold text-foreground">Just Ask Sam 2</h1>
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
            <p className="text-sm">What's on your mind? Describe what you're going through.</p>
            <p className="text-xs mt-1">I'll help you figure out next steps and when to get professional help.</p>
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isStreaming && <TypingIndicator />}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isStreaming} prefill={prefill} />

      {/* Emergency Overlay */}
      <EmergencyAlert />
    </div>
  );
};

export default Chat;
