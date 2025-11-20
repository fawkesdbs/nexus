export default function ChatbotWindow() {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg border border-accent">
      <h3 className="text-lg font-semibold mb-4">AI Assistant</h3>
      <div className="bg-accent text-accent-foreground p-4 rounded border border-accent mb-4">
        <p className="text-sm">Hello! How can I help you today?</p>
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-background border border-accent rounded px-3 py-2 text-sm"
        />
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-medium">
          Send
        </button>
      </div>
    </div>
  );
}