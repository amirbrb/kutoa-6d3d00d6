
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, ChevronLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper/PageWrapper';

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
      <PageWrapper>
        <div>
          <div>
            <div></div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (!event) {
    return (
      <PageWrapper>
        <div>
          <div>
            <h1>Event not found</h1>
            <p>The event you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/dashboard')}
            >
              <ChevronLeft size={16} />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      
      <div>
        <button 
          onClick={() => navigate('/dashboard')}
        >
          <ChevronLeft size={16} />
          <span>Back to Dashboard</span>
        </button>
        
        <div>
          {event.media && event.media.length > 0 && (
            <div>
              <div>
                {event.media.slice(0, 1).map((url, index) => (
                  <div key={index}>
                    <img 
                      src={url} 
                      alt={event.title} 
                    />
                  </div>
                ))}
                {event.media.length > 1 && (
                  <div>
                    {event.media.slice(1, 3).map((url, index) => (
                      <div key={index + 1}>
                        <img 
                          src={url} 
                          alt={`${event.title} ${index + 1}`} 
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {event.media.length > 3 && (
                <div>
                  +{event.media.length - 3} more
                </div>
              )}
            </div>
          )}
          
          <div>
            <div>
              <div>
                <span>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
                <h1>{event.title}</h1>
                <p>Created by {event.createdBy}</p>
              </div>
              
              <button>
                Join Event
              </button>
            </div>
            
            <div>
              <div>
                <MapPin />
                <span>{event.location}</span>
                <span>({event.distance})</span>
              </div>
              
              <div>
                <Calendar />
                <span>{formatEventDate(event.time)}</span>
              </div>
              
              <div>
                <Clock />
                <span>{formatEventTime(event.time)}</span>
              </div>
              
              <div>
                <Users />
                <span>{event.participants} participants</span>
              </div>
            </div>
            
            <div>
              <h2>About this event</h2>
              <div>
                <p>{event.description}</p>
              </div>
            </div>
            
            {event.media && event.media.length > 3 && (
              <div>
                <h2>All Photos</h2>
                <div>
                  {event.media.map((url, index) => (
                    <div key={index}>
                      <img 
                        src={url} 
                        alt={`${event.title} ${index}`} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EventDetails;
