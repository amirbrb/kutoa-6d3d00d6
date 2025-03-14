
import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Info, Check } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import LocationPicker from '../components/LocationPicker';
import EmergencyButton from '../components/EmergencyButton';
import styles from './RequestHelp.module.css';

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

const RequestHelp = () => {
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [requestType, setRequestType] = useState<string>('medical');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      window.location.href = '/login';
      return;
    }
    
    setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleLocationSelect = (selectedLocation: Location) => {
    setLocation(selectedLocation);
  };

  const handleEmergencyRequest = () => {
    if (!location) {
      alert('Please select a location first');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Emergency request submitted:', {
        location,
        type: requestType,
        description,
        user
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect to dashboard after a delay
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000);
    }, 2000);
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className={styles.page}>
      <NavigationBar isLoggedIn={true} onLogout={handleLogout} />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Request Emergency Help</h1>
          <p className={styles.subtitle}>
            Provide your location and details for immediate assistance
          </p>
        </div>
        
        <div className={styles.content}>
          {isSuccess ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>
                <Check size={32} />
              </div>
              <h2 className={styles.successTitle}>Emergency Request Submitted</h2>
              <p className={styles.successText}>
                Your request has been received and emergency services have been notified.
                You will be redirected to your dashboard shortly.
              </p>
            </div>
          ) : (
            <>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h2 className={styles.stepTitle}>Select Your Location</h2>
                  <div className={styles.locationSection}>
                    <LocationPicker onLocationSelect={handleLocationSelect} />
                  </div>
                </div>
              </div>
              
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h2 className={styles.stepTitle}>Emergency Type</h2>
                  <div className={styles.emergencyTypeSelection}>
                    <div className={styles.emergencyTypes}>
                      <button 
                        className={`${styles.typeButton} ${requestType === 'medical' ? styles.active : ''}`}
                        onClick={() => setRequestType('medical')}
                      >
                        <div className={styles.typeIcon}>🚑</div>
                        <span>Medical</span>
                      </button>
                      
                      <button 
                        className={`${styles.typeButton} ${requestType === 'fire' ? styles.active : ''}`}
                        onClick={() => setRequestType('fire')}
                      >
                        <div className={styles.typeIcon}>🔥</div>
                        <span>Fire</span>
                      </button>
                      
                      <button 
                        className={`${styles.typeButton} ${requestType === 'police' ? styles.active : ''}`}
                        onClick={() => setRequestType('police')}
                      >
                        <div className={styles.typeIcon}>👮</div>
                        <span>Police</span>
                      </button>
                      
                      <button 
                        className={`${styles.typeButton} ${requestType === 'other' ? styles.active : ''}`}
                        onClick={() => setRequestType('other')}
                      >
                        <div className={styles.typeIcon}>⚠️</div>
                        <span>Other</span>
                      </button>
                    </div>
                    
                    <div className={styles.descriptionInput}>
                      <label htmlFor="description" className={styles.inputLabel}>
                        Additional Details (optional)
                      </label>
                      <textarea 
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your emergency situation..."
                        rows={3}
                        className={styles.textarea}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h2 className={styles.stepTitle}>Submit Your Request</h2>
                  <div className={styles.submitSection}>
                    <div className={styles.disclaimer}>
                      <Info size={18} />
                      <p>By pressing the emergency button, you confirm that you need immediate assistance. False alarms may result in penalties.</p>
                    </div>
                    
                    <EmergencyButton 
                      onActivate={handleEmergencyRequest}
                      isDisabled={!location || isSubmitting}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestHelp;
