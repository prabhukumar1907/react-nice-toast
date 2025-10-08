import { useEffect, useState, type JSX } from "react";
import { ToastType, type ToastData } from "./types";
import {
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
  RefreshCw,
  Trash2,
  Upload,
  Download,
  Wifi,
  WifiOff,
  Star,
  X,
} from "lucide-react";
import { FaRegCircleCheck } from "react-icons/fa6";
interface ToastExtraProps {
  showProgressBar: boolean;
  showIcon: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  theme: "light" | "dark";
}

interface ToastProps extends ToastData, ToastExtraProps {
  onRemove: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type,
  duration = 5000,
  className,
  onRemove,
  showProgressBar = true,
  showIcon = true,
  closeOnClick = true,
  pauseOnHover = true,
  theme = "light",
  transition = "slide",
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!duration || paused) return;
    const timer = setTimeout(() => handleClose(), duration);
    return () => clearTimeout(timer);
  }, [duration, paused]);

  const handleClose = (): void => {
    setIsExiting(true);
    setTimeout(() => onRemove(id), 100);
  };

  const handleMouseEnter = () => pauseOnHover && setPaused(true);
  const handleMouseLeave = () => pauseOnHover && setPaused(false);

  const getTypeStyles = (): string => {
    switch (type) {
      case ToastType.SUCCESS:
        return "border-emerald-200/70 shadow-emerald-100/50 dark:border-emerald-800/60 dark:shadow-emerald-900/30";
      case ToastType.ERROR:
        return "border-red-200/70 shadow-red-100/50 dark:border-red-800/60 dark:shadow-red-900/30";
      case ToastType.WARNING:
        return "border-amber-200/70 shadow-amber-100/50 dark:border-amber-700/60 dark:shadow-amber-900/30";
      case ToastType.LOADING:
        return "border-gray-200/70 shadow-gray-100/50 dark:border-gray-700/60 dark:shadow-gray-900/30";
      case ToastType.UPDATE:
        return "border-indigo-200/70 shadow-indigo-100/50 dark:border-indigo-800/60 dark:shadow-indigo-900/30";
      case ToastType.DELETE:
        return "border-red-300/70 shadow-red-200/50 dark:border-red-900/60 dark:shadow-red-900/40";
      case ToastType.UPLOAD:
        return "border-purple-200/70 shadow-purple-100/50 dark:border-purple-800/60 dark:shadow-purple-900/30";
      case ToastType.DOWNLOAD:
        return "border-cyan-200/70 shadow-cyan-100/50 dark:border-cyan-800/60 dark:shadow-cyan-900/30";
      case ToastType.NETWORK:
        return "border-teal-200/70 shadow-teal-100/50 dark:border-teal-800/60 dark:shadow-teal-900/30";
      case ToastType.OFFLINE:
        return "border-gray-400/70 shadow-gray-300/50 dark:border-gray-600/60 dark:shadow-gray-800/30";
      case ToastType.CUSTOM:
        return "border-purple-300/70 shadow-purple-200/50 dark:border-purple-700/60 dark:shadow-purple-900/30";
      default:
        return "border-blue-200/70 shadow-blue-100/50 dark:border-blue-800/60 dark:shadow-blue-900/30";
    }
  };

  const getIconBgColor = (): string => {
    switch (type) {
      case ToastType.SUCCESS:
        return "bg-gradient-to-br from-green-50 to-green-50 dark:from-green-900/30 dark:to-green-900/20";
      case ToastType.ERROR:
        return "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/20";
      case ToastType.WARNING:
        return "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/20";
      case ToastType.LOADING:
        return "bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800/30 dark:to-teal-700/20";
      case ToastType.UPDATE:
        return "bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/20";
      case ToastType.DELETE:
        return "bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/20";
      case ToastType.UPLOAD:
        return "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20";
      case ToastType.DOWNLOAD:
        return "bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/20";
      case ToastType.NETWORK:
        return "bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/20";
      case ToastType.OFFLINE:
        return "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700/30 dark:to-gray-600/20";
      case ToastType.CUSTOM:
        return "bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/20";
      default:
        return "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/20";
    }
  };

  const getIconColor = (): string => {
    switch (type) {
      case ToastType.SUCCESS:
        return "text-emerald-600 dark:text-emerald-400";
      case ToastType.ERROR:
        return "text-red-600 dark:text-red-400";
      case ToastType.WARNING:
        return "text-amber-600 dark:text-amber-400";
      case ToastType.LOADING:
        return "text-teal-700 dark:text-teal-300";
      case ToastType.UPDATE:
        return "text-indigo-600 dark:text-indigo-400";
      case ToastType.DELETE:
        return "text-red-700 dark:text-red-400";
      case ToastType.UPLOAD:
        return "text-purple-600 dark:text-purple-400";
      case ToastType.DOWNLOAD:
        return "text-cyan-600 dark:text-cyan-400";
      case ToastType.NETWORK:
        return "text-teal-600 dark:text-teal-400";
      case ToastType.OFFLINE:
        return "text-gray-600 dark:text-gray-300";
      case ToastType.CUSTOM:
        return "text-purple-700 dark:text-purple-400";
      default:
        return "text-blue-600 dark:text-blue-400";
    }
  };

  const getProgressColor = (): string => {
    switch (type) {
      case ToastType.SUCCESS:
        return "bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-500 dark:from-emerald-500 dark:via-emerald-600 dark:to-green-600";
      case ToastType.ERROR:
        return "bg-gradient-to-r from-red-400 via-red-500 to-rose-500 dark:from-red-500 dark:via-red-600 dark:to-rose-600";
      case ToastType.WARNING:
        return "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 dark:from-amber-500 dark:via-amber-600 dark:to-orange-600";
      case ToastType.LOADING:
        return "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 dark:from-teal-500 dark:via-teal-600 dark:to-teal-700";
      default:
        return "bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 dark:from-blue-500 dark:via-blue-600 dark:to-cyan-600";
    }
  };

  const getIcon = (): JSX.Element => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case ToastType.SUCCESS:
        return <FaRegCircleCheck className={iconClass} />;
      case ToastType.ERROR:
        return <XCircle className={iconClass} />;
      case ToastType.WARNING:
        return <AlertTriangle className={iconClass} />;
      case ToastType.INFO:
        return <Info className={iconClass} />;
      case ToastType.LOADING:
        return <Loader2 className={`${iconClass} animate-spin`} />;
      case ToastType.UPDATE:
        return <RefreshCw className={iconClass} />;
      case ToastType.DELETE:
        return <Trash2 className={iconClass} />;
      case ToastType.UPLOAD:
        return <Upload className={iconClass} />;
      case ToastType.DOWNLOAD:
        return <Download className={iconClass} />;
      case ToastType.NETWORK:
        return <Wifi className={iconClass} />;
      case ToastType.OFFLINE:
        return <WifiOff className={iconClass} />;
      case ToastType.CUSTOM:
        return <Star className={iconClass} />;
      default:
        return <Info className={iconClass} />;
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden flex items-center gap-3 
        min-w-[320px] max-w-md px-2.5 py-2.5 rounded-lg
        ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        } shadow-lg border-1 ${getTypeStyles()}
        transition-all duration-300 ease-out
        ${transition === "bounce" ? "animate-bounce" : ""}
        ${
          transition === "fade"
            ? "opacity-100 transition-opacity duration-500"
            : ""
        }
        ${transition === "slide" ? "translate-y-0" : ""}
        ${transition === "zoom" ? "scale-105" : ""}
        ${
          isExiting
            ? "opacity-0 translate-y-2 scale-95"
            : "opacity-100 translate-y-0 scale-100"
        }
        ${className || ""}
        hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5
      `}
      role="alert"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => closeOnClick && handleClose()}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-gray-50/20 dark:from-gray-800 dark:via-transparent dark:to-gray-700/20 pointer-events-none" />

      {showIcon && (
        <div
          className={`relative flex-shrink-0 w-7 h-7 rounded-full ${getIconBgColor()} ${getIconColor()} 
                      flex items-center justify-center shadow-lg ring-1 ring-black/10 dark:ring-white/20`}
          aria-hidden="true"
        >
          {getIcon()}
        </div>
      )}

      <div className="relative flex-1 min-w-0">
        <p
          className={`text-sm font-semibold leading-snug tracking-tight 
                ${theme === "dark" ? "text-white" : "text-gray-900"} 
                dark:text-gray-100`}
        >
          {message}
        </p>
      </div>
      {/* SVG Button */}
      {/* <button
        onClick={handleClose}
        className="relative flex-shrink-0 left-1.5 text-gray-400 dark:text-gray-500 cursor-pointer 
                   hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 
                   focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600
                   rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 hover:rotate-90"
        aria-label="Close notification"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button> */}
      {/* Icon Button  */}
      <button
        onClick={handleClose}
        className="relative flex-shrink-0 left-1.5 text-gray-400 dark:text-gray-500 cursor-pointer 
             hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 
             focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600
             rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 hover:rotate-90"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>

      {showProgressBar && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100/80 dark:bg-gray-800/70 overflow-hidden rounded-b-xl">
          <div
            className={`${getProgressColor()} h-full animate-progress relative overflow-hidden shadow-sm`}
            style={{ animationDuration: `${duration}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-gray-200/20 animate-shimmer" />
          </div>
        </div>
      )}

      <style>{`
        @keyframes progress { from { width: 100%; } to { width: 0%; } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        .animate-progress { animation: progress linear forwards; }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
    </div>
  );
};

export default Toast;
