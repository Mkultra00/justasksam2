const TypingIndicator = () => (
  <div className="flex justify-start mb-4">
    <div className="bg-card border border-border rounded-2xl rounded-bl-md px-5 py-4">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-primary/40 animate-pulse-gentle" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 rounded-full bg-primary/40 animate-pulse-gentle" style={{ animationDelay: "300ms" }} />
        <span className="w-2 h-2 rounded-full bg-primary/40 animate-pulse-gentle" style={{ animationDelay: "600ms" }} />
      </div>
    </div>
  </div>
);

export default TypingIndicator;
