
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import NavigationBar from '../components/NavigationBar';
import styles from './Auth.module.css';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSignup = (data: { email: string; password: string; name?: string }) => {
    setIsLoading(true);
    setError(undefined);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Signup attempt:', data);
      
      // For demo purposes, show error for specific email
      if (data.email === 'taken@example.com') {
        setError('This email is already registered');
        setIsLoading(false);
        return;
      }
      
      // Successful signup simulation
      localStorage.setItem('user', JSON.stringify({ email: data.email, name: data.name }));
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setError(undefined);
    
    // Simulate Google sign-in
    setTimeout(() => {
      console.log('Google sign in attempted');
      
      // Successful signup simulation
      localStorage.setItem('user', JSON.stringify({ email: 'google-user@example.com', name: 'Google User' }));
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className={styles.page}>
      <NavigationBar isLoggedIn={false} onLogout={() => {}} />
      
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <AuthForm
            type="signup"
            onSubmit={handleSignup}
            onGoogleSignIn={handleGoogleSignIn}
            isLoading={isLoading}
            error={error}
          />
          
          <div className={styles.switchLink}>
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
        
        <div className={styles.infoPanel}>
          <div className={styles.infoPanelContent}>
            <h2 className={styles.infoPanelTitle}>Join Our Emergency Network</h2>
            <p className={styles.infoPanelText}>
              Create an account to request emergency assistance when you need it most.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
