import {useState, useEffect} from 'react';

import {Link, useLocation} from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  HelpCircle,
  LogIn,
  UserPlus,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import styles from './NavigationBar.module.css';
import UserSubmenu from '../UserSubMenu/UserSubmenu';
import {useIsMobile} from '../../hooks/useIsMobile';
import useUser from '@/hooks/useUser';
import {SystemRoutes} from '@/modules/routing/routing.types';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import useLanguage from '@/hooks/useLanguage';
import classNames from 'classnames';
import useSystemPhrase from '@/hooks/useSystemPhrase';

function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const {language, updateLanguage} = useLanguage();

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
  const {translate} = useSystemPhrase();

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link to={SystemRoutes.Home} className={styles.logo}>
            <img src="/icons/logo.png" alt="Kutoa Logo" className={styles.logoImage} />
          </Link>
          <LanguageSelector onLanguageChange={updateLanguage} currentLanguage={language} />
        </div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
          <ul className={classNames(styles.navList, {[styles.rtl]: !language.isRTL})}>
            <li>
              <Link
                to={SystemRoutes.Home}
                className={`${styles.navLink} ${location.pathname === SystemRoutes.Home ? styles.active : ''}`}
              >
                {isMobile && <Home size={20} className={styles.navIcon} />}
                <span>{translate('menus.home')}</span>
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    to={SystemRoutes.Dashboard}
                    className={`${styles.navLink} ${location.pathname === SystemRoutes.Dashboard ? styles.active : ''}`}
                  >
                    {isMobile && <LayoutDashboard size={20} className={styles.navIcon} />}
                    <span>{translate('menus.dashboard')}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={SystemRoutes.RequestHelp}
                    className={`${styles.navLink} ${location.pathname === SystemRoutes.RequestHelp ? styles.active : ''}`}
                  >
                    {isMobile && <HelpCircle size={20} className={styles.navIcon} />}
                    <span>{translate('menus.help')}</span>
                  </Link>
                </li>
                {isMobile && (
                  <>
                    <li>
                      <Link
                        to={SystemRoutes.Profile}
                        className={`${styles.navLink} ${location.pathname === SystemRoutes.Profile ? styles.active : ''}`}
                      >
                        <User size={20} className={styles.navIcon} />
                        <span>{translate('menus.profile')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={SystemRoutes.Settings}
                        className={`${styles.navLink} ${location.pathname === SystemRoutes.Settings ? styles.active : ''}`}
                      >
                        <Settings size={20} className={styles.navIcon} />
                        <span>{translate('menus.settings')}</span>
                      </Link>
                    </li>
                    <li>
                      <button onClick={logout} className={styles.navLink}>
                        <LogOut size={20} className={styles.navIcon} />
                        <span>{translate('menus.logout')}</span>
                      </button>
                    </li>
                  </>
                )}
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={SystemRoutes.Login}
                    className={`${styles.navLink} ${location.pathname === SystemRoutes.Login ? styles.active : ''}`}
                  >
                    {isMobile && <LogIn size={20} className={styles.navIcon} />}
                    <span>{translate('menus.login')}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={SystemRoutes.Signup}
                    className={`${styles.navLink} ${location.pathname === SystemRoutes.Signup ? styles.active : ''}`}
                  >
                    {isMobile && <UserPlus size={20} className={styles.navIcon} />}
                    <span>{translate('menus.signup')}</span>
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
}

export default NavigationBar;
