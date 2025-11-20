export default function CommsComponent() {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg border border-accent">
      <h3 className="text-lg font-semibold mb-4">Communication</h3>
      <div className="space-y-3">
        <div className="bg-accent text-accent-foreground p-3 rounded border border-accent">
          <p className="font-medium">Team Updates</p>
          <p className="text-sm opacity-70">5 new messages</p>
        </div>
        <div className="bg-accent text-accent-foreground p-3 rounded border border-accent">
          <p className="font-medium">Announcements</p>
          <p className="text-sm opacity-70">Company event next week</p>
        </div>
        <div className="bg-accent text-accent-foreground p-3 rounded border border-accent">
          <p className="font-medium">Direct Messages</p>
          <p className="text-sm opacity-70">3 unread</p>
        </div>
      </div>
    </div>
  );
}