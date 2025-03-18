
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './Auth.module.css';
import PageWrapper from '@/components/PageWrapper/PageWrapper';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const { toast } = useToast();

  const handleSignup = (data: { email: string; password: string; name?: string; profilePicture?: File }) => {
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
      
      // Process profile picture if present
      let profilePictureUrl = '';
      if (data.profilePicture) {
        // In a real app, you would upload the file to a server
        // Here we're just creating a local URL for demo purposes
        profilePictureUrl = URL.createObjectURL(data.profilePicture);
        console.log('Profile picture URL:', profilePictureUrl);
      }
      
      // Successful signup simulation
      localStorage.setItem('user', JSON.stringify({ 
        email: data.email, 
        name: data.name,
        profilePicture: profilePictureUrl
      }));
      
      toast({
        title: "Account created successfully!",
        description: "Welcome to Emergency Connect.",
      });
      
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
      localStorage.setItem('user', JSON.stringify({ 
        email: 'google-user@example.com', 
        name: 'Google User',
        profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google-user'
      }));
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
};

export default Signup;
