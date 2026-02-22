import { EMERGENCY_KEYWORDS, type Severity } from "./constants";

export function detectEmergencyKeywords(text: string): boolean {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

export function getFirstAidGuidance(text: string): string | null {
  const lower = text.toLowerCase();
  if (lower.includes("choking")) {
    return "For infants: 5 back blows + 5 chest thrusts. For children over 1: Heimlich maneuver (abdominal thrusts). Call 911 immediately.";
  }
  if (lower.includes("not breathing") || lower.includes("stopped breathing") || lower.includes("can't breathe")) {
    return "Start infant/child CPR if trained. Call 911 immediately. Keep the airway clear.";
  }
  if (lower.includes("seizure") || lower.includes("convulsion")) {
    return "Place child on their side. Do NOT put anything in their mouth. Time the seizure. Call 911 if it lasts more than 5 minutes.";
  }
  if (lower.includes("poison") || lower.includes("ingested") || lower.includes("bleach") || lower.includes("pills")) {
    return "Do NOT induce vomiting. Call Poison Control: 1-800-222-1222. If child is unconscious, call 911.";
  }
  if (lower.includes("burn") || lower.includes("scalded")) {
    return "Cool the burn under cool (not cold) running water for 10–20 minutes. Do NOT apply ice, butter, or creams. Cover loosely. Seek care for large or deep burns.";
  }
  if (lower.includes("allergic") || lower.includes("anaphylaxis") || lower.includes("swelling throat")) {
    return "Use epinephrine auto-injector (EpiPen) if available. Call 911 immediately. Keep child lying down with legs elevated.";
  }
  return null;
}

export function parseSeverityFromResponse(text: string): Severity {
  // Look for severity marker in AI response
  const match = text.match(/\[SEVERITY:\s*(low|moderate|high|emergency)\]/i);
  if (match) return match[1].toLowerCase() as Severity;
  return "low";
}
