export type AgeGroup = "newborn" | "infant" | "toddler" | "child";

export const AGE_GROUPS: { id: AgeGroup; label: string; range: string; emoji: string }[] = [
  { id: "newborn", label: "Newborn", range: "0–3 months", emoji: "👶" },
  { id: "infant", label: "Infant", range: "3–12 months", emoji: "🍼" },
  { id: "toddler", label: "Toddler", range: "1–3 years", emoji: "🧸" },
  { id: "child", label: "Child", range: "3–12 years", emoji: "🎒" },
];

export const SCENARIO_CARDS = [
  { id: "fever", label: "Fever", emoji: "🌡️", prompt: "My child has a fever. What should I do?" },
  { id: "rashes", label: "Rashes", emoji: "🔴", prompt: "My child has developed a rash. What could it be?" },
  { id: "sleep", label: "Sleep Issues", emoji: "😴", prompt: "My child is having trouble sleeping. Any guidance?" },
  { id: "feeding", label: "Feeding", emoji: "🥄", prompt: "I have concerns about my child's feeding." },
  { id: "teething", label: "Teething", emoji: "🦷", prompt: "My child seems to be teething and is very fussy." },
  { id: "cough", label: "Cough & Cold", emoji: "🤧", prompt: "My child has a cough and cold symptoms." },
];

export const EMERGENCY_KEYWORDS = [
  "choking", "not breathing", "can't breathe", "stopped breathing",
  "seizure", "convulsion", "unconscious", "unresponsive",
  "blue lips", "turning blue", "blue skin", "cyanosis",
  "limp", "floppy", "won't wake up", "not waking up",
  "swallowed poison", "ingested", "drank bleach", "ate pills",
  "severe bleeding", "won't stop bleeding", "head injury",
  "drowning", "drowned", "near drowning",
  "allergic reaction", "anaphylaxis", "swelling throat", "can't swallow",
  "burn", "scalded", "electrocuted",
  "fell from height", "broken bone", "bone sticking out",
  "meningitis", "stiff neck", "bulging fontanelle",
  "suicidal", "self harm", "wants to die",
];

export type Severity = "low" | "moderate" | "high" | "emergency";

export const SEVERITY_CONFIG: Record<Severity, { label: string; color: string; bgClass: string; textClass: string; advice: string }> = {
  low: {
    label: "Home Care",
    color: "success",
    bgClass: "bg-success/10",
    textClass: "text-success",
    advice: "This can likely be managed at home. Monitor symptoms.",
  },
  moderate: {
    label: "Call Pediatrician",
    color: "warning",
    bgClass: "bg-warning/10",
    textClass: "text-warning",
    advice: "Consider calling your pediatrician for guidance.",
  },
  high: {
    label: "Seek Care Now",
    color: "emergency",
    bgClass: "bg-emergency/10",
    textClass: "text-emergency",
    advice: "Please seek medical attention promptly.",
  },
  emergency: {
    label: "Emergency — Call 911",
    color: "emergency",
    bgClass: "bg-emergency",
    textClass: "text-emergency-foreground",
    advice: "This may be a medical emergency. Call 911 immediately.",
  },
};

export const GEMINI_MODELS = [
  { id: "google/gemini-3-flash-preview", label: "Gemini Flash", description: "Fast & balanced — best for most questions" },
  { id: "google/gemini-2.5-flash", label: "Gemini 2.5 Flash", description: "Previous gen, reliable & fast" },
  { id: "google/gemini-2.5-pro", label: "Gemini Pro", description: "Most thorough — best for complex concerns" },
];

export const DEFAULT_MODEL = "google/gemini-3-flash-preview";
