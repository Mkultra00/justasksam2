

# FamilyFirst AI — MVP Plan (Phases 1–3)

## Overview
A calming, trustworthy AI-powered parenting assistant that helps parents navigate child health concerns. The app prioritizes **safety first** with a 3-tier detection system and presents a warm, clinical aesthetic to reassure nervous parents. No login required for MVP — just open and chat.

---

## Phase 1: Welcome Experience & Design System

### Welcome Screen
- Calming hero section with soft blues/greens and clean medical-inspired typography
- Clear **disclaimer banner**: "FamilyFirst AI is not a substitute for professional medical advice. Always consult your pediatrician."
- Age-group quick-select chips (Newborn, Infant, Toddler, Child) to set context before chatting
- **Scenario cards** for common concerns: Fever, Rashes, Sleep Issues, Feeding, Teething — tapping a card pre-fills the chat

### Design System
- Warm & clinical palette: soft teal/sage primary, cream backgrounds, clean sans-serif fonts
- Trust indicators throughout (medical disclaimer footer, "When in doubt, call your doctor" reminders)
- Gentle micro-animations and rounded cards to feel approachable, not intimidating

---

## Phase 2: AI Chat with Safety Architecture

### Chat Interface
- Clean message bubbles with markdown rendering for structured AI responses
- Typing indicator with a calming animation
- Streaming responses (token-by-token) via Lovable AI Gateway using Gemini models
- Suggested follow-up questions after each AI response
- Persistent disclaimer at the bottom of the chat: "This is AI guidance, not medical advice"

### 3-Tier Safety System
1. **Keyword Detection (Client-side)**: Instant scan of user messages for emergency terms (choking, not breathing, seizure, unconscious, blue lips, etc.) — triggers immediate 911 alert before AI even responds
2. **AI Severity Analysis**: System prompt instructs the AI to classify every response with severity metadata (low/moderate/high/emergency) and return structured referral data
3. **Scope Enforcement**: AI is instructed never to diagnose, prescribe medication, or replace a doctor — only to inform and guide when to seek care

### Emergency Response
- **Full-screen emergency alert** when critical keywords or AI severity = emergency is detected
- Large red **"Call 911"** button front and center
- Brief, clear first-aid guidance steps (e.g., infant choking: back blows instructions)
- Poison Control number (1-800-222-1222) when relevant
- User must acknowledge before returning to chat (banner persists)

### AI Behavior
- Every AI response ends with a care-level recommendation (green: home care / yellow: call pediatrician / red: seek emergency care)
- Color-coded severity badges on responses
- AI proactively asks clarifying questions (child's age, duration, other symptoms) before giving guidance
- Responses are warm, reassuring, and structured — never alarming unless truly urgent

---

## Phase 3: Parenting Knowledge Base & Guidance

### Quick Reference Cards
- Tappable cards for common topics: Fever Guide by Age, When to Call the Doctor, Infant CPR basics, Medication Dosing Charts (OTC, weight-based)
- Cards open as expandable panels within the app (no navigation away from chat)

### Contextual Tips
- After a chat about a topic (e.g., fever), the AI suggests relevant knowledge base cards
- Age-appropriate guidance: content adapts based on the age group selected at the start

### Developmental Milestones
- Simple milestone checklist by age range
- "Is this normal?" quick checks that feed into the AI chat for deeper guidance

---

## Settings Page (Foundation for Future Phases)

- **AI Model selector**: Let users choose between available Gemini models (Flash for speed, Pro for depth)
- **Child's age group**: Set default age context for all chats
- **Emergency contact info**: Optional — for display on emergency screens
- Placeholder sections (grayed out) for future features: Account & Profiles, Voice Mode, Image Assessment — visible but labeled "Coming Soon" to show the product roadmap

---

## Technical Approach
- **Frontend only for MVP** (no authentication, no database) — fast and simple
- **Lovable Cloud** with Edge Function for secure AI calls via Lovable AI Gateway (Gemini models)
- Chat history stored in-memory (session only — clears on refresh for privacy, which also addresses COPPA concerns since nothing is stored)
- Safety keyword list maintained as a client-side constant for instant detection
- System prompt stored in the Edge Function with detailed safety instructions, severity classification rules, and scope boundaries

---

## What's Deferred (Future Phases)
- 🔒 User accounts & child profiles (Phase 4)
- 🖼️ Photo/image assessment (Phase 5)
- 🎙️ Voice interaction (Phase 5)
- 💳 Stripe payments & subscriptions (Phase 6)
- 📄 PDF export of chat summaries (Phase 6)
- 🌐 Multi-language support (Phase 7)

