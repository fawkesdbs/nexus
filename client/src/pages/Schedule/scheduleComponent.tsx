export default function ScheduleComponent() {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg border border-accent">
      <h3 className="text-lg font-semibold mb-4">Schedule</h3>
      <div className="space-y-3">
        <div className="bg-accent text-accent-foreground p-3 rounded border border-accent">
          <p className="font-medium">Daily Standup</p>
          <p className="text-sm opacity-70">9:00 AM - 9:30 AM</p>
        </div>
        <div className="bg-accent text-accent-foreground p-3 rounded border border-accent">
          <p className="font-medium">Client Meeting</p>
          <p className="text-sm opacity-70">11:00 AM - 12:00 PM</p>
        </div>
        <div className="bg-accent text-accent-foreground p-3 rounded border border-accent">
          <p className="font-medium">Project Review</p>
          <p className="text-sm opacity-70">3:00 PM - 4:30 PM</p>
        </div>
      </div>
    </div>
  );
}