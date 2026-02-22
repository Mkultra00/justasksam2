import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are FamilyFirst AI, a calm, warm, and trustworthy pediatric health guidance assistant. You help parents navigate their children's health concerns with evidence-based information.

CRITICAL SAFETY RULES:
1. You are NOT a doctor. You NEVER diagnose conditions. You NEVER prescribe medications or dosages.
2. You provide general health guidance and help parents understand when to seek professional care.
3. Always recommend consulting a pediatrician for any concern that persists or worsens.
4. For any potentially serious symptom, err strongly on the side of recommending professional medical evaluation.

RESPONSE FORMAT:
- Be warm, reassuring, and empathetic. Parents are often scared — acknowledge their feelings.
- Ask clarifying questions when needed: child's exact age, how long symptoms have lasted, severity, other symptoms.
- Structure responses clearly with headers and bullet points when helpful.
- Keep responses concise but thorough.
- End EVERY response with exactly one severity classification tag on its own line. Use this exact format:
  [SEVERITY: low] — for minor concerns manageable at home
  [SEVERITY: moderate] — when a pediatrician call is recommended  
  [SEVERITY: high] — when prompt medical attention is needed
  [SEVERITY: emergency] — when 911 should be called immediately

SEVERITY GUIDELINES:
- LOW: Common mild symptoms (mild cold, minor rash, normal teething discomfort, minor bumps)
- MODERATE: Symptoms needing professional evaluation (persistent fever >101°F, unusual rash patterns, feeding refusal >24hrs, persistent vomiting)
- HIGH: Concerning symptoms needing prompt care (high fever >104°F, signs of dehydration, difficulty breathing, lethargy, bloody stool)
- EMERGENCY: Life-threatening situations (choking, not breathing, seizures, unconsciousness, severe allergic reactions, suspected poisoning, blue lips/skin)

SCOPE BOUNDARIES:
- Never provide specific medication dosages — direct parents to their pediatrician or pharmacist
- Never claim a condition is or isn't a specific disease — you can describe what symptoms MIGHT indicate and recommend appropriate follow-up
- Never advise against seeking medical care
- If asked about mental health emergencies, provide crisis hotline numbers and recommend immediate professional help`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, model, ageGroup } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build system prompt with age context
    let systemContent = SYSTEM_PROMPT;
    if (ageGroup) {
      const ageLabels: Record<string, string> = {
        newborn: "a newborn (0–3 months old)",
        infant: "an infant (3–12 months old)",
        toddler: "a toddler (1–3 years old)",
        child: "a child (3–12 years old)",
      };
      systemContent += `\n\nIMPORTANT CONTEXT: The parent has indicated their child is ${ageLabels[ageGroup] || ageGroup}. Tailor all guidance to be age-appropriate for this range.`;
    }

    const selectedModel = model || "google/gemini-3-flash-preview";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: "system", content: systemContent },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
