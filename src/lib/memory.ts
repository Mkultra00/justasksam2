import { supabase } from "@/integrations/supabase/client";

export interface Guardian {
  id: string;
  pin: string;
  display_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface MemoryNote {
  id: string;
  guardian_id: string;
  category: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// Generate a random 6-digit PIN
export function generatePin(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Look up guardian by PIN
export async function findGuardianByPin(pin: string): Promise<Guardian | null> {
  const { data, error } = await supabase
    .from("guardians")
    .select("*")
    .eq("pin", pin)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// Create a new guardian with a unique PIN
export async function createGuardian(displayName?: string): Promise<Guardian> {
  let pin = generatePin();
  let attempts = 0;
  while (attempts < 10) {
    const { data, error } = await supabase
      .from("guardians")
      .insert({ pin, display_name: displayName || null })
      .select()
      .single();
    if (!error && data) return data;
    if (error && error.code === "23505") {
      // duplicate PIN, try another
      pin = generatePin();
      attempts++;
      continue;
    }
    if (error) throw error;
  }
  throw new Error("Could not generate unique PIN");
}

// Get all memory notes for a guardian as markdown context
export async function getMemoryContext(guardianId: string): Promise<string> {
  const { data, error } = await supabase
    .from("memory_notes")
    .select("*")
    .eq("guardian_id", guardianId)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  if (!data || data.length === 0) return "";

  return data
    .map((note) => `## ${note.category}\n${note.content}`)
    .join("\n\n");
}

// Save or update a memory note for a category
export async function saveMemoryNote(
  guardianId: string,
  category: string,
  content: string
): Promise<void> {
  // Check if note exists for this category
  const { data: existing } = await supabase
    .from("memory_notes")
    .select("id")
    .eq("guardian_id", guardianId)
    .eq("category", category)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("memory_notes")
      .update({ content, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
  } else {
    await supabase
      .from("memory_notes")
      .insert({ guardian_id: guardianId, category, content });
  }
}
