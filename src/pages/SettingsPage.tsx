import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AGE_GROUPS, GEMINI_MODELS } from "@/lib/constants";
import { useAppStore } from "@/lib/store";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { ageGroup, setAgeGroup, model, setModel, emergencyContact, setEmergencyContact } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-serif font-semibold">Settings</h1>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* AI Model */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">AI Model</CardTitle>
            <CardDescription>Choose the AI model for your conversations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {GEMINI_MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => setModel(m.id)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  model === m.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div className="font-medium text-sm text-foreground">{m.label}</div>
                <div className="text-xs text-muted-foreground">{m.description}</div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Age Group */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Default Age Group</CardTitle>
            <CardDescription>Set context for all conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {AGE_GROUPS.map((ag) => (
                <button
                  key={ag.id}
                  onClick={() => setAgeGroup(ag.id)}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                    ageGroup === ag.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  {ag.emoji} {ag.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Emergency Contact</CardTitle>
            <CardDescription>Shown on emergency screens (optional)</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="e.g., Dr. Smith — (555) 123-4567"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Coming Soon */}
        <Card className="opacity-60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              Coming Soon <Lock className="w-4 h-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {["Account & Profiles", "Voice Mode", "Image Assessment", "Multi-Language"].map((f) => (
              <div key={f} className="flex items-center justify-between p-2">
                <span className="text-sm text-muted-foreground">{f}</span>
                <Badge variant="secondary" className="text-[10px]">Coming Soon</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
