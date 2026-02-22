import { AlertTriangle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";

const EmergencyAlert = () => {
  const { showEmergencyAlert, emergencyText, firstAidGuidance, dismissEmergency } = useAppStore();

  if (!showEmergencyAlert) return null;

  return (
    <div className="fixed inset-0 z-50 bg-emergency/95 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-6 max-w-md w-full space-y-5 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emergency rounded-full p-2">
              <AlertTriangle className="w-6 h-6 text-emergency-foreground" />
            </div>
            <h2 className="text-xl font-serif font-bold text-foreground">Emergency Detected</h2>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Based on what you described, this may require immediate emergency attention.
        </p>

        {/* Call 911 */}
        <a
          href="tel:911"
          className="flex items-center justify-center gap-3 w-full bg-emergency text-emergency-foreground rounded-xl py-4 text-lg font-bold hover:bg-emergency/90 transition-colors"
        >
          <Phone className="w-6 h-6" />
          Call 911
        </a>

        {/* Poison Control */}
        <a
          href="tel:1-800-222-1222"
          className="flex items-center justify-center gap-2 w-full border-2 border-emergency text-emergency rounded-xl py-3 text-base font-semibold hover:bg-emergency/5 transition-colors"
        >
          <Phone className="w-5 h-5" />
          Poison Control: 1-800-222-1222
        </a>

        {/* First Aid Guidance */}
        {firstAidGuidance && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <h3 className="text-sm font-bold text-warning mb-1">While waiting for help:</h3>
            <p className="text-sm text-foreground">{firstAidGuidance}</p>
          </div>
        )}

        <Button
          variant="ghost"
          className="w-full text-muted-foreground"
          onClick={dismissEmergency}
        >
          I understand — return to chat
        </Button>
      </div>
    </div>
  );
};

export default EmergencyAlert;
