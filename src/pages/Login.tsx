
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import NavigationBar from '../components/NavigationBar';
import styles from './Auth.module.css';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleLogin = (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(undefined);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt:', data);
      
      // For demo purposes, show error for specific email
      if (data.email === 'error@example.com') {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }
      
      // Successful login simulation
      localStorage.setItem('user', JSON.stringify({ email: data.email }));
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setError(undefined);
    
    // Simulate Google sign-in
    setTimeout(() => {
      console.log('Google sign in attempted');
      
      // Successful login simulation
      localStorage.setItem('user', JSON.stringify({ email: 'google-user@example.com' }));
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className={styles.page}>
      <NavigationBar isLoggedIn={false} onLogout={() => {}} />
      
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <AuthForm
            type="login"
            onSubmit={handleLogin}
            onGoogleSignIn={handleGoogleSignIn}
            isLoading={isLoading}
            error={error}
          />
          
          <div className={styles.switchLink}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
        
        <div className={styles.infoPanel}>
          <div className={styles.infoPanelContent}>
            <h2 className={styles.infoPanelTitle}>Welcome Back</h2>
            <p className={styles.infoPanelText}>
              Log in to access emergency services and manage your requests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
