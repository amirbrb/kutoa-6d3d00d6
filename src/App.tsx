
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import RequestHelp from "./pages/RequestHelp";
import UserProfile from "./pages/UserProfile";
import EventDetails from "./pages/EventDetails";
import NotFound from "./pages/NotFound";
import NavigationBar from "./components/NavigationBar";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";

// AuthCheck component for protected routes
const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    // Loading state
    return <div className="min-h-screen flex items-center justify-center">
      <div className="spinner"></div>
    </div>;
  }

  return <>{children}</>;
};

// Main App component with routing
const AppContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  return (
    <>
      <NavigationBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Index isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
          <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <AuthCheck>
              <Dashboard />
            </AuthCheck>
          } />
          <Route path="/events/:id" element={
            <AuthCheck>
              <EventDetails />
            </AuthCheck>
          } />
          <Route path="/request-help" element={
            <AuthCheck>
              <RequestHelp />
            </AuthCheck>
          } />
          <Route path="/profile" element={
            <AuthCheck>
              <UserProfile />
            </AuthCheck>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      
      <Toaster />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
