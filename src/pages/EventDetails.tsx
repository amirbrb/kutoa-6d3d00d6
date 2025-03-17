
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, ChevronLeft } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';

interface NearbyEvent {
  id: string;
  title: string;
  location: string;
  distance: string;
  createdBy: string;
  time: Date;
  participants: number;
  type: 'medical' | 'donation' | 'volunteer' | 'other';
  description?: string;
  media?: string[]; // URLs to images or videos
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<NearbyEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      window.location.href = '/login';
      return;
    }
    
    setUser(JSON.parse(storedUser));
    
    // Simulate fetching event data
    setTimeout(() => {
      // Mock event with media
      const mockEvent: NearbyEvent = {
        id: id || '',
        title: 'Community Cleanup Day',
        location: 'Citypark Central, Main Avenue',
        distance: '1.2 miles away',
        createdBy: 'Elena Rodriguez',
        time: new Date(Date.now() + 3 * 24 * 60 * 60000),
        participants: 24,
        type: 'volunteer',
        description: "Join us for our monthly community cleanup day! We'll be meeting at the central pavilion and working our way through the main trails. Gloves and bags will be provided, but feel free to bring your own tools. Water and snacks will be available for all volunteers. This is a family-friendly event, so children are welcome under adult supervision.",
        media: [
          'https://images.unsplash.com/photo-1561347981-969c80cf4463?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ]
      };
      
      setEvent(mockEvent);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const formatEventDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatEventTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleTimeString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationBar isLoggedIn={true} onLogout={handleLogout} />
        <div className="max-w-4xl mx-auto pt-24 px-4 sm:px-6">
          <div className="flex items-center justify-center h-80">
            <div className="spinner w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationBar isLoggedIn={true} onLogout={handleLogout} />
        <div className="max-w-4xl mx-auto pt-24 px-4 sm:px-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-xl font-semibold text-red-500">Event not found</h1>
            <p className="mt-2 text-gray-600">The event you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
            >
              <ChevronLeft size={16} />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar isLoggedIn={true} onLogout={handleLogout} />
      
      <div className="max-w-4xl mx-auto pt-24 pb-16 px-4 sm:px-6">
        <button 
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft size={16} />
          <span>Back to Dashboard</span>
        </button>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {event.media && event.media.length > 0 && (
            <div className="relative aspect-video bg-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                {event.media.slice(0, 1).map((url, index) => (
                  <div key={index} className="col-span-2 h-full">
                    <img 
                      src={url} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {event.media.length > 1 && (
                  <div className="hidden md:grid grid-rows-2 h-full gap-1">
                    {event.media.slice(1, 3).map((url, index) => (
                      <div key={index + 1} className="overflow-hidden">
                        <img 
                          src={url} 
                          alt={`${event.title} ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {event.media.length > 3 && (
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white py-1 px-3 rounded-full text-sm">
                  +{event.media.length - 3} more
                </div>
              )}
            </div>
          )}
          
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  event.type === 'medical' ? 'bg-red-100 text-red-800' : 
                  event.type === 'donation' ? 'bg-green-100 text-green-800' : 
                  event.type === 'volunteer' ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">{event.title}</h1>
                <p className="text-gray-600 mt-1">Created by {event.createdBy}</p>
              </div>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                Join Event
              </button>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center text-gray-700">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span>{event.location}</span>
                <span className="ml-2 text-sm text-gray-500">({event.distance})</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span>{formatEventDate(event.time)}</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span>{formatEventTime(event.time)}</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <span>{event.participants} participants</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this event</h2>
              <div className="prose prose-blue max-w-none text-gray-600">
                <p>{event.description}</p>
              </div>
            </div>
            
            {event.media && event.media.length > 3 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">All Photos</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {event.media.map((url, index) => (
                    <div key={index} className="aspect-square rounded-md overflow-hidden">
                      <img 
                        src={url} 
                        alt={`${event.title} ${index}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
