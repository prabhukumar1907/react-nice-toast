import { useEffect, useState, type JSX } from 'react';
import { ToastType, type ToastData } from './types';

interface ToastProps extends ToastData {
  onRemove: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, duration, className, onRemove }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
    }, 10);

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration]);

  const handleClose = (): void => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(id);
    }, 400);
  };

  const getTypeStyles = (): string => {
    switch (type) {
      case ToastType.SUCCESS:
        return 'bg-gradient-to-r from-emerald-500 to-green-500 border-emerald-400';
      case ToastType.ERROR:
        return 'bg-gradient-to-r from-red-500 to-rose-500 border-red-400';
      case ToastType.WARNING:
        return 'bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400';
      case ToastType.INFO:
      default:
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-400';
    }
  };

  const getProgressColor = (): string => {
    switch (type) {
      case ToastType.SUCCESS:
        return 'bg-emerald-200';
      case ToastType.ERROR:
        return 'bg-red-200';
      case ToastType.WARNING:
        return 'bg-amber-200';
      case ToastType.INFO:
      default:
        return 'bg-blue-200';
    }
  };

  const getIcon = (): JSX.Element => {
    const iconClass = "w-6 h-6";
    switch (type) {
      case ToastType.SUCCESS:
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case ToastType.ERROR:
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case ToastType.WARNING:
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case ToastType.INFO:
      default:
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden
        flex items-start gap-3 min-w-[320px] max-w-md p-4 rounded-xl shadow-2xl
        text-white border-l-4
        ${getTypeStyles()}
        backdrop-blur-sm
        transition-all duration-400 ease-out
        ${isExiting 
          ? 'opacity-0 translate-x-full scale-75' 
          : 'opacity-100 translate-x-0 scale-100 animate-slideIn'
        }
        ${className || ''}
        hover:shadow-3xl hover:scale-105
      `}
      role="alert"
      aria-live="polite"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex items-start gap-3 flex-1">
        <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
          {getIcon()}
        </div>
        <div className="flex-1 pt-0.5">
          <p className="text-sm font-medium leading-relaxed">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-white/80 hover:text-white hover:bg-white/20 
                     transition-all duration-200 focus:outline-none focus:ring-2 
                     focus:ring-white/50 rounded-lg p-1 -mr-1 -mt-1"
          aria-label="Close notification"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <div
          className={`h-full ${getProgressColor()} transition-all duration-100 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Toast;