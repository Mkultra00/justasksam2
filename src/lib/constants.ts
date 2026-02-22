export type AgeGroup = "newborn" | "infant" | "toddler" | "child";

export const AGE_GROUPS: { id: AgeGroup; label: string; range: string; emoji: string }[] = [
  { id: "newborn", label: "Newborn", range: "0–3 months", emoji: "👶" },
  { id: "infant", label: "Infant", range: "3–12 months", emoji: "🍼" },
  { id: "toddler", label: "Toddler", range: "1–3 years", emoji: "🧸" },
  { id: "child", label: "Child", range: "3–12 years", emoji: "🎒" },
];

export interface ConcernItem {
  id: string;
  label: string;
  emoji: string;
  prompt: string;
}

export interface ConcernCategory {
  id: string;
  label: string;
  emoji: string;
  items: ConcernItem[];
}

export const CONCERN_CATEGORIES: ConcernCategory[] = [
  {
    id: "medical",
    label: "Medical",
    emoji: "🩺",
    items: [
      { id: "fever", label: "Fever", emoji: "🌡️", prompt: "My child has a fever. What should I do?" },
      { id: "rashes", label: "Rashes", emoji: "🔴", prompt: "My child has developed a rash. What could it be?" },
      { id: "cough", label: "Cough & Cold", emoji: "🤧", prompt: "My child has a cough and cold symptoms." },
      { id: "teething", label: "Teething", emoji: "🦷", prompt: "My child seems to be teething and is very fussy." },
      { id: "stomach", label: "Stomach Issues", emoji: "🤢", prompt: "My child has stomach pain or vomiting. What should I look out for?" },
      { id: "allergies", label: "Allergies", emoji: "🤧", prompt: "I think my child might have allergies. What are the signs?" },
    ],
  },
  {
    id: "daily",
    label: "Daily Care",
    emoji: "🍼",
    items: [
      { id: "feeding", label: "Feeding & Nutrition", emoji: "🥄", prompt: "I have concerns about my child's feeding and nutrition." },
      { id: "sleep", label: "Sleep Issues", emoji: "😴", prompt: "My child is having trouble sleeping. Any guidance?" },
      { id: "potty", label: "Potty Training", emoji: "🚽", prompt: "I need help with potty training. Any tips?" },
      { id: "hygiene", label: "Hygiene & Bathing", emoji: "🛁", prompt: "What's the best hygiene routine for my child?" },
    ],
  },
  {
    id: "mental",
    label: "Mental Health",
    emoji: "🧠",
    items: [
      { id: "anxiety", label: "Anxiety & Fears", emoji: "😰", prompt: "My child seems anxious or fearful. How can I help?" },
      { id: "tantrums", label: "Tantrums & Meltdowns", emoji: "😤", prompt: "My child is having frequent tantrums. What's normal and when should I worry?" },
      { id: "separation", label: "Separation Anxiety", emoji: "🥺", prompt: "My child has severe separation anxiety. What can I do?" },
      { id: "selfesteem", label: "Self-Esteem", emoji: "💛", prompt: "How can I help boost my child's self-esteem and confidence?" },
    ],
  },
  {
    id: "social",
    label: "Social & Behavior",
    emoji: "🤝",
    items: [
      { id: "bullying", label: "Bullying", emoji: "😢", prompt: "I think my child is being bullied. How should I handle this?" },
      { id: "sharing", label: "Sharing & Taking Turns", emoji: "🤲", prompt: "My child struggles with sharing. How do I teach this?" },
      { id: "shyness", label: "Shyness", emoji: "🫣", prompt: "My child is very shy around others. Should I be concerned?" },
      { id: "screentime", label: "Screen Time", emoji: "📱", prompt: "How much screen time is okay for my child's age?" },
    ],
  },
  {
    id: "school",
    label: "School & Learning",
    emoji: "📚",
    items: [
      { id: "readiness", label: "School Readiness", emoji: "🎒", prompt: "Is my child ready for school? What should they know?" },
      { id: "homework", label: "Homework Struggles", emoji: "📝", prompt: "My child struggles with homework. How can I help?" },
      { id: "focus", label: "Focus & Attention", emoji: "🎯", prompt: "My child has trouble focusing. Could it be ADHD or is it normal?" },
      { id: "milestones", label: "Developmental Milestones", emoji: "📊", prompt: "Is my child hitting their developmental milestones on time?" },
    ],
  },
  {
    id: "safety",
    label: "Safety",
    emoji: "🛡️",
    items: [
      { id: "childproofing", label: "Childproofing", emoji: "🔒", prompt: "What should I childproof at home for my child's age?" },
      { id: "firstaid", label: "First Aid Basics", emoji: "🩹", prompt: "What first aid basics should every parent know?" },
      { id: "stranger", label: "Stranger Safety", emoji: "⚠️", prompt: "How do I teach my child about stranger safety?" },
      { id: "water", label: "Water Safety", emoji: "🏊", prompt: "What water safety rules should my child know?" },
    ],
  },
];

// Flat list for backwards compatibility
export const SCENARIO_CARDS = CONCERN_CATEGORIES.flatMap((c) => c.items);

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
