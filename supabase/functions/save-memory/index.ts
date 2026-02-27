import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { guardianId, conversationHistory } = await req.json();
    if (!guardianId || !conversationHistory) {
      return new Response(JSON.stringify({ error: "Missing guardianId or conversationHistory" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // Ask the AI to extract memorable facts from the conversation
    const extractionPrompt = `Analyze this conversation between a guardian and a health guidance AI. Extract key persistent facts that should be remembered for future sessions.

Organize into these categories with markdown format:
- **family_profile**: Names, ages, genders of family members
- **conditions**: Known conditions, diagnoses, comorbidities, medications
- **history**: Important past events, incidents, patterns discussed
- **preferences**: Communication preferences, sensitivities, things to avoid

Rules:
- Only extract FACTS, not opinions or advice given
- Be concise — bullet points only
- If a category has no relevant info, omit it
- Merge with any existing memory context provided
- Do NOT include conversation meta-data

Respond with ONLY the markdown content, no preamble.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: extractionPrompt },
          { role: "user", content: JSON.stringify(conversationHistory) },
        ],
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("AI extraction error:", t);
      return new Response(JSON.stringify({ error: "Failed to extract memory" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await response.json();
    const extractedContent = result.choices?.[0]?.message?.content || "";

    if (!extractedContent.trim()) {
      return new Response(JSON.stringify({ saved: false, reason: "No memorable content found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Save to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Upsert the memory note under "session_extract" category
    const { data: existing } = await supabase
      .from("memory_notes")
      .select("id, content")
      .eq("guardian_id", guardianId)
      .eq("category", "session_extract")
      .maybeSingle();

    if (existing) {
      // Merge: append new content
      const merged = existing.content + "\n\n---\n\n" + extractedContent;
      await supabase
        .from("memory_notes")
        .update({ content: merged, updated_at: new Date().toISOString() })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("memory_notes")
        .insert({ guardian_id: guardianId, category: "session_extract", content: extractedContent });
    }

    return new Response(JSON.stringify({ saved: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("save-memory error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
