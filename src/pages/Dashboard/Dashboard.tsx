
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, Clock, CheckCircle, XCircle, Users } from 'lucide-react';
import { MapPin } from 'lucide-react';
import styles from './Dashboard.module.css';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { SystemRoutes } from '@/modules/routing/routing.types';
interface EmergencyRequest {
  id: string;
  type: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  location: string;
  createdAt: Date;
  description?: string;
}

interface NearbyEvent {
  id: string;
  title: string;
  location: string;
  distance: string;
  createdBy: string;
  time: Date;
  participants: number;
  type: 'medical' | 'donation' | 'volunteer' | 'other';
}

const Dashboard = () => {
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [nearbyEvents, setNearbyEvents] = useState<NearbyEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      window.location.href = '/login';
      return;
    }
    
    setUser(JSON.parse(storedUser));
    
    setTimeout(() => {
      const mockRequests: EmergencyRequest[] = [
        {
          id: '12345',
          type: 'Medical',
          status: 'active',
          location: '123 Main St, Anytown',
          createdAt: new Date(Date.now() - 30 * 60000),
          description: 'Severe allergic reaction'
        },
        {
          id: '67890',
          type: 'Fire',
          status: 'completed',
          location: '456 Oak Ave, Somewhere',
          createdAt: new Date(Date.now() - 24 * 60 * 60000),
        },
        {
          id: '54321',
          type: 'Police',
          status: 'cancelled',
          location: '789 Pine Rd, Nowhere',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60000),
          description: 'Suspicious activity'
        }
      ];
      
      setRequests(mockRequests);
      setIsLoading(false);
    }, 1000);

    setTimeout(() => {
      const mockNearbyEvents: NearbyEvent[] = [
        {
          id: 'ev-123',
          title: 'Community Blood Drive',
          location: 'Anytown Community Center',
          distance: '0.5 miles away',
          createdBy: 'Sarah Johnson',
          time: new Date(Date.now() + 2 * 24 * 60 * 60000),
          participants: 15,
          type: 'medical'
        },
        {
          id: 'ev-456',
          title: 'Food Distribution',
          location: 'Somewhere Park',
          distance: '1.2 miles away',
          createdBy: 'Michael Chen',
          time: new Date(Date.now() + 7 * 24 * 60 * 60000),
          participants: 8,
          type: 'donation'
        },
        {
          id: 'ev-789',
          title: 'Neighborhood Cleanup',
          location: 'Nowhere Beach',
          distance: '0.8 miles away',
          createdBy: 'Elena Rodriguez',
          time: new Date(Date.now() + 3 * 24 * 60 * 60000),
          participants: 12,
          type: 'volunteer'
        }
      ];
      
      setNearbyEvents(mockNearbyEvents);
      setIsLoadingEvents(false);
    }, 1500);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleEventClick = (eventId: string) => {
      navigate(`${SystemRoutes.Events}/${eventId}`);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return styles.pendingBadge;
      case 'active':
        return styles.activeBadge;
      case 'completed':
        return styles.completedBadge;
      case 'cancelled':
        return styles.cancelledBadge;
      default:
        return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />;
      case 'active':
        return <AlertTriangle size={16} />;
      case 'completed':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  const getEventTypeClass = (type: string) => {
    switch (type) {
      case 'medical':
        return styles.medicalEvent;
      case 'donation':
        return styles.donationEvent;
      case 'volunteer':
        return styles.volunteerEvent;
      default:
        return styles.otherEvent;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
    
    return date.toLocaleDateString();
  };

  const formatUpcomingDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  if (!user) {
    return null;
  }

  return (
    <PageWrapper>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            Welcome, {user.name || user.email}
          </p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.actionCard}>
            <div className={styles.actionCardContent}>
              <h2 className={styles.actionTitle}>Need Emergency Help?</h2>
              <p className={styles.actionText}>
                Request assistance immediately with your current location or provide specific details.
              </p>
              <Link to={SystemRoutes.RequestHelp} className={styles.actionButton}>
                <AlertTriangle size={18} />
                Request Help
              </Link>
            </div>
          </div>
          
          <div className={styles.dashboardGrid}>
            <div className={styles.requestsSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Your Requests</h2>
              </div>
              
              {isLoading ? (
                <div className={styles.loading}>
                  <span className={styles.spinner}></span>
                  <p>Loading your requests...</p>
                </div>
              ) : requests.length > 0 ? (
                <div className={styles.requestsList}>
                  {requests.map((request) => (
                    <div key={request.id} className={styles.requestCard}>
                      <div className={styles.requestHeader}>
                        <span className={styles.requestType}>{request.type}</span>
                        <span className={`${styles.statusBadge} ${getStatusBadgeClass(request.status)}`}>
                          {getStatusIcon(request.status)}
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>
                      <div className={styles.requestContent}>
                        <div className={styles.requestLocation}>
                          <MapPin size={16} />
                          {request.location}
                        </div>
                        {request.description && (
                          <div className={styles.requestDescription}>
                            {request.description}
                          </div>
                        )}
                        <div className={styles.requestTime}>
                          <Clock size={16} />
                          {formatDate(request.createdAt)}
                        </div>
                      </div>
                      <div className={styles.requestActions}>
                        <button className={styles.requestDetailsButton}>
                          View Details
                        </button>
                        {request.status === 'active' && (
                          <button className={styles.requestCancelButton}>
                            Cancel Request
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noRequests}>
                  <div className={styles.noRequestsIcon}>
                    <CheckCircle size={32} />
                  </div>
                  <h3>No Emergency Requests</h3>
                  <p>You haven't made any emergency requests yet.</p>
                </div>
              )}
            </div>
            
            <div className={styles.nearbyEventsSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Events Near You</h2>
                <div className="flex items-center gap-2">
                  <Link to={SystemRoutes.CreateEvent} className="text-sm font-medium text-accent hover:underline">
                    Create Event
                  </Link>
                  <button className={styles.viewAllButton}>View All</button>
                </div>
              </div>
              
              {isLoadingEvents ? (
                <div className={styles.loading}>
                  <span className={styles.spinner}></span>
                  <p>Finding events near you...</p>
                </div>
              ) : nearbyEvents.length > 0 ? (
                <div className={styles.eventsList}>
                  {nearbyEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className={styles.eventCard}
                      onClick={() => handleEventClick(event.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={styles.eventHeader}>
                        <span className={`${styles.eventType} ${getEventTypeClass(event.type)}`}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                        <span className={styles.eventDistance}>
                          {event.distance}
                        </span>
                      </div>
                      <h3 className={styles.eventTitle}>{event.title}</h3>
                      <div className={styles.eventDetails}>
                        <div className={styles.eventLocation}>
                          <MapPin size={14} />
                          {event.location}
                        </div>
                        <div className={styles.eventTime}>
                          <Clock size={14} />
                          {formatUpcomingDate(event.time)}
                        </div>
                        <div className={styles.eventCreator}>
                          <span>By {event.createdBy}</span>
                        </div>
                      </div>
                      <div className={styles.eventFooter}>
                        <div className={styles.eventParticipants}>
                          <Users size={14} />
                          {event.participants} participants
                        </div>
                        <button className={styles.joinEventButton}>
                          Join Event
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noEvents}>
                  <MapPin size={32} />
                  <h3>No Nearby Events</h3>
                  <p>There are no community events near you right now.</p>
                  <Link to={SystemRoutes.CreateEvent} className={styles.createEventButton}>
                    Create an Event
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
