
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, LayoutDashboard, HelpCircle, LogIn, UserPlus, User, Settings, LogOut } from 'lucide-react';
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
                {isMobile && <Home size={20} className={styles.navIcon} />}
                <span>Home</span>
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link 
                    to="/dashboard" 
                    className={`${styles.navLink} ${location.pathname === '/dashboard' ? styles.active : ''}`}
                  >
                    {isMobile && <LayoutDashboard size={20} className={styles.navIcon} />}
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/request-help" 
                    className={`${styles.navLink} ${location.pathname === '/request-help' ? styles.active : ''}`}
                  >
                    {isMobile && <HelpCircle size={20} className={styles.navIcon} />}
                    <span>Request Help</span>
                  </Link>
                </li>
                {isMobile && (
                  <>
                    <li>
                      <Link 
                        to="/profile" 
                        className={`${styles.navLink} ${location.pathname === '/profile' ? styles.active : ''}`}
                      >
                        <User size={20} className={styles.navIcon} />
                        <span>Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/settings" 
                        className={`${styles.navLink} ${location.pathname === '/settings' ? styles.active : ''}`}
                      >
                        <Settings size={20} className={styles.navIcon} />
                        <span>Settings</span>
                      </Link>
                    </li>
                    <li>
                      <button onClick={logout} className={styles.navLink}>
                        <LogOut size={20} className={styles.navIcon} />
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
                    {isMobile && <LogIn size={20} className={styles.navIcon} />}
                    <span>Login</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/signup" 
                    className={`${styles.navLink} ${location.pathname === '/signup' ? styles.active : ''}`}
                  >
                    {isMobile && <UserPlus size={20} className={styles.navIcon} />}
                    <span>Sign Up</span>
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
