import { create } from "zustand";
import { type AgeGroup, DEFAULT_MODEL } from "./constants";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  severity?: "low" | "moderate" | "high" | "emergency";
  timestamp: Date;
}

interface AppState {
  // Chat
  messages: ChatMessage[];
  isStreaming: boolean;
  addMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => string;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  clearMessages: () => void;
  setIsStreaming: (v: boolean) => void;

  // Settings
  ageGroup: AgeGroup | null;
  setAgeGroup: (ag: AgeGroup | null) => void;
  model: string;
  setModel: (m: string) => void;
  emergencyContact: string;
  setEmergencyContact: (c: string) => void;

  // Emergency
  showEmergencyAlert: boolean;
  emergencyText: string;
  firstAidGuidance: string | null;
  triggerEmergency: (text: string, guidance: string | null) => void;
  dismissEmergency: () => void;
}

let msgCounter = 0;

export const useAppStore = create<AppState>((set) => ({
  messages: [],
  isStreaming: false,
  addMessage: (msg) => {
    const id = `msg-${++msgCounter}`;
    set((s) => ({
      messages: [...s.messages, { ...msg, id, timestamp: new Date() }],
    }));
    return id;
  },
  updateMessage: (id, updates) =>
    set((s) => ({
      messages: s.messages.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    })),
  clearMessages: () => set({ messages: [] }),
  setIsStreaming: (v) => set({ isStreaming: v }),

  ageGroup: null,
  setAgeGroup: (ag) => set({ ageGroup: ag }),
  model: DEFAULT_MODEL,
  setModel: (m) => set({ model: m }),
  emergencyContact: "",
  setEmergencyContact: (c) => set({ emergencyContact: c }),

  showEmergencyAlert: false,
  emergencyText: "",
  firstAidGuidance: null,
  triggerEmergency: (text, guidance) =>
    set({ showEmergencyAlert: true, emergencyText: text, firstAidGuidance: guidance }),
  dismissEmergency: () => set({ showEmergencyAlert: false }),
}));
