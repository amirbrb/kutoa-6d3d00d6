
import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import styles from './EmergencyButton.module.css';

interface EmergencyButtonProps {
  onActivate: () => void;
  isDisabled?: boolean;
}

function EmergencyButton({ 
  onActivate,
  isDisabled = false 
}: EmergencyButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const handleMouseDown = () => {
    if (isDisabled) return;
    
    setIsPressed(true);
    const timeout = setTimeout(() => {
      setIsPressed(false);
      onActivate();
    }, 1500);
    
    setHoldTimeout(timeout);
  };
  
  const handleMouseUp = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      setHoldTimeout(null);
    }
    setIsPressed(false);
  };
  
  return (
    <div className={styles.container}>
      <button
        className={`${styles.emergencyButton} ${isPressed ? styles.pressed : ''} ${isDisabled ? styles.disabled : ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        disabled={isDisabled}
      >
        <div className={styles.buttonInner}>
          <AlertTriangle size={28} />
          <span>Emergency Request</span>
        </div>
        <svg className={styles.progressRing} width="100%" height="100%" viewBox="0 0 100 100">
          <circle
            className={styles.progressBackground}
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />
          <circle
            className={styles.progressIndicator}
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="302"
            strokeDashoffset="302"
            style={{
              strokeDashoffset: isPressed ? '0' : '302',
              transition: isPressed ? 'stroke-dashoffset 1.5s linear' : 'none'
            }}
          />
        </svg>
      </button>
      <p className={styles.instruction}>Press and hold to activate emergency request</p>
    </div>
  );
};

export default EmergencyButton;
