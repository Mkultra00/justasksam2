import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, MessageCircle, ArrowRight, ChevronDown, AlertTriangle, KeyRound, LogOut } from "lucide-react";
import samAvatar from "@/assets/sam-avatar.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CONCERN_CATEGORIES } from "@/lib/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/lib/store";
import PinAccess from "@/components/PinAccess";

const Index = () => {
  const navigate = useNavigate();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");
  const { guardianId, guardianPin, guardianName, logoutGuardian } = useAppStore();

  const handleScenario = (prompt: string) => {
    // Navigate to chat with pre-filled prompt
    navigate("/chat", { state: { prefill: prompt } });
  };

  const handleStartChat = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Disclaimer Banner */}
      <div className="bg-primary/5 border-b border-primary/10 px-4 py-3">
        <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          <Shield className="inline-block w-4 h-4 mr-1 -mt-0.5 text-primary" />
          Just Ask Sam 2 is for <strong>informational purposes only</strong> and does not provide clinical treatment, medical diagnoses, or establish a patient relationship. Always consult a qualified healthcare professional. If this is an emergency, call <strong>911</strong> or <strong>988</strong> immediately.
        </p>
      </div>

      {/* Hero */}
      <header className="px-4 pt-12 pb-8 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center justify-center gap-4 mb-4">
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              <motion.img
                src={samAvatar}
                alt="Sam avatar"
                className="w-full h-full rounded-full shadow-lg relative z-10 object-cover object-[center_20%]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              {/* Pulsing glow overlay */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 -z-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.15, 1], opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 3 }}
              />
              {/* Wave hand overlay sparkle */}
              <motion.div
                className="absolute -top-1 -right-1 text-2xl z-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.5], rotate: [0, 20, -10, 0] }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
              >
                👋
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-foreground tracking-tight">
              Just Ask Sam 2
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Your calm, trusted guide for supporting your teen or young adult's health, wellness, and life challenges.
            Get guidance — and know when to seek professional help.
          </p>
        </motion.div>
      </header>

      <main className="px-4 pb-16 max-w-3xl mx-auto space-y-10">

        {/* PIN Access Section */}
        {guardianId === null ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <PinAccess />
          </motion.div>
        ) : (
          <>
            {/* Guardian status bar */}
            {guardianPin && (
              <motion.div
                className="flex items-center justify-center gap-3 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <KeyRound className="w-4 h-4 text-primary" />
                <span>Code: <span className="font-mono font-medium text-foreground">{guardianPin}</span></span>
                {guardianName && <span>· {guardianName}</span>}
                <button onClick={logoutGuardian} className="text-muted-foreground hover:text-foreground transition-colors">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}

            {/* Start Chat Button */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button
                  size="lg"
                  onClick={handleStartChat}
                  className="rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-shadow gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Start a Conversation
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="destructive"
                  onClick={() => navigate("/chat", { state: { emergency: true } })}
                  className="rounded-full px-8 py-6 text-base font-bold shadow-lg hover:shadow-xl transition-shadow gap-2 bg-emergency text-emergency-foreground hover:bg-emergency/90"
                >
                  <AlertTriangle className="w-5 h-5" />
                  Emergency
                </Button>
              </div>
            </motion.div>
          </>
        )}

        {/* Concern Categories - only show when guardian is identified */}
        {guardianId !== null && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-xl font-serif font-medium text-foreground mb-1 text-center">
            Common Concerns
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-5">
            Pick a category, then tap a topic to start chatting
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CONCERN_CATEGORIES.map((cat) => (
              <div key={cat.id} className="col-span-1">
                <button
                  onClick={() => setOpenCategory(openCategory === cat.id ? null : cat.id)}
                  className={`w-full flex flex-col items-center gap-2 p-5 rounded-xl border transition-all text-center group
                    ${openCategory === cat.id
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border bg-card hover:bg-primary/5 hover:border-primary/30"
                    }`}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{cat.label}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openCategory === cat.id ? "rotate-180" : ""}`} />
                </button>
              </div>
            ))}
          </div>

          {/* Expanded items */}
          <AnimatePresence mode="wait">
            {openCategory && (
              <motion.div
                key={openCategory}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {CONCERN_CATEGORIES.find((c) => c.id === openCategory)?.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleScenario(item.prompt)}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-primary/5 hover:border-primary/30 transition-all text-left group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </button>
                  ))}
                </div>
                <form
                  className="mt-3 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (customInput.trim()) {
                      const catLabel = CONCERN_CATEGORIES.find((c) => c.id === openCategory)?.label || "";
                      handleScenario(`I have a ${catLabel.toLowerCase()} concern about my teen: ${customInput.trim()}`);
                      setCustomInput("");
                    }
                  }}
                >
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Describe something else…"
                    className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                  <Button type="submit" size="sm" disabled={!customInput.trim()} className="rounded-lg px-4">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
        )}

        {/* Trust Indicators */}
        <motion.section
          className="text-center space-y-3 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="text-xs font-normal gap-1">
              <Shield className="w-3 h-3" /> Safety-First Design
            </Badge>
            <Badge variant="secondary" className="text-xs font-normal gap-1">
              🔒 PIN-Secured Memory
            </Badge>
            <Badge variant="secondary" className="text-xs font-normal gap-1">
              🩺 Evidence-Based Guidance
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            When in doubt, reach out to a professional. Just Ask Sam 2 provides guidance, not diagnoses.
          </p>
        </motion.section>
      </main>
    </div>
  );
};

export default Index;
