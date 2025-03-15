
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './NavigationBar.module.css';
import UserSubmenu from './UserSubmenu';

interface NavigationBarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logo}>
            <span>Kutoa</span>
          </Link>
        </div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
          <ul className={styles.navList}>
            <li>
              <Link 
                to="/" 
                className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
              >
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link 
                    to="/dashboard" 
                    className={`${styles.navLink} ${location.pathname === '/dashboard' ? styles.active : ''}`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/request-help" 
                    className={`${styles.navLink} ${location.pathname === '/request-help' ? styles.active : ''}`}
                  >
                    Request Help
                  </Link>
                </li>
                <li className={styles.mobileOnly}>
                  <button onClick={onLogout} className={styles.navLink}>
                    <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className={`${styles.navLink} ${location.pathname === '/login' ? styles.active : ''}`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/signup" 
                    className={`${styles.navLink} ${location.pathname === '/signup' ? styles.active : ''}`}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {isLoggedIn && (
          <div className={styles.userActions}>
            <UserSubmenu onLogout={onLogout} />
          </div>
        )}

        <button 
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default NavigationBar;
