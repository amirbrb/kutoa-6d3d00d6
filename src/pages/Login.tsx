
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import NavigationBar from '../components/NavigationBar';
import styles from './Auth.module.css';
import { useToast } from '../components/ui/use-toast';

interface LoginProps {
  onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleLogin = async (data: { email: string; password: string; name?: string }) => {
    setIsLoading(true);
    setError(undefined);
    
    try {
      // Mock login logic - replace with real authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (data.email && data.password) {
        // Store basic user data in localStorage
        const userData = {
          email: data.email,
          name: data.email.split('@')[0],
          avatar: '',
          hobbies: []
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast({
          title: "Login successful",
          description: "Welcome back to Emergency Response!",
        });
        
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        
        navigate('/dashboard');
      } else {
        setError("Please enter valid credentials");
      }
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <NavigationBar isLoggedIn={false} onLogout={() => {}} />
      
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <AuthForm 
            type="login"
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
            onGoogleSignIn={() => {
              // Implement Google sign-in
              console.log("Google sign-in clicked");
            }}
          />
          
          <div className={styles.switchLink}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
        
        <div className={styles.infoPanel}>
          <div className={styles.infoPanelContent}>
            <h2 className={styles.infoPanelTitle}>Welcome Back</h2>
            <p className={styles.infoPanelText}>
              Log in to access emergency services and request assistance when needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
