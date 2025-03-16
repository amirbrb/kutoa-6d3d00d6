
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, ArrowLeft, User, Calendar, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import NavigationBar from '../components/NavigationBar';

interface Event {
  id: string;
  title: string;
  location: string;
  distance?: string;
  createdBy: string;
  createdById: string;
  time: Date;
  participants: number;
  type: 'medical' | 'donation' | 'volunteer' | 'other';
  description?: string;
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ id?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(storedUser));
    
    // Mock API call to get event details
    setTimeout(() => {
      // This would normally be an API call using the id
      const mockEvent: Event = {
        id: id || '',
        title: 'Community Blood Drive',
        location: 'Anytown Community Center',
        distance: '0.5 miles away',
        createdBy: 'Sarah Johnson',
        createdById: 'user-456',
        time: new Date(Date.now() + 2 * 24 * 60 * 60000),
        participants: 15,
        type: 'medical',
        description: 'Join us for a community blood drive. All blood types needed. Light refreshments will be provided for donors. Please bring a valid ID and make sure you are well hydrated before donating. The process takes approximately 45 minutes from registration to completion.'
      };
      
      setEvent(mockEvent);
      setIsLoading(false);
    }, 800);
  }, [id, navigate]);

  const formatEventTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'medical':
        return "bg-red-100 text-red-600";
      case 'donation':
        return "bg-green-100 text-green-600";
      case 'volunteer':
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleJoinEvent = () => {
    console.log(`Joining event: ${id}`);
    // In a real app, this would make an API call
  };

  const handleCancelEvent = () => {
    console.log(`Canceling event: ${id}`);
    // In a real app, this would make an API call
    navigate('/dashboard');
  };

  const goBack = () => {
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary">
        <NavigationBar isLoggedIn={true} />
        <div className="container mx-auto px-4 pt-20">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="w-6 h-6 border-2 border-t-primary rounded-full animate-spin"></div>
            <span className="ml-2">Loading event details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-secondary">
        <NavigationBar isLoggedIn={true} />
        <div className="container mx-auto px-4 pt-20">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-xl font-semibold">Event Not Found</h2>
            <p className="text-muted-foreground mt-2">The event you're looking for doesn't exist or has been removed.</p>
            <Button className="mt-6" onClick={goBack}>Back to Dashboard</Button>
          </div>
        </div>
      </div>
    );
  }

  const isUserEvent = user?.id === event.createdById;

  return (
    <div className="min-h-screen bg-secondary">
      <NavigationBar isLoggedIn={true} />
      <div className="container mx-auto px-4 pt-20 pb-12">
        <Button 
          variant="ghost" 
          className="mb-6 -ml-2 text-muted-foreground"
          onClick={goBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge className={`${getEventTypeColor(event.type)} rounded-full px-3 py-1`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                  {event.distance && (
                    <span className="text-sm text-muted-foreground">{event.distance}</span>
                  )}
                </div>
                
                <h1 className="text-2xl font-bold mb-6">{event.title}</h1>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Date and Time</h3>
                      <p className="text-muted-foreground">{formatEventTime(event.time)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                  
                  {!isUserEvent && (
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium">Organized by</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${event.createdBy}`} alt={event.createdBy} />
                            <AvatarFallback>{getInitials(event.createdBy)}</AvatarFallback>
                          </Avatar>
                          <span>{event.createdBy}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Participants</h3>
                      <p className="text-muted-foreground">{event.participants} people participating</p>
                    </div>
                  </div>
                  
                  {event.description && (
                    <div className="flex items-start gap-3 pt-2">
                      <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium">About this event</h3>
                        <p className="text-muted-foreground mt-1">{event.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="shadow-sm">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Actions</h2>
                {isUserEvent ? (
                  <Button 
                    variant="destructive" 
                    className="w-full" 
                    onClick={handleCancelEvent}
                  >
                    Cancel Event
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={handleJoinEvent}
                  >
                    Join Event
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
