
import React, { useState } from 'react';
import { Mail, Lock, AtSign, Eye, EyeOff } from 'lucide-react';
import styles from './AuthForm.module.css';
import MediaUpload from '../MediaUpload/MediaUpload';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (data: { email: string; password: string; name?: string; profilePicture?: File }) => void;
  onGoogleSignIn: () => void;
  isLoading: boolean;
  error?: string;
}

function AuthForm({
  type,
  onSubmit,
  onGoogleSignIn,
  isLoading,
  error,
}: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'signup') {
      onSubmit({ 
        email, 
        password, 
        name, 
        profilePicture: profilePicture.length > 0 ? profilePicture[0] : undefined 
      });
    } else {
      onSubmit({ email, password });
    }
  };

  const handleProfilePictureChange = (files: File[]) => {
    setProfilePicture(files);
  };

  return (
    <div className={styles.authForm}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>
          {type === 'login' ? 'Welcome back' : 'Create an account'}
        </h1>
        <p className={styles.subtitle}>
          {type === 'login'
            ? 'Enter your credentials to access your account'
            : 'Fill in your details to create a new account'}
        </p>

        {error && <ErrorIndicator error={error} />}

        {type === 'signup' && (
          <>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name
              </label>
              <div className={styles.inputWrapper}>
                <AtSign size={18} className={styles.inputIcon} />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.profilePictureSection}>
              <label className={styles.label}>Profile Picture</label>
              <div className={styles.avatarUploadContainer}>
                <MediaUpload
                    maxFiles={1}
                    value={profilePicture}
                    onChange={handleProfilePictureChange}
                    showPreview
                    className={styles.mediaUploadWrapper} 
                    previewClassName={styles.mediaUploadPreview}
                  />
              </div>
            </div>
          </>
        )}

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <div className={styles.inputWrapper}>
            <Mail size={18} className={styles.inputIcon} />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.inputWrapper}>
            <Lock size={18} className={styles.inputIcon} />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.passwordToggle}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          className={`${styles.button} ${isLoading ? styles.loading : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : type === 'login' ? 'Sign In' : 'Sign Up'}
        </button>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <button 
          type="button" 
          onClick={onGoogleSignIn} 
          className={styles.googleButton}
          disabled={isLoading}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
            </g>
          </svg>
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
