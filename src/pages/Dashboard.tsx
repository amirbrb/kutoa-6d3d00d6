
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import styles from './Dashboard.module.css';

interface EmergencyRequest {
  id: string;
  type: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  location: string;
  createdAt: Date;
  description?: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      window.location.href = '/login';
      return;
    }
    
    setUser(JSON.parse(storedUser));
    
    // Fetch user's emergency requests
    // This is a mock implementation
    setTimeout(() => {
      const mockRequests: EmergencyRequest[] = [
        {
          id: '12345',
          type: 'Medical',
          status: 'active',
          location: '123 Main St, Anytown',
          createdAt: new Date(Date.now() - 30 * 60000), // 30 minutes ago
          description: 'Severe allergic reaction'
        },
        {
          id: '67890',
          type: 'Fire',
          status: 'completed',
          location: '456 Oak Ave, Somewhere',
          createdAt: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
        },
        {
          id: '54321',
          type: 'Police',
          status: 'cancelled',
          location: '789 Pine Rd, Nowhere',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60000), // 3 days ago
          description: 'Suspicious activity'
        }
      ];
      
      setRequests(mockRequests);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
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

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className={styles.page}>
      <NavigationBar isLoggedIn={true} onLogout={handleLogout} />
      
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
              <Link to="/request-help" className={styles.actionButton}>
                <AlertTriangle size={18} />
                Request Emergency Help
              </Link>
            </div>
          </div>
          
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
        </div>
      </div>
    </div>
  );
};

// Add the missing MapPin component
const MapPin = (props: { size: number }) => {
  return <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={props.size} 
    height={props.size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>;
};

export default Dashboard;
