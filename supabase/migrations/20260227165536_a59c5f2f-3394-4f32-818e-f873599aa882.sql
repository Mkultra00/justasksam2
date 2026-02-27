
-- Guardians table with PIN-based access
CREATE TABLE public.guardians (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pin TEXT NOT NULL UNIQUE,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Memory notes stored as markdown
CREATE TABLE public.memory_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guardian_id UUID NOT NULL REFERENCES public.guardians(id) ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'general',
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_memory_notes_guardian ON public.memory_notes(guardian_id);
CREATE INDEX idx_guardians_pin ON public.guardians(pin);

-- RLS policies (public access since no auth, secured by PIN)
ALTER TABLE public.guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memory_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to guardians" ON public.guardians FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to memory_notes" ON public.memory_notes FOR ALL USING (true) WITH CHECK (true);
