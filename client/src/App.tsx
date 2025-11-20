import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import { useAuth } from "./contexts/AuthContext";
import { AuthProvider } from "./contexts/AuthProvider";
import Landing from './pages/Landing/landing';
import Layout from './components/layout';
import Learn from './pages/learn/Learn';
import Feedback from './pages/Feedback/feedback';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import SignInPage from './pages/SignIn/Signin';
import Register from './pages/Register/register';
import { ThemeToggle } from "./components/ThemeToggle";

// Helper component to protect routes
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background text-foreground">
        Loading...
      </div>
    );

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <div className="relative min-h-screen w-full bg-background transition-colors">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/register" element={<Register />} />

            {/* <Route element={<Layout/>}>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path="/learn" element={<ProtectedRoute><Learn/></ProtectedRoute>} />
            <Route path="/feedback" element={<ProtectedRoute><Feedback/></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
            </Route> */}


            <Route element={<Layout/>}>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/learn" element={<Learn/>} />
            <Route path="/feedback" element={<Feedback/>} />
            <Route path="/profile" element={<Profile/>} />
            </Route>


            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
        </Router>

        {/* Theme Toggle positioned in the bottom right */}
        <div className="fixed bottom-6 right-6 z-50">
          <ThemeToggle />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
