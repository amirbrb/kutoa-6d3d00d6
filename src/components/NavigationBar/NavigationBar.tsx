
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './NavigationBar.module.css';
import UserSubmenu from '../UserSubMenu/UserSubmenu';
import { useIsMobile } from '../../hooks/use-mobile';
import useUser from '@/hooks/useUser';

const NavigationBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

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

  const {user, logout} = useUser();

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
            {user ? (
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
                {isMobile && (
                  <>
                    <li>
                      <Link 
                        to="/profile" 
                        className={`${styles.navLink} ${location.pathname === '/profile' ? styles.active : ''}`}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/settings" 
                        className={`${styles.navLink} ${location.pathname === '/settings' ? styles.active : ''}`}
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button onClick={logout} className={styles.navLink}>
                        <span>Logout</span>
                      </button>
                    </li>
                  </>
                )}
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

        {user && !isMobile && (
          <div className={styles.userActions}>
            <UserSubmenu onLogout={logout} />
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
