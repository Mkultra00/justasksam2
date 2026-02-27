import { useState } from "react";
import { KeyRound, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { findGuardianByPin, createGuardian } from "@/lib/memory";
import { useAppStore } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

const PinAccess = () => {
  const [mode, setMode] = useState<"choose" | "enter" | "creating">("choose");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const { setGuardian } = useAppStore();

  const handleLogin = async () => {
    if (pin.length !== 6) {
      toast({ title: "Please enter a 6-digit access code", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const guardian = await findGuardianByPin(pin);
      if (!guardian) {
        toast({ title: "Access code not found", description: "Please check your code and try again.", variant: "destructive" });
        return;
      }
      setGuardian(guardian.id, guardian.pin, guardian.display_name);
      toast({ title: `Welcome back${guardian.display_name ? `, ${guardian.display_name}` : ""}!` });
    } catch {
      toast({ title: "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const guardian = await createGuardian();
      setGuardian(guardian.id, guardian.pin, guardian.display_name);
      toast({
        title: "Your access code",
        description: `Your code is ${guardian.pin} — save it somewhere safe! You'll need it to access your saved context.`,
        duration: 15000,
      });
    } catch {
      toast({ title: "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (mode === "choose") {
    return (
      <div className="flex flex-col items-center gap-4 py-6 px-4 max-w-sm mx-auto">
        <KeyRound className="w-10 h-10 text-primary" />
        <p className="text-sm text-muted-foreground text-center">
          Use an access code so Sam can remember your family's context between sessions.
        </p>
        <div className="flex flex-col gap-2 w-full">
          <Button onClick={() => setMode("enter")} variant="default" className="gap-2 w-full">
            <ArrowRight className="w-4 h-4" />
            I have a code
          </Button>
          <Button onClick={() => { setMode("creating"); handleCreate(); }} variant="outline" className="gap-2 w-full">
            <Plus className="w-4 h-4" />
            Create new code
          </Button>
          <button
            onClick={() => setGuardian(null, null, null)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-2"
          >
            Continue without saving memory
          </button>
        </div>
      </div>
    );
  }

  if (mode === "enter") {
    return (
      <div className="flex flex-col items-center gap-4 py-6 px-4 max-w-sm mx-auto">
        <KeyRound className="w-10 h-10 text-primary" />
        <p className="text-sm text-muted-foreground text-center">Enter your 6-digit access code</p>
        <form
          onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
          className="flex gap-2 w-full"
        >
          <Input
            type="text"
            inputMode="numeric"
            maxLength={6}
            pattern="[0-9]*"
            placeholder="000000"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="text-center text-2xl tracking-[0.5em] font-mono"
            autoFocus
          />
          <Button type="submit" disabled={pin.length !== 6 || loading}>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
        <button
          onClick={() => setMode("choose")}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Back
        </button>
      </div>
    );
  }

  // Creating state
  return (
    <div className="flex flex-col items-center gap-4 py-6 px-4 max-w-sm mx-auto">
      <div className="animate-pulse-gentle text-muted-foreground text-sm">Creating your access code…</div>
    </div>
  );
};

export default PinAccess;
