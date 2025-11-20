import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import TaskComponent from "../Tasks/task";
import ScheduleComponent from "../Schedule/scheduleComponent";
import CommsComponent from "../Comminucation/communication";
import ChatbotWindow from "../AI_assistant/AI";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-10 transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Employee Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded font-medium transition shadow-sm"
          >
            Logout
          </button>
        </div>

        <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg border border-accent mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Welcome back, {user?.first_name} {user?.last_name}!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-accent text-accent-foreground p-4 rounded border border-accent">
              <p className="opacity-70 text-sm">Email</p>
              <p className="text-lg font-medium">{user?.email}</p>
            </div>
            <div className="bg-accent text-accent-foreground p-4 rounded border border-accent">
              <p className="opacity-70 text-sm">Phone</p>
              <p className="text-lg font-medium">
                {user?.phone_number || "N/A"}
              </p>
            </div>
            <div className="bg-accent text-accent-foreground p-4 rounded border border-accent">
              <p className="opacity-70 text-sm">Department</p>
              <p className="text-lg font-medium">
                {user?.department || "Not Assigned"}
              </p>
            </div>
            <div className="bg-accent text-accent-foreground p-4 rounded border border-accent">
              <p className="opacity-70 text-sm">Role</p>
              <p className="text-lg font-medium">{user?.role || "Employee"}</p>
            </div>
            <div className="bg-accent text-accent-foreground p-4 rounded border border-accent">
              <p className="opacity-70 text-sm">Member Since</p>
              <p className="text-lg font-medium">
                {new Date(user?.created_at || "").toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskComponent />
          <ScheduleComponent />
          <CommsComponent />
          <ChatbotWindow />
        </div>
      </div>
    </div>
  );
}