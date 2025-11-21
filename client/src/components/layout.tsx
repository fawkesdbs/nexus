import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Star, LayoutDashboard, BookOpen, MessageSquare, User, LogOut, Calendar, icons } from "lucide-react";
import { useState, useEffect } from "react";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("/dashboard");

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: BookOpen, label: "Learn a Skill", path: "/learn" },
    { icon: MessageSquare, label: "Feedback", path: "/feedback" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Calendar, label: "Calendar", path: "/calender" },
  ];

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setActiveItem(path);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...");
    navigate("/signin");
  };

  const isActive = (path: string) => activeItem === path;

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-800 text-white flex flex-col border-r border-gray-700">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Nexus
              </h1>
              <p className="text-xs text-gray-400 mt-1">Productivity Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <li key={index}>
                  <button 
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                      active 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-colors ${
                      active ? 'text-white' : 'text-gray-400 group-hover:text-blue-400'
                    }`} />
                    <span className="font-medium">{item.label}</span>
                    {active && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section & Logout */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-700">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="User" 
              className="w-10 h-10 rounded-full border-2 border-gray-600"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Jacob Wilson</p>
              <p className="text-xs text-gray-400 truncate">Senior Data Architect</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-900 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}