export default function TaskComponent() {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg border border-accent">
      <h3 className="text-lg font-semibold mb-4">Tasks</h3>
      <div className="space-y-3">
        <div className="bg-accent text-accent-foreground p-3 rounded border border-accent">
          <p className="font-medium">Complete project report</p>
          <p className="text-sm opacity-70">Due: Tomorrow</p>
        </div>
        <div className="bg-accent text-accent-foreground p-3 rounded border border-accent">
          <p className="font-medium">Team meeting</p>
          <p className="text-sm opacity-70">Due: Today 2:00 PM</p>
        </div>
        <div className="bg-accent text-accent-foreground p-3 rounded border border-accent">
          <p className="font-medium">Review quarterly goals</p>
          <p className="text-sm opacity-70">Due: End of week</p>
        </div>
      </div>
    </div>
  );
}