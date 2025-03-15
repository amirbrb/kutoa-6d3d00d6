
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import styles from './Auth.module.css';
import { useToast } from '../components/ui/use-toast';

interface LoginProps {
  onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Mock login logic - replace with real authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password) {
        // Store basic user data in localStorage
        const userData = {
          email,
          name: email.split('@')[0],
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
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please enter valid credentials",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Log in to access emergency services</p>
        
        <AuthForm 
          type="login"
          onSubmit={handleLogin}
          isLoading={isLoading}
        />
        
        <div className={styles.linkText}>
          <span>Don't have an account?</span>
          <Link to="/signup" className={styles.link}>Sign up</Link>
        </div>
      </div>
      
      <div className={styles.imageContainer}>
        <div className={styles.overlay}></div>
      </div>
    </div>
  );
};

export default Login;
