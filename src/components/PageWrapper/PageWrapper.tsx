import NavigationBar from '../NavigationBar/NavigationBar';
import styles from './PageWrapper.module.css';

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
        <NavigationBar/>
        <div className={styles.content}>
            {children}
        </div>
    </div>
  );
}

export default PageWrapper;