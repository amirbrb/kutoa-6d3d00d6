
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import NavigationBar from '../components/NavigationBar';
import { useToast } from '../components/ui/use-toast';

interface Event {
  id: string;
  title: string;
  location: string;
  distance: string;
  createdBy: string;
  time: Date;
  participants: number;
  type: 'medical' | 'donation' | 'volunteer' | 'other';
  description?: string;
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));

    // Simulate fetching event data
    setTimeout(() => {
      const mockEvent: Event = {
        id: id || '',
        title: 'Community Blood Drive',
        location: 'Anytown Community Center',
        distance: '0.5 miles away',
        createdBy: 'Sarah Johnson',
        time: new Date(Date.now() + 2 * 24 * 60 * 60000),
        participants: 15,
        type: 'medical',
        description: 'Join us for this important community blood drive. We need all blood types, especially O negative. Refreshments will be provided for all donors. Please bring ID and wear comfortable clothing. The whole process takes about an hour, and you'll be helping to save lives in our community.'
      };
      setEvent(mockEvent);
      setIsLoading(false);
    }, 1000);
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
  };

  const handleJoinEvent = () => {
    setIsJoined(!isJoined);
    toast({
      title: isJoined ? "Left event" : "Joined event",
      description: isJoined 
        ? "You have left this community event" 
        : "You have successfully joined this community event",
    });
  };

  const formatEventDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getEventTypeClass = (type: string) => {
    switch (type) {
      case 'medical':
        return 'bg-red-100 text-red-800';
      case 'donation':
        return 'bg-blue-100 text-blue-800';
      case 'volunteer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationBar isLoggedIn={true} onLogout={handleLogout} />
        <div className="container mx-auto py-10 px-4 max-w-4xl">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-3 text-lg">Loading event details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationBar isLoggedIn={true} onLogout={handleLogout} />
        <div className="container mx-auto py-10 px-4 max-w-4xl">
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
            <p className="text-gray-600 mb-4">The event you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/dashboard')}>
              <ArrowLeft size={16} />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar isLoggedIn={true} onLogout={handleLogout} />
      <div className="container mx-auto py-10 px-4 max-w-4xl">
        <Button 
          variant="outline" 
          className="mb-6" 
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Button>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getEventTypeClass(event.type)}`}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </span>
              <span className="text-sm text-gray-500">{event.distance}</span>
            </div>
            
            <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium">Date & Time</h3>
                  <p className="text-gray-600">{formatEventDate(event.time)}</p>
                </div>
              </div>
              
              {user?.email !== event.createdBy && (
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Organized by</h3>
                    <p className="text-gray-600">{event.createdBy}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <Users className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium">Participants</h3>
                  <p className="text-gray-600">{event.participants} people have joined</p>
                </div>
              </div>
            </div>
            
            {event.description && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
              </div>
            )}
            
            <div className="flex justify-end">
              <Button 
                onClick={handleJoinEvent}
                variant={isJoined ? "outline" : "default"}
              >
                {isJoined ? "Leave Event" : "Join Event"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
