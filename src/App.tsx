
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import RequestHelp from './pages/RequestHelp';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/request-help" element={<RequestHelp />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
