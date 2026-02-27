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
    id: "mental",
    label: "Mental Health",
    emoji: "🧠",
    items: [
      { id: "anxiety", label: "Anxiety & Stress", emoji: "😰", prompt: "My teen seems really anxious lately. How can I help them?" },
      { id: "depression", label: "Low Mood & Depression", emoji: "😞", prompt: "My teen has been withdrawn and down. What should I look out for?" },
      { id: "burnout", label: "Burnout", emoji: "🔥", prompt: "I think my teen is burned out from school and activities. How can I support them?" },
      { id: "selfesteem", label: "Self-Esteem & Identity", emoji: "💛", prompt: "My teen is struggling with self-image and confidence. How can I help?" },
      { id: "psychosomatic", label: "Stress-Related Physical Symptoms", emoji: "🤕", prompt: "My teen keeps complaining of headaches and stomach aches but doctors can't find anything. Could it be stress-related?" },
      { id: "eating", label: "Eating & Body Image", emoji: "🍽️", prompt: "I'm concerned my teen may have an unhealthy relationship with food and body image." },
    ],
  },
  {
    id: "relationships",
    label: "Relationships",
    emoji: "🤝",
    items: [
      { id: "family", label: "Family Conflict", emoji: "🏠", prompt: "I'm having conflicts with my teen. How can I improve our communication?" },
      { id: "friendships", label: "Friendships", emoji: "👫", prompt: "My teen is struggling with friendships. What should I do?" },
      { id: "romantic", label: "Romantic Relationships", emoji: "💕", prompt: "My teen is in a relationship and I have concerns. How should I approach this?" },
      { id: "loneliness", label: "Loneliness & Isolation", emoji: "🫂", prompt: "My teen seems isolated and lonely. How can I help them connect?" },
    ],
  },
  {
    id: "lifestyle",
    label: "Lifestyle & Habits",
    emoji: "🌿",
    items: [
      { id: "sleep", label: "Sleep Problems", emoji: "🌙", prompt: "My teen has terrible sleep habits. How can I help them improve?" },
      { id: "nutrition", label: "Nutrition & Diet", emoji: "🥗", prompt: "I'm concerned about my teen's eating habits. What should I know?" },
      { id: "exercise", label: "Exercise & Fitness", emoji: "🏃", prompt: "How can I encourage my teen to be more physically active?" },
      { id: "substances", label: "Substance Use", emoji: "🚫", prompt: "I'm worried my teen may be using substances. How should I handle this?" },
    ],
  },
  {
    id: "school-work",
    label: "School & Career",
    emoji: "📚",
    items: [
      { id: "academic", label: "Academic Pressure", emoji: "📝", prompt: "My teen is overwhelmed by school pressure. How can I support them?" },
      { id: "career", label: "Career Uncertainty", emoji: "🧭", prompt: "My teen doesn't know what they want to do after school. How can I help?" },
      { id: "focus", label: "Focus & Motivation", emoji: "🎯", prompt: "My teen can't focus or stay motivated. Could something be wrong?" },
      { id: "finances", label: "Financial Literacy", emoji: "💸", prompt: "How can I teach my teen about money management?" },
    ],
  },
  {
    id: "safety",
    label: "Safety & Crisis",
    emoji: "🛡️",
    items: [
      { id: "selfharm", label: "Self-Harm Concerns", emoji: "🆘", prompt: "I'm worried my teen may be self-harming. What should I do?" },
      { id: "abuse", label: "Abuse & Unsafe Situations", emoji: "⚠️", prompt: "I'm concerned my teen may be in an unsafe situation. What are my options?" },
      { id: "online-safety", label: "Online Safety", emoji: "🔒", prompt: "I'm worried about my teen's online activity. How can I keep them safe?" },
      { id: "crisis", label: "Crisis Resources", emoji: "📞", prompt: "What crisis resources are available for teens and young adults?" },
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
