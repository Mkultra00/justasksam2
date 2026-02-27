export type AgeGroup = "young-teen" | "older-teen" | "young-adult" | "late-twenties";

export const AGE_GROUPS: { id: AgeGroup; label: string; range: string; emoji: string }[] = [
  { id: "young-teen", label: "Young Teen", range: "12–14", emoji: "🎧" },
  { id: "older-teen", label: "Older Teen", range: "15–19", emoji: "🎓" },
  { id: "young-adult", label: "Young Adult", range: "21–25", emoji: "🌱" },
  { id: "late-twenties", label: "Late Twenties", range: "26–30", emoji: "💼" },
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
    id: "physical",
    label: "Physical Health",
    emoji: "🩺",
    items: [
      { id: "headaches", label: "Headaches & Migraines", emoji: "🤕", prompt: "I've been getting frequent headaches. What could be causing them?" },
      { id: "fatigue", label: "Fatigue & Low Energy", emoji: "😴", prompt: "I'm always tired even when I sleep enough. What should I do?" },
      { id: "stomach", label: "Stomach & Digestion", emoji: "🤢", prompt: "I've been having stomach issues. What might be going on?" },
      { id: "skin", label: "Skin & Acne", emoji: "✨", prompt: "I'm dealing with skin problems. What can help?" },
      { id: "pain", label: "Body Aches & Pain", emoji: "💪", prompt: "I've been having unexplained body pain. Should I be worried?" },
      { id: "sexual-health", label: "Sexual Health", emoji: "❤️", prompt: "I have questions about sexual health. Can you help?" },
    ],
  },
  {
    id: "mental",
    label: "Mental Health",
    emoji: "🧠",
    items: [
      { id: "anxiety", label: "Anxiety & Stress", emoji: "😰", prompt: "I've been feeling really anxious lately. How can I manage it?" },
      { id: "depression", label: "Low Mood & Depression", emoji: "😞", prompt: "I've been feeling down for a while. What should I do?" },
      { id: "burnout", label: "Burnout", emoji: "🔥", prompt: "I think I'm burned out. How do I recover?" },
      { id: "selfesteem", label: "Self-Esteem & Identity", emoji: "💛", prompt: "I've been struggling with my self-image. How can I feel better about myself?" },
    ],
  },
  {
    id: "relationships",
    label: "Relationships",
    emoji: "🤝",
    items: [
      { id: "family", label: "Family Conflict", emoji: "🏠", prompt: "I'm having conflicts with my family. How can I handle it?" },
      { id: "friendships", label: "Friendships", emoji: "👫", prompt: "I'm struggling with friendships. What should I do?" },
      { id: "romantic", label: "Romantic Relationships", emoji: "💕", prompt: "I need guidance about a romantic relationship issue." },
      { id: "loneliness", label: "Loneliness & Isolation", emoji: "🫂", prompt: "I've been feeling really lonely. How can I cope?" },
    ],
  },
  {
    id: "lifestyle",
    label: "Lifestyle & Habits",
    emoji: "🌿",
    items: [
      { id: "sleep", label: "Sleep Problems", emoji: "🌙", prompt: "I can't sleep well. What can I do to improve my sleep?" },
      { id: "nutrition", label: "Nutrition & Diet", emoji: "🥗", prompt: "I want to eat healthier but don't know where to start." },
      { id: "exercise", label: "Exercise & Fitness", emoji: "🏃", prompt: "I want to be more active. How do I start?" },
      { id: "substances", label: "Substance Use", emoji: "🚫", prompt: "I have concerns about substance use. Can we talk about it?" },
    ],
  },
  {
    id: "school-work",
    label: "School & Career",
    emoji: "📚",
    items: [
      { id: "academic", label: "Academic Pressure", emoji: "📝", prompt: "I'm overwhelmed by school pressure. How do I cope?" },
      { id: "career", label: "Career Uncertainty", emoji: "🧭", prompt: "I don't know what I want to do with my life. Can you help me think through it?" },
      { id: "focus", label: "Focus & Motivation", emoji: "🎯", prompt: "I can't focus or stay motivated. What's wrong with me?" },
      { id: "finances", label: "Financial Stress", emoji: "💸", prompt: "I'm stressed about money. How can I manage it?" },
    ],
  },
  {
    id: "safety",
    label: "Safety & Crisis",
    emoji: "🛡️",
    items: [
      { id: "selfharm", label: "Self-Harm Thoughts", emoji: "🆘", prompt: "I've been having thoughts of hurting myself. I need help." },
      { id: "abuse", label: "Abuse & Unsafe Situations", emoji: "⚠️", prompt: "I'm in an unsafe situation. What are my options?" },
      { id: "online-safety", label: "Online Safety", emoji: "🔒", prompt: "I'm dealing with something concerning online. What should I do?" },
      { id: "crisis", label: "Crisis Resources", emoji: "📞", prompt: "I need to know what crisis resources are available to me." },
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
