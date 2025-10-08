import { useState, useEffect } from 'react';
import { toastManager } from './toastManager';
import Toast from './Toast';
import { Position, type ToastData } from './types';

interface ToastContainerProps {
  position?: Position;
  maxToasts?: number;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ 
  position = Position.TOP_RIGHT,
  maxToasts = 5 
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    return unsubscribe;
  }, []);

  const getPositionStyles = (): string => {
    switch (position) {
      case Position.TOP_LEFT:
        return 'top-4 left-4';
      case Position.TOP_CENTER:
        return 'top-4 left-1/2 -translate-x-1/2';
      case Position.TOP_RIGHT:
        return 'top-4 right-4';
      case Position.BOTTOM_LEFT:
        return 'bottom-4 left-4';
      case Position.BOTTOM_CENTER:
        return 'bottom-4 left-1/2 -translate-x-1/2';
      case Position.BOTTOM_RIGHT:
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  const visibleToasts = toasts.slice(-maxToasts);

  return (
    <div 
      className={`fixed ${getPositionStyles()} z-50 flex flex-col gap-2 
                  pointer-events-none`} 
      aria-live="polite"
      aria-atomic="false"
    >
      {visibleToasts.map(toastData => (
        <Toast
          key={toastData.id}
          {...toastData}
          onRemove={toastManager.remove.bind(toastManager)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
