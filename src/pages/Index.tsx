
import { Link } from 'react-router-dom';
import { AlertTriangle, Shield, MapPin, Clock } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import styles from './Index.module.css';

interface IndexProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Index: React.FC<IndexProps> = ({ isLoggedIn, onLogout }) => {


  return (
    <div className={styles.page}>
      <NavigationBar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.chip}>
              <AlertTriangle size={14} />
              <span>Fast & Reliable Emergency Response</span>
            </div>
            <h1 className={styles.title}>
              Quick Emergency Assistance
              <span className={styles.accent}> When You Need It Most</span>
            </h1>
            <p className={styles.subtitle}>
              Our platform connects you with emergency services in your area,
              providing fast response when every second counts.
            </p>
            <div className={styles.actions}>
              <Link to="/signup" className={styles.primaryButton}>
                Sign Up Now
              </Link>
              <Link to="/request-help" className={styles.secondaryButton}>
                Request Help
              </Link>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.image}></div>
          </div>
        </div>
      </section>
      
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <MapPin size={24} />
              </div>
              <h3 className={styles.featureTitle}>Location Based</h3>
              <p className={styles.featureText}>
                Share your exact location or search for a specific address to receive help precisely where you need it.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Clock size={24} />
              </div>
              <h3 className={styles.featureTitle}>Quick Response</h3>
              <p className={styles.featureText}>
                Our system prioritizes your emergency request and dispatches the nearest available assistance.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Shield size={24} />
              </div>
              <h3 className={styles.featureTitle}>Secure & Private</h3>
              <p className={styles.featureText}>
                Your personal information and emergency details are encrypted and handled with the utmost privacy.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready for Any Emergency</h2>
            <p className={styles.ctaText}>
              Create an account today and have peace of mind knowing help is just a click away.
            </p>
            <Link to="/signup" className={styles.ctaButton}>
              Get Started
            </Link>
          </div>
        </div>
      </section>
      
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <span>Kutoa</span>
            </div>
            <p className={styles.footerText}>
              © {new Date().getFullYear()} Kutoa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
