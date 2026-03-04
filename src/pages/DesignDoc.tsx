import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from "docx";
import { saveAs } from "file-saver";

const DesignDoc = () => {
  const navigate = useNavigate();

  const handleDownload = async () => {
    const doc = new Document({
      styles: {
        default: {
          document: {
            run: { font: "Calibri", size: 22 },
          },
        },
      },
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun({ text: "Just Ask Sam 2", bold: true, size: 48, font: "Georgia" })],
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [new TextRun({ text: "Complete Design Document for Lovable Rebuild", size: 28, color: "666666" })],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),

            // 1. Product Overview
            h1("1. Product Overview"),
            p("Just Ask Sam 2 is an AI-powered peer mentoring companion for parents and guardians of teens (12–19) and young adults (21–30). It helps families navigate depression, anxiety, substance abuse, technology addiction, gender identity, and other emotional health challenges. The AI persona (\"Sam\") speaks as a wise friend with lived experience — NOT a clinician."),
            p("Inspired by Isleworth Private Client Services and their \"Power of the Peer\" philosophy."),
            p("Live URL: justasksam2.lovable.app"),

            // 2. Tech Stack
            h1("2. Tech Stack"),
            bullet("Frontend: React 18 + TypeScript + Vite + Tailwind CSS"),
            bullet("State Management: Zustand (in-memory, no persistence to localStorage)"),
            bullet("Routing: react-router-dom v6 (3 routes: /, /chat, /settings)"),
            bullet("UI Components: shadcn/ui (Radix primitives), Framer Motion for animations"),
            bullet("Markdown Rendering: react-markdown"),
            bullet("Backend: Lovable Cloud (Supabase) — 2 Edge Functions + 2 database tables"),
            bullet("AI: Lovable AI Gateway (Gemini models) — streaming SSE responses"),
            bullet("Fonts: Google Fonts — DM Sans (body), Playfair Display (headings)"),

            // 3. Design System
            h1("3. Design System & Theme"),
            h2("Color Palette (HSL CSS Variables)"),
            p("Light mode:"),
            bullet("Background: 270 15% 97% (soft lavender-white)"),
            bullet("Primary: 270 40% 30% (deep purple) / Primary foreground: 45 90% 65% (warm gold)"),
            bullet("Secondary: 45 80% 92% (warm cream)"),
            bullet("Warning: 38 92% 50% (amber)"),
            bullet("Success: 152 55% 40% (teal-green)"),
            bullet("Emergency: 0 72% 51% (red)"),
            p("Dark mode:"),
            bullet("Background: 270 25% 7%"),
            bullet("Primary: 45 85% 60% (gold) / Primary foreground: 270 40% 12%"),
            bullet("Emergency stays red in both modes"),
            h2("Typography"),
            bullet("Body: DM Sans (Google Fonts), sans-serif"),
            bullet("Headings (h1–h6): Playfair Display, serif"),
            h2("Custom Tailwind Extensions"),
            bullet("Custom colors: warning, success, emergency (each with DEFAULT + foreground)"),
            bullet("Custom animation: pulse-gentle — gentle opacity pulse for typing indicator dots"),
            bullet("Border radius: 0.75rem base"),

            // 4. Pages & Routes
            h1("4. Pages & Routes"),
            h2("4.1 Home Page (/)"),
            p("Components: Disclaimer banner, Hero with Sam avatar, Mission statement, PIN Access, Start Chat + Emergency buttons, Concern Categories grid, Trust indicators."),
            p("Disclaimer banner (top of page): \"Just Ask Sam 2 is for informational purposes only and does not provide clinical treatment, medical diagnoses, or establish a patient relationship. Always consult a qualified healthcare professional. If this is an emergency, call 911 or 988 immediately.\""),
            p("Hero section: Large circular Sam avatar (224px mobile, 288px desktop) with pulsing glow animation and wave emoji. Title: \"Just Ask Sam 2\". Subtitle: \"Your calm, trusted guide for supporting your teen or young adult's emotional health, wellness, and life challenges.\""),
            p("Mission statement card: \"We support families with teens and young adults navigating depression, anxiety, substance abuse, technology addiction, gender identity, and other life challenges. Our mission is to improve social and emotional health through the Power of the Peer — combining lived experience with evidence-based guidance so no family feels alone.\" Footer: \"Inspired by Isleworth Private Client Services\" (linked)"),
            p("PIN Access section (before chat buttons): 3-mode flow: choose → enter (returning user) or create (new user). User picks their own 6-digit numeric code. Creation checks for duplicate codes. \"Continue without saving memory\" option (sets guardianId to null). Privacy note on create screen: \"For privacy, use code names (not real names) for your children and family members.\""),
            p("After PIN authenticated: Guardian status bar showing PIN and optional display name + logout button. Two buttons: \"Start a Conversation\" (primary) and \"Emergency\" (red, destructive)."),
            p("Concern Categories (6 categories, shown in 2×3 grid):"),
            bullet("Mental Health — Anxiety & Stress, Low Mood & Depression, Burnout, Self-Esteem & Identity, Stress-Related Physical Symptoms, Eating & Body Image"),
            bullet("Relationships — Family Conflict, Friendships, Romantic Relationships, Loneliness & Isolation"),
            bullet("Lifestyle & Habits — Sleep Problems, Nutrition & Diet, Exercise & Fitness, Substance Use, Technology Addiction"),
            bullet("School & Career — Academic Pressure, Career Uncertainty, Focus & Motivation, Financial Literacy"),
            bullet("Identity & Growth — Gender Identity, Sexual Orientation, Cultural Identity, Finding Their Path"),
            bullet("Safety & Crisis — Self-Harm Concerns, Abuse & Unsafe Situations, Online Safety, Crisis Resources"),
            p("Each category expands to show items + custom text input. Tapping an item navigates to /chat with a pre-filled prompt."),
            p("Trust indicators (bottom): Badges: \"Safety-First Design\", \"PIN-Secured Memory\", \"Evidence-Based Guidance\". Footer text: \"When in doubt, reach out to a professional.\""),

            h2("4.2 Chat Page (/chat)"),
            p("Header: Back arrow, Sam avatar (66px) + \"Just Ask Sam 2\" title (clickable, returns home), Clear chat + Settings buttons."),
            p("Empty state text: \"Tell me what's going on. Is this something urgent right now, or are you hoping to start building a plan?\" \"If there's no immediate crisis, let me learn about your family first — it helps me give better guidance over time.\" \"Remember to use code names for your family members, not real names.\""),
            p("Message bubbles: User messages use primary background. Assistant messages use card background with border. Assistant messages display severity badge parsed from [SEVERITY: xxx] tag. Markdown rendered via react-markdown. Severity tag stripped from displayed content."),
            p("Chat input: Auto-expanding textarea (max 120px height). Disclaimer above input: \"AI guidance trained as a non-clinical lived experience peer — not medical advice.\" Enter sends, Shift+Enter for newline. Supports prefill from scenario cards."),
            p("Streaming: SSE streaming from edge function. Buffered rendering: characters rendered 1–3 at a time every 18ms for readable pace. Typing indicator (3 pulsing dots) shown during streaming."),
            p("Emergency mode: Triggered via Emergency button on home page OR keyword detection. Auto-starts with: \"I'm here to help. Stay calm. Tell me what's going on — what happened?\" Uses separate EMERGENCY_SYSTEM_PROMPT (short bullets, under 150 words)."),
            p("Memory save on exit: When component unmounts, fires save-memory edge function with conversation history. Uses refs to avoid re-running effect on every message update. Only fires if guardianId exists and messages.length >= 2."),

            h2("4.3 Settings Page (/settings)"),
            bullet("AI Model selector: 3 options — Gemini Flash (default), Gemini 2.5 Flash, Gemini Pro"),
            bullet("Default Age Group: Young Teen (12–14), Older Teen (15–19), Young Adult (21–25), Late Twenties (26–30)"),
            bullet("Emergency Contact: Optional text input"),
            bullet("Coming Soon (grayed out): Account & Profiles, Voice Mode, Image Assessment, Multi-Language"),

            // 5. Safety Architecture
            h1("5. Safety Architecture (3-Tier System)"),
            h2("Tier 1: Client-side keyword detection"),
            p("Instant scan of user messages for emergency terms. Triggers full-screen emergency overlay BEFORE AI responds."),
            p("Emergency keywords: choking, not breathing, can't breathe, stopped breathing, seizure, convulsion, unconscious, unresponsive, blue lips, turning blue, blue skin, cyanosis, limp, floppy, won't wake up, not waking up, swallowed poison, ingested, drank bleach, ate pills, severe bleeding, won't stop bleeding, head injury, drowning, drowned, near drowning, allergic reaction, anaphylaxis, swelling throat, can't swallow, burn, scalded, electrocuted, fell from height, broken bone, bone sticking out, meningitis, stiff neck, bulging fontanelle, suicidal, self harm, wants to die."),
            p("First-aid guidance (context-specific): Choking → back blows/Heimlich. Not breathing → CPR. Seizure → side position. Poison → don't induce vomiting, call Poison Control. Burns → cool water. Allergic → EpiPen + 911."),
            h2("Tier 2: AI severity classification"),
            p("Every AI response ends with [SEVERITY: low|moderate|high|emergency]. Parsed client-side, displayed as colored badge. If emergency, triggers overlay."),
            h2("Tier 3: Scope enforcement via system prompt"),
            p("AI never diagnoses, prescribes medication, or replaces professionals."),
            h2("Emergency overlay"),
            bullet("Full-screen red overlay (z-50)"),
            bullet("\"Call 911\" button (tel: link)"),
            bullet("\"Poison Control: 1-800-222-1222\" button"),
            bullet("Context-specific first-aid guidance box"),
            bullet("\"I understand — return to chat\" dismiss button"),
            h2("Severity labels"),
            bullet("Low → \"Home Care\" — \"This can likely be managed at home. Monitor symptoms.\""),
            bullet("Moderate → \"Call your child's Clinician and/or 988 and/or 911\" — \"Consider calling your child's clinician for guidance.\""),
            bullet("High → \"Seek Care Now\" — \"Please seek medical attention promptly.\""),
            bullet("Emergency → \"Emergency — Call 911\" — \"This may be a medical emergency. Call 911 immediately.\""),

            // 6. AI System Prompts
            h1("6. AI System Prompts"),
            h2("Main System Prompt"),
            p("The AI persona is \"Just Ask Sam 2\" — a calm, warm peer mentor (NOT a clinician). Key behaviors:"),
            bullet("Privacy: Reminds new users to use CODE NAMES for family members"),
            bullet("Onboarding (new users): Asks about family — how many kids, ages, conditions/diagnoses, family dynamics"),
            bullet("Returning users: Acknowledges memory, asks what's changed"),
            bullet("Context gathering: Age, gender (inclusive language), conditions/comorbidities, family dynamics, current interventions"),
            bullet("Tone: \"wise friend\" — warm, real, relatable"),
            bullet("First aid guidance: Provides actionable steps for urgent situations"),
            bullet("Crisis resources: Always provides 988 Lifeline, Crisis Text Line (text HOME to 741741)"),
            bullet("Response format: Structured with bullets, ends with [SEVERITY: xxx] tag"),
            bullet("Scope: Never diagnoses, never prescribes medication dosages, never advises against seeking care"),
            h2("Emergency System Prompt"),
            p("Short-format crisis mode. Bullet points only, under 150 words. Starts with most critical action. Includes 911, 988, Poison Control, Crisis Text Line. Always [SEVERITY: emergency]."),

            // 7. Database Schema
            h1("7. Database Schema"),
            h2("Table: guardians"),
            bullet("id — uuid (PK), default: gen_random_uuid()"),
            bullet("pin — text, not nullable"),
            bullet("display_name — text, nullable"),
            bullet("created_at — timestamptz, default: now()"),
            bullet("updated_at — timestamptz, default: now()"),
            p("RLS: Allow all access (no auth required — PIN-based system)."),
            h2("Table: memory_notes"),
            bullet("id — uuid (PK), default: gen_random_uuid()"),
            bullet("guardian_id — uuid (FK → guardians), not nullable"),
            bullet("category — text, default: 'general'"),
            bullet("content — text, not nullable"),
            bullet("created_at — timestamptz, default: now()"),
            bullet("updated_at — timestamptz, default: now()"),
            p("RLS: Allow all access."),

            // 8. Edge Functions
            h1("8. Edge Functions"),
            h2("chat (verify_jwt: false)"),
            bullet("Input: { messages, model, emergencyMode, memoryContext }"),
            bullet("Behavior: Prepends system prompt (+ memory context if available), calls Lovable AI Gateway with streaming enabled, proxies SSE response"),
            bullet("Model default: google/gemini-3-flash-preview"),
            bullet("Error handling: 429 → rate limit message, 402 → usage limit message"),
            h2("save-memory (verify_jwt: false)"),
            bullet("Input: { guardianId, conversationHistory }"),
            bullet("Behavior: Sends conversation to google/gemini-2.5-flash-lite with extraction prompt. Upserts result into memory_notes under category session_extract. Appends new extractions to existing content with --- separator."),

            // 9. State Management
            h1("9. State Management (Zustand)"),
            p("Single store with NO persistence (clears on refresh for privacy):"),
            bullet("Chat: messages array, isStreaming flag, add/update/clear messages"),
            bullet("Guardian: guardianId, guardianPin, guardianName, memoryContext, login/logout"),
            bullet("Settings: ageGroup, model (default: gemini-3-flash-preview), emergencyContact"),
            bullet("Emergency: showEmergencyAlert, emergencyText, firstAidGuidance, trigger/dismiss"),

            // 10. Required Assets
            h1("10. Required Assets"),
            p("Sam avatar image: src/assets/sam-avatar.png — a circular avatar photo used on home page (large) and chat header (66px). Must be provided separately."),

            // 11. Key Dependencies
            h1("11. Key Dependencies"),
            p("framer-motion, react-markdown, zustand, react-router-dom, lucide-react, @tanstack/react-query, sonner, @radix-ui/* (shadcn/ui components), tailwindcss-animate"),

            // 12. Config Notes
            h1("12. Config Notes"),
            bullet("supabase/config.toml must have [functions.chat] and [functions.save-memory] with verify_jwt = false"),
            bullet("Secrets required: LOVABLE_API_KEY (auto-provided by Lovable Cloud), SUPABASE_SERVICE_ROLE_KEY (for save-memory function)"),
            bullet("No authentication system — PIN-based only"),
            bullet("Chat history is session-only (in-memory) — clears on refresh for COPPA/privacy compliance"),

            // 13. Build Instructions
            h1("13. Build Instructions for Lovable"),
            p("To rebuild this project, paste this document as the initial prompt and follow these steps in order:"),
            bullet("1. Set up design system: Apply the color theme, fonts, and Tailwind config"),
            bullet("2. Create the Home page (/): Disclaimer banner, hero, mission statement, PIN access, concern grid, trust badges"),
            bullet("3. Create the Chat page (/chat): Header, message bubbles, streaming, typing indicator, emergency mode"),
            bullet("4. Create the Settings page (/settings): AI model selector, age group, emergency contact, Coming Soon section"),
            bullet("5. Create database tables: guardians and memory_notes with permissive RLS"),
            bullet("6. Create chat edge function: System prompt, streaming via Lovable AI Gateway"),
            bullet("7. Create save-memory edge function: LLM-powered extraction, upserts into memory_notes"),
            bullet("8. Wire up state management (Zustand): All in-memory only"),
            bullet("9. Wire up safety system: Keyword detection, severity parsing, scope enforcement"),
            bullet("10. Add Sam avatar image to src/assets/sam-avatar.png"),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "JustAskSam2-DesignDocument.docx");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="font-serif text-3xl font-bold text-foreground">Design Document</h1>
      <p className="text-muted-foreground text-center max-w-md">
        Download the complete Just Ask Sam 2 design document as a Word (.docx) file.
      </p>
      <Button onClick={handleDownload} size="lg" className="gap-2">
        <Download className="w-5 h-5" />
        Download Design Document (.docx)
      </Button>
      <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Button>
    </div>
  );
};

// Helper functions for creating docx paragraphs
function h1(text: string) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 32, font: "Georgia" })],
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
  });
}

function h2(text: string) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 26, font: "Georgia" })],
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
  });
}

function p(text: string) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22 })],
    spacing: { after: 120 },
  });
}

function bullet(text: string) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22 })],
    bullet: { level: 0 },
    spacing: { after: 60 },
  });
}

export default DesignDoc;
