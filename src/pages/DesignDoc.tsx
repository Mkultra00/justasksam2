import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const designDoc = `# Just Ask Sam 2 — Complete Design Document for Lovable Rebuild

This document contains everything needed to recreate the Just Ask Sam 2 application from scratch on Lovable.

---

## 1. Product Overview

**Just Ask Sam 2** is an AI-powered peer mentoring companion for parents and guardians of teens (12–19) and young adults (21–30). It helps families navigate depression, anxiety, substance abuse, technology addiction, gender identity, and other emotional health challenges. The AI persona ("Sam") speaks as a wise friend with lived experience — NOT a clinician. Inspired by [Isleworth Private Client Services](https://isleworthprivateservices.com) and their "Power of the Peer" philosophy.

**Live URL**: justasksam2.lovable.app

---

## 2. Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **State Management**: Zustand (in-memory, no persistence to localStorage)
- **Routing**: react-router-dom v6 (3 routes: \`/\`, \`/chat\`, \`/settings\`)
- **UI Components**: shadcn/ui (Radix primitives), Framer Motion for animations
- **Markdown Rendering**: react-markdown
- **Backend**: Lovable Cloud (Supabase) — 2 Edge Functions + 2 database tables
- **AI**: Lovable AI Gateway (Gemini models) — streaming SSE responses
- **Fonts**: Google Fonts — DM Sans (body), Playfair Display (headings)

---

## 3. Design System & Theme

### Color Palette (HSL CSS Variables)

**Light mode:**
- Background: \`270 15% 97%\` (soft lavender-white)
- Primary: \`270 40% 30%\` (deep purple) / Primary foreground: \`45 90% 65%\` (warm gold)
- Secondary: \`45 80% 92%\` (warm cream)
- Warning: \`38 92% 50%\` (amber)
- Success: \`152 55% 40%\` (teal-green)
- Emergency: \`0 72% 51%\` (red)

**Dark mode:**
- Background: \`270 25% 7%\`
- Primary: \`45 85% 60%\` (gold) / Primary foreground: \`270 40% 12%\`
- Emergency stays red in both modes

### Typography
- **Body**: \`DM Sans\` (Google Fonts), sans-serif
- **Headings (h1–h6)**: \`Playfair Display\`, serif
- Import: \`https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:wght@400;500;600;700&display=swap\`

### Custom Tailwind Extensions
- Custom colors: \`warning\`, \`success\`, \`emergency\` (each with DEFAULT + foreground)
- Custom animation: \`pulse-gentle\` — gentle opacity pulse for typing indicator dots
- Border radius: \`0.75rem\` base

---

## 4. Pages & Routes

### 4.1 Home Page (\`/\`)

**Components**: Disclaimer banner, Hero with Sam avatar, Mission statement, PIN Access, Start Chat + Emergency buttons, Concern Categories grid, Trust indicators.

**Disclaimer banner** (top of page):
> "Just Ask Sam 2 is for informational purposes only and does not provide clinical treatment, medical diagnoses, or establish a patient relationship. Always consult a qualified healthcare professional. If this is an emergency, call 911 or 988 immediately."

**Hero section:**
- Large circular Sam avatar (224px mobile, 288px desktop) with pulsing glow animation and wave emoji 👋
- Title: "Just Ask Sam 2"
- Subtitle: "Your calm, trusted guide for supporting your teen or young adult's emotional health, wellness, and life challenges."

**Mission statement card:**
> "We support families with teens and young adults navigating depression, anxiety, substance abuse, technology addiction, gender identity, and other life challenges. Our mission is to improve social and emotional health through the Power of the Peer — combining lived experience with evidence-based guidance so no family feels alone."
> Footer: "Inspired by Isleworth Private Client Services" (linked)

**PIN Access section** (before chat buttons):
- 3-mode flow: \`choose\` → \`enter\` (returning user) or \`create\` (new user)
- User picks their own 6-digit numeric code
- Creation checks for duplicate codes
- "Continue without saving memory" option (sets guardianId to null)
- Privacy note on create screen: "For privacy, use code names (not real names) for your children and family members."

**After PIN authenticated:**
- Guardian status bar showing PIN and optional display name + logout button
- Two buttons: "Start a Conversation" (primary) and "Emergency" (red, destructive)

**Concern Categories** (6 categories, shown in 2×3 grid):
1. 🧠 Mental Health — Anxiety & Stress, Low Mood & Depression, Burnout, Self-Esteem & Identity, Stress-Related Physical Symptoms, Eating & Body Image
2. 🤝 Relationships — Family Conflict, Friendships, Romantic Relationships, Loneliness & Isolation
3. 🌿 Lifestyle & Habits — Sleep Problems, Nutrition & Diet, Exercise & Fitness, Substance Use, Technology Addiction
4. 📚 School & Career — Academic Pressure, Career Uncertainty, Focus & Motivation, Financial Literacy
5. 🌈 Identity & Growth — Gender Identity, Sexual Orientation, Cultural Identity, Finding Their Path
6. 🛡️ Safety & Crisis — Self-Harm Concerns, Abuse & Unsafe Situations, Online Safety, Crisis Resources

Each category expands to show items + custom text input. Tapping an item navigates to \`/chat\` with a pre-filled prompt.

**Trust indicators** (bottom):
- Badges: "Safety-First Design", "PIN-Secured Memory", "Evidence-Based Guidance"
- Footer text: "When in doubt, reach out to a professional."

### 4.2 Chat Page (\`/chat\`)

**Header**: Back arrow, Sam avatar (66px) + "Just Ask Sam 2" title (clickable, returns home), Clear chat + Settings buttons.

**Empty state text:**
> "Tell me what's going on. Is this something urgent right now, or are you hoping to start building a plan?"
> "If there's no immediate crisis, let me learn about your family first — it helps me give better guidance over time."
> 🔒 "Remember to use code names for your family members, not real names."

**Message bubbles:**
- User: \`bg-primary text-primary-foreground\`, rounded-br-md
- Assistant: \`bg-card\` with border, rounded-bl-md
- Assistant messages display severity badge (🟢🟡🔴🚨) parsed from \`[SEVERITY: xxx]\` tag
- Markdown rendered via react-markdown
- Severity tag stripped from displayed content

**Chat input:**
- Auto-expanding textarea (max 120px height)
- Disclaimer above input: "AI guidance trained as a non-clinical lived experience peer — not medical advice."
- Enter sends, Shift+Enter for newline
- Supports prefill from scenario cards

**Streaming:**
- SSE streaming from edge function
- Buffered rendering: characters rendered 1–3 at a time every 18ms for readable pace
- Typing indicator (3 pulsing dots) shown during streaming

**Emergency mode:**
- Triggered via Emergency button on home page OR keyword detection
- Auto-starts with: "🚨 I'm here to help. Stay calm. Tell me what's going on — what happened?"
- Uses separate \`EMERGENCY_SYSTEM_PROMPT\` (short bullets, under 150 words)

**Memory save on exit:**
- When component unmounts, fires \`save-memory\` edge function with conversation history
- Uses refs to avoid re-running effect on every message update
- Only fires if guardianId exists and messages.length >= 2

### 4.3 Settings Page (\`/settings\`)

- **AI Model selector**: 3 options — Gemini Flash (default), Gemini 2.5 Flash, Gemini Pro
- **Default Age Group**: Young Teen (12–14), Older Teen (15–19), Young Adult (21–25), Late Twenties (26–30)
- **Emergency Contact**: Optional text input
- **Coming Soon** (grayed out): Account & Profiles, Voice Mode, Image Assessment, Multi-Language

---

## 5. Safety Architecture (3-Tier System)

### Tier 1: Client-side keyword detection
Instant scan of user messages for emergency terms. Triggers full-screen emergency overlay BEFORE AI responds.

**Emergency keywords**: choking, not breathing, can't breathe, stopped breathing, seizure, convulsion, unconscious, unresponsive, blue lips, turning blue, blue skin, cyanosis, limp, floppy, won't wake up, not waking up, swallowed poison, ingested, drank bleach, ate pills, severe bleeding, won't stop bleeding, head injury, drowning, drowned, near drowning, allergic reaction, anaphylaxis, swelling throat, can't swallow, burn, scalded, electrocuted, fell from height, broken bone, bone sticking out, meningitis, stiff neck, bulging fontanelle, suicidal, self harm, wants to die.

**First-aid guidance** (context-specific): Choking → back blows/Heimlich. Not breathing → CPR. Seizure → side position. Poison → don't induce vomiting, call Poison Control. Burns → cool water. Allergic → EpiPen + 911.

### Tier 2: AI severity classification
Every AI response ends with \`[SEVERITY: low|moderate|high|emergency]\`. Parsed client-side, displayed as colored badge. If emergency, triggers overlay.

### Tier 3: Scope enforcement via system prompt
AI never diagnoses, prescribes medication, or replaces professionals.

### Emergency overlay
- Full-screen red overlay (z-50)
- "Call 911" button (tel: link)
- "Poison Control: 1-800-222-1222" button
- Context-specific first-aid guidance box
- "I understand — return to chat" dismiss button

### Severity labels
- 🟢 **low** → "Home Care" — "This can likely be managed at home. Monitor symptoms."
- 🟡 **moderate** → "Call your child's Clinician and/or 988 and/or 911" — "Consider calling your child's clinician for guidance."
- 🔴 **high** → "Seek Care Now" — "Please seek medical attention promptly."
- 🚨 **emergency** → "Emergency — Call 911" — "This may be a medical emergency. Call 911 immediately."

---

## 6. AI System Prompts

### Main System Prompt (in \`chat\` edge function)

The AI persona is "Just Ask Sam 2" — a calm, warm peer mentor (NOT a clinician). Key behaviors:

- **Privacy**: Reminds new users to use CODE NAMES for family members
- **Onboarding (new users)**: Asks about family — how many kids, ages, conditions/diagnoses, family dynamics. Then asks if there's an urgent concern or if Sam should learn more first.
- **Returning users**: Acknowledges memory, asks what's changed
- **Context gathering**: Age, gender (inclusive language), conditions/comorbidities, family dynamics, current interventions
- **Tone**: "wise friend" — warm, real, relatable. Uses phrases like "I've seen families work through this"
- **First aid guidance**: Provides actionable steps for urgent situations (grounding for panic, de-escalation, recovery position, etc.)
- **Crisis resources**: Always provides 988 Lifeline, Crisis Text Line (text HOME to 741741)
- **Response format**: Structured with bullets, ends with \`[SEVERITY: xxx]\` tag
- **Scope**: Never diagnoses, never prescribes medication dosages, never advises against seeking care. Physical health only when tied to mental health comorbidities.

### Emergency System Prompt

Short-format crisis mode. Bullet points only, under 150 words. Starts with most critical action. Includes 911, 988, Poison Control, Crisis Text Line. Always \`[SEVERITY: emergency]\`.

---

## 7. Database Schema

### Table: \`guardians\`
| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid (PK) | No | gen_random_uuid() |
| pin | text | No | — |
| display_name | text | Yes | — |
| created_at | timestamptz | No | now() |
| updated_at | timestamptz | No | now() |

RLS: Allow all access (no auth required — PIN-based system).

### Table: \`memory_notes\`
| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid (PK) | No | gen_random_uuid() |
| guardian_id | uuid (FK → guardians) | No | — |
| category | text | No | 'general' |
| content | text | No | — |
| created_at | timestamptz | No | now() |
| updated_at | timestamptz | No | now() |

RLS: Allow all access.

---

## 8. Edge Functions

### \`chat\` (verify_jwt: false)
- **Input**: \`{ messages, model, emergencyMode, memoryContext }\`
- **Behavior**: Prepends system prompt (+ memory context if available), calls Lovable AI Gateway with streaming enabled, proxies SSE response
- **Model default**: \`google/gemini-3-flash-preview\`
- **Error handling**: 429 → rate limit message, 402 → usage limit message

### \`save-memory\` (verify_jwt: false)
- **Input**: \`{ guardianId, conversationHistory }\`
- **Behavior**: Sends conversation to \`google/gemini-2.5-flash-lite\` with extraction prompt asking for family_profile, conditions, history, preferences. Upserts result into \`memory_notes\` under category \`session_extract\`. Appends new extractions to existing content with \`---\` separator.

---

## 9. State Management (Zustand)

Single store with NO persistence (clears on refresh for privacy):

- **Chat**: messages array, isStreaming flag, add/update/clear messages
- **Guardian**: guardianId, guardianPin, guardianName, memoryContext, login/logout
- **Settings**: ageGroup, model (default: gemini-3-flash-preview), emergencyContact
- **Emergency**: showEmergencyAlert, emergencyText, firstAidGuidance, trigger/dismiss

---

## 10. Required Assets

- **Sam avatar image**: \`src/assets/sam-avatar.png\` — a circular avatar photo used on home page (large) and chat header (66px). Must be provided separately.

---

## 11. Key Dependencies

\`\`\`
framer-motion, react-markdown, zustand, react-router-dom, 
lucide-react, @tanstack/react-query, sonner, 
@radix-ui/* (shadcn/ui components), tailwindcss-animate
\`\`\`

---

## 12. Config Notes

- \`supabase/config.toml\` must have \`[functions.chat]\` and \`[functions.save-memory]\` with \`verify_jwt = false\`
- Secrets required: \`LOVABLE_API_KEY\` (auto-provided by Lovable Cloud), \`SUPABASE_SERVICE_ROLE_KEY\` (for save-memory function)
- No authentication system — PIN-based only
- Chat history is session-only (in-memory) — clears on refresh for COPPA/privacy compliance

---

## 13. Build Instructions for Lovable

To rebuild this project, paste this document as the initial prompt and follow these steps in order:

1. **Set up design system**: Apply the color theme (HSL variables), fonts (DM Sans + Playfair Display), and Tailwind config with custom \`warning\`, \`success\`, \`emergency\` colors and \`pulse-gentle\` animation.

2. **Create the Home page** (\`/\`): Disclaimer banner, hero with Sam avatar + pulsing glow, mission statement card, PIN access component (choose/enter/create modes with 6-digit custom code + code name privacy notice), Start Chat + Emergency buttons, 6-category concern grid with expandable items, trust badges.

3. **Create the Chat page** (\`/chat\`): Header with avatar, message bubbles with markdown + severity badges, streaming with buffered character-by-character rendering, typing indicator, empty state text, prefill support from scenario cards, emergency auto-start mode.

4. **Create the Settings page** (\`/settings\`): AI model selector (3 Gemini models), age group selector, emergency contact input, "Coming Soon" grayed section.

5. **Create database tables**: \`guardians\` (id, pin, display_name, timestamps) and \`memory_notes\` (id, guardian_id, category, content, timestamps) with permissive RLS.

6. **Create \`chat\` edge function**: System prompt with full peer mentor persona, privacy/code name reminders, onboarding flow, severity classification, emergency mode prompt. Streams via Lovable AI Gateway.

7. **Create \`save-memory\` edge function**: LLM-powered extraction of family facts from conversation history, upserts into memory_notes.

8. **Wire up state management** (Zustand): Messages, guardian identity, settings, emergency state — all in-memory only.

9. **Wire up safety system**: Client-side keyword detection → emergency overlay. AI severity parsing → badge display. Scope enforcement in system prompt.

10. **Add Sam avatar image** to \`src/assets/sam-avatar.png\`.
`;

const DesignDoc = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const blob = new Blob([designDoc], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "JustAskSam2-DesignDocument.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="font-serif text-3xl font-bold text-foreground">Design Document</h1>
      <p className="text-muted-foreground text-center max-w-md">
        Download the complete Just Ask Sam 2 design document as a Markdown file.
      </p>
      <Button onClick={handleDownload} size="lg" className="gap-2">
        <Download className="w-5 h-5" />
        Download Design Document
      </Button>
      <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Button>
    </div>
  );
};

export default DesignDoc;
