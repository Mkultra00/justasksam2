import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Shield, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AGE_GROUPS, SCENARIO_CARDS, type AgeGroup } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { ageGroup, setAgeGroup } = useAppStore();
  const navigate = useNavigate();

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
          Just Ask Sam 2 is <strong>not</strong> a substitute for professional medical advice. Always consult your pediatrician.
        </p>
      </div>

      {/* Hero */}
      <header className="px-4 pt-12 pb-8 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-primary fill-primary/20" />
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-foreground tracking-tight">
              Just Ask Sam 2
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Your calm, trusted guide for navigating your child's health concerns. 
            Get gentle guidance — and know when to call the doctor.
          </p>
        </motion.div>
      </header>

      <main className="px-4 pb-16 max-w-3xl mx-auto space-y-10">
        {/* Age Group Selection */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-xl font-serif font-medium text-foreground mb-3 text-center">
            How old is your child?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {AGE_GROUPS.map((ag) => (
              <button
                key={ag.id}
                onClick={() => setAgeGroup(ag.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border-2 transition-all text-sm font-medium
                  ${ageGroup === ag.id
                    ? "border-primary bg-primary/10 text-primary shadow-sm"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5"
                  }`}
              >
                <span className="text-lg">{ag.emoji}</span>
                <span>{ag.label}</span>
                <span className="text-xs text-muted-foreground">({ag.range})</span>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Start Chat Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <Button
            size="lg"
            onClick={handleStartChat}
            className="rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-shadow gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Start a Conversation
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Scenario Cards */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-xl font-serif font-medium text-foreground mb-1 text-center">
            Common Concerns
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Tap a topic to start chatting about it
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SCENARIO_CARDS.map((card) => (
              <button
                key={card.id}
                onClick={() => handleScenario(card.prompt)}
                className="flex flex-col items-center gap-2 p-5 rounded-xl border border-border bg-card hover:bg-primary/5 hover:border-primary/30 transition-all text-center group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{card.emoji}</span>
                <span className="text-sm font-medium text-foreground">{card.label}</span>
              </button>
            ))}
          </div>
        </motion.section>

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
              🔒 No Data Stored
            </Badge>
            <Badge variant="secondary" className="text-xs font-normal gap-1">
              🩺 Evidence-Based Guidance
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            When in doubt, always call your doctor. Just Ask Sam 2 provides guidance, not diagnoses.
          </p>
        </motion.section>
      </main>
    </div>
  );
};

export default Index;
