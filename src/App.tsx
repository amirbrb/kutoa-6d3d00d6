
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import RequestHelp from './pages/RequestHelp/RequestHelp';
import UserProfile from './pages/UserProfile/UserProfile';
import NotFound from './pages/NotFound/NotFound';
import Index from './pages/Index/Index';
import EventDetails from './pages/EventDetails/EventDetails';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import './App.css';
import { SystemRoutes } from './modules/routing/routing.types';

import './i18n'; // Import i18n before rendering the app

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={SystemRoutes.Home} element={<Index isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path={SystemRoutes.Login} element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
        <Route path={SystemRoutes.Signup} element={<Signup />} />
        <Route path={SystemRoutes.Dashboard} element={<Dashboard />} />
        <Route path={SystemRoutes.RequestHelp} element={<RequestHelp />} />
        <Route path={SystemRoutes.Profile} element={<UserProfile />} />
        <Route path={SystemRoutes.Events} element={<EventDetails />} />
        <Route path={SystemRoutes.CreateEvent} element={<CreateEvent />} />
        <Route path={SystemRoutes.ChangePassword} element={<ChangePassword />} />
        <Route path={SystemRoutes.NotFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
