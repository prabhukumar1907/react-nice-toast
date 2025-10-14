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
  CircleCheck,
} from "lucide-react";

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
  closeOnClick = false,
  pauseOnHover = false,
  theme = "light",
  autoClose = true,
  showCloseButton = true,
  transition = "slide",
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!autoClose) return;
    if (!duration || paused) return;

    const timer = setTimeout(() => handleClose(), duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, paused, autoClose]);

  const handleClose = (): void => {
    setIsExiting(true);
    setTimeout(() => onRemove(id), 300);
  };

  const handleMouseEnter = () => pauseOnHover && setPaused(true);
  const handleMouseLeave = () => pauseOnHover && setPaused(false);

  const getTypeStyles = (): string => {
    switch (type) {
      case ToastType.SUCCESS:
        return theme === "dark"
          ? "bg-emerald-950/90 border border-emerald-800/50 shadow-2xl shadow-emerald-900/50"
          : "bg-white border border-emerald-200 shadow-2xl shadow-emerald-500/10";
      case ToastType.ERROR:
        return theme === "dark"
          ? "bg-red-950/90 border border-red-800/50 shadow-2xl shadow-red-900/50"
          : "bg-white border border-red-200 shadow-2xl shadow-red-500/10";
      case ToastType.WARNING:
        return theme === "dark"
          ? "bg-amber-950/90 border border-amber-800/50 shadow-2xl shadow-amber-900/50"
          : "bg-white border border-amber-200 shadow-2xl shadow-amber-500/10";
      case ToastType.LOADING:
        return theme === "dark"
          ? "bg-blue-950/90 border border-blue-800/50 shadow-2xl shadow-blue-900/50"
          : "bg-white border border-blue-200 shadow-2xl shadow-blue-500/10";
      case ToastType.UPDATE:
        return theme === "dark"
          ? "bg-indigo-950/90 border border-indigo-800/50 shadow-2xl shadow-indigo-900/50"
          : "bg-white border border-indigo-200 shadow-2xl shadow-indigo-500/10";
      case ToastType.DELETE:
        return theme === "dark"
          ? "bg-red-950/90 border border-red-900/50 shadow-2xl shadow-red-900/50"
          : "bg-white border border-red-300 shadow-2xl shadow-red-600/10";
      case ToastType.UPLOAD:
        return theme === "dark"
          ? "bg-purple-950/90 border border-purple-800/50 shadow-2xl shadow-purple-900/50"
          : "bg-white border border-purple-200 shadow-2xl shadow-purple-500/10";
      case ToastType.DOWNLOAD:
        return theme === "dark"
          ? "bg-cyan-950/90 border border-cyan-800/50 shadow-2xl shadow-cyan-900/50"
          : "bg-white border border-cyan-200 shadow-2xl shadow-cyan-500/10";
      case ToastType.NETWORK:
        return theme === "dark"
          ? "bg-teal-950/90 border border-teal-800/50 shadow-2xl shadow-teal-900/50"
          : "bg-white border border-teal-200 shadow-2xl shadow-teal-500/10";
      case ToastType.OFFLINE:
        return theme === "dark"
          ? "bg-gray-900/90 border border-gray-700/50 shadow-2xl shadow-gray-900/50"
          : "bg-white border border-gray-300 shadow-2xl shadow-gray-500/10";
      case ToastType.CUSTOM:
        return theme === "dark"
          ? "bg-purple-950/90 border border-purple-700/50 shadow-2xl shadow-purple-900/50"
          : "bg-white border border-purple-300 shadow-2xl shadow-purple-600/10";
      default:
        return theme === "dark"
          ? "bg-blue-950/90 border border-blue-800/50 shadow-2xl shadow-blue-900/50"
          : "bg-white border border-blue-200 shadow-2xl shadow-blue-500/10";
    }
  };

  const getIconBgColor = (): string => {
    switch (type) {
      case ToastType.SUCCESS:
        return "bg-gradient-to-br from-emerald-400 to-emerald-600";
      case ToastType.ERROR:
        return "bg-gradient-to-br from-red-400 to-red-600";
      case ToastType.WARNING:
        return "bg-gradient-to-br from-amber-400 to-amber-600";
      case ToastType.LOADING:
        return "bg-gradient-to-br from-blue-400 to-blue-600";
      case ToastType.UPDATE:
        return "bg-gradient-to-br from-indigo-400 to-indigo-600";
      case ToastType.DELETE:
        return "bg-gradient-to-br from-red-500 to-red-700";
      case ToastType.UPLOAD:
        return "bg-gradient-to-br from-purple-400 to-purple-600";
      case ToastType.DOWNLOAD:
        return "bg-gradient-to-br from-cyan-400 to-cyan-600";
      case ToastType.NETWORK:
        return "bg-gradient-to-br from-teal-400 to-teal-600";
      case ToastType.OFFLINE:
        return "bg-gradient-to-br from-gray-400 to-gray-600";
      case ToastType.CUSTOM:
        return "bg-gradient-to-br from-purple-500 to-purple-700";
      default:
        return "bg-gradient-to-br from-blue-400 to-blue-600";
    }
  };

  const getProgressColor = (): string => {
    switch (type) {
      case ToastType.SUCCESS:
        return "bg-emerald-500";
      case ToastType.ERROR:
        return "bg-red-500";
      case ToastType.WARNING:
        return "bg-amber-500";
      case ToastType.LOADING:
        return "bg-blue-500";
      case ToastType.UPDATE:
        return "bg-indigo-500";
      case ToastType.DELETE:
        return "bg-red-600";
      case ToastType.UPLOAD:
        return "bg-purple-500";
      case ToastType.DOWNLOAD:
        return "bg-cyan-500";
      case ToastType.NETWORK:
        return "bg-teal-500";
      case ToastType.OFFLINE:
        return "bg-gray-500";
      case ToastType.CUSTOM:
        return "bg-purple-600";
      default:
        return "bg-blue-500";
    }
  };

  const getIcon = (): JSX.Element => {
    const iconClass = "w-4 h-4";

    switch (type) {
      case ToastType.SUCCESS:
        return <CircleCheck className={`${iconClass} rnt-icon-success`} />;
      case ToastType.ERROR:
        return <XCircle className={`${iconClass} rnt-icon-error`} />;
      case ToastType.WARNING:
        return <AlertTriangle className={`${iconClass} rnt-icon-warning`} />;
      case ToastType.INFO:
        return <Info className={`${iconClass} rnt-icon-info`} />;
      case ToastType.LOADING:
        return <Loader2 className={`${iconClass} animate-spin`} />;
      case ToastType.UPDATE:
        return <RefreshCw className={`${iconClass} rnt-icon-update`} />;
      case ToastType.DELETE:
        return <Trash2 className={`${iconClass} rnt-icon-delete`} />;
      case ToastType.UPLOAD:
        return <Upload className={`${iconClass} rnt-icon-upload`} />;
      case ToastType.DOWNLOAD:
        return <Download className={`${iconClass} rnt-icon-download`} />;
      case ToastType.NETWORK:
        return <Wifi className={`${iconClass} rnt-icon-network`} />;
      case ToastType.OFFLINE:
        return <WifiOff className={`${iconClass} rnt-icon-offline`} />;
      case ToastType.CUSTOM:
        return <Star className={`${iconClass} rnt-icon-custom`} />;
      default:
        return <Info className={`${iconClass} rnt-icon-info`} />;
    }
  };

  const getTransitionClass = (): string => {
    if (isExiting) return "rnt-toast-exit";
    switch (transition) {
      case "bounce":
        return "rnt-toast-bounce";
      case "fade":
        return "rnt-toast-fade";
      case "zoom":
        return "rnt-toast-zoom";
      case "slide":
        return "rnt-toast-slide";
      case "slide-down":
        return "rnt-animate-slide-down";
      case "zoom-down":
        return "rnt-animate-zoom-down";
      default:
        return "rnt-toast-slide";
    }
  };

  return (
    <div
      className={`
        rnt-toast ${getTransitionClass()}
        relative overflow-hidden flex items-center gap-2 
        min-w-[250px] max-w-md px-2 py-1.5 rounded-lg
        ${className ? className : getTypeStyles() || ""}
        backdrop-blur-xl
      `}
      role="alert"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        if (closeOnClick && e.target === e.currentTarget) handleClose();
      }}
    >
      {showIcon && (
        <div
          className={`
            rnt-icon-container
            relative flex-shrink-0 w-6 h-6 rounded-full ${getIconBgColor()}
            flex items-center justify-center text-white shadow-lg
          `}
          aria-hidden="true"
        >
          {getIcon()}
        </div>
      )}

      <div className="relative flex-1 min-w-0">
        <p
          className={`text-sm font-semibold leading-snug
                ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}
        >
          {message}
        </p>
      </div>

      {showCloseButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="rnt-btn-close relative flex-shrink-0 text-gray-400 hover:cursor-pointer dark:text-gray-500
             hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 
             focus:outline-none rounded-full p-1 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {showProgressBar && duration && autoClose && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/5 dark:bg-white/5 overflow-hidden rounded-b-xl">
          <div
            className={`rnt-progress-bar-animated ${getProgressColor()} h-full`}
            style={{
              animationDuration: `${duration}ms`,
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rnt-shimmer" />
          </div>
        </div>
      )}

      <style>{`
        /* --- All CSS animations & classes updated with rnt- prefix --- */

        .rnt-toast { will-change: transform, opacity; }
        .rnt-toast-slide { animation: rnt-slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .rnt-toast-bounce { animation: rnt-bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .rnt-toast-fade { animation: rnt-fadeIn 0.3s ease-out; }
        .rnt-toast-zoom { animation: rnt-zoomIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .rnt-toast-exit { animation: rnt-slideOut 0.3s cubic-bezier(0.4, 0, 1, 1) forwards; }
        .rnt-animate-slide-down { animation: rnt-slideDown 0.45s ease-out forwards; }
        .rnt-animate-zoom-down { animation: rnt-zoomDown 0.45s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

        @keyframes rnt-slideIn { from { transform: translateX(calc(100% + 24px)); opacity:0; } to { transform: translateX(0); opacity:1; } }
        @keyframes rnt-slideOut { from { transform: translateX(0); opacity:1; } to { transform: translateX(calc(100% + 24px)); opacity:0; } }
        @keyframes rnt-bounceIn { 0% { transform: translateX(calc(100% + 24px)) scale(0.8); opacity:0; } 50% { transform: translateX(-10px) scale(1.05); opacity:1; } 100% { transform: translateX(0) scale(1); } }
        @keyframes rnt-fadeIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
        @keyframes rnt-zoomIn { from { transform:scale(0); opacity:0; } to { transform:scale(1); opacity:1; } }
        @keyframes rnt-slideDown { 0% { opacity:0; transform: translateY(-40px); } 60% { opacity:1; transform: translateY(8px); } 100% { opacity:1; transform: translateY(0); } }
        @keyframes rnt-zoomDown { 0% { opacity:0; transform:scale(0.8) translateY(-25px); } 60% { opacity:1; transform:scale(1.05) translateY(4px); } 100% { opacity:1; transform:scale(1) translateY(0); } }

        /* Icon Animations */
        .rnt-icon-container { animation: rnt-iconPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        @keyframes rnt-iconPop { 0% { transform: scale(0) rotate(-180deg); } 50% { transform: scale(1.2) rotate(10deg); } 100% { transform: scale(1) rotate(0deg); } }
        .rnt-icon-success { animation: rnt-iconSuccess 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        @keyframes rnt-iconSuccess { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
        .rnt-icon-error { animation: rnt-iconError 0.5s ease-out; }
        @keyframes rnt-iconError { 0%,100%{transform:rotate(0deg);} 25%{transform:rotate(-10deg);} 75%{transform:rotate(10deg);} }
        .rnt-icon-warning { animation: rnt-iconWarning 0.6s ease-out; }
        @keyframes rnt-iconWarning { 0%,100%{transform:rotate(0deg);} 25%{transform:rotate(20deg);} 75%{transform:rotate(-20deg);} }
        .rnt-icon-info { animation: rnt-iconInfo 0.4s ease-out; }
        @keyframes rnt-iconInfo { from{transform:scale(0);opacity:0;} to{transform:scale(1);opacity:1;} }
        .rnt-icon-update { animation: rnt-iconUpdate 2s linear infinite; }
        @keyframes rnt-iconUpdate { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .rnt-icon-delete { animation: rnt-iconDelete 0.5s ease-out; }
        @keyframes rnt-iconDelete { 0%{transform:scale(0) rotate(0deg);} 50%{transform:scale(1.3) rotate(180deg);} 100%{transform:scale(1) rotate(360deg);} }
        .rnt-icon-upload { animation: rnt-iconUpload 0.6s ease-out; }
        @keyframes rnt-iconUpload { 0%{transform:translateY(20px);opacity:0;} 60%{transform:translateY(-5px);opacity:1;} 100%{transform:translateY(0);} }
        .rnt-icon-download { animation: rnt-iconDownload 0.6s ease-out; }
        @keyframes rnt-iconDownload { 0%{transform:translateY(-20px);opacity:0;} 60%{transform:translateY(5px);opacity:1;} 100%{transform:translateY(0);} }
        .rnt-icon-network { animation: rnt-iconNetwork 1.5s ease-in-out infinite; }
        @keyframes rnt-iconNetwork { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.5;transform:scale(1.1);} }
        .rnt-icon-offline { animation: rnt-iconOffline 0.5s ease-out; }
        @keyframes rnt-iconOffline { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        .rnt-icon-custom { animation: rnt-iconCustom 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        @keyframes rnt-iconCustom { 0%{transform:rotate(0deg) scale(0);} 50%{transform:rotate(180deg) scale(1.3);} 100%{transform:rotate(360deg) scale(1);} }

        /* Ripple */
        .rnt-ripple { position:absolute; inset:-4px; border:3px solid currentColor; border-radius:50%; animation:rnt-ripple 0.8s ease-out; pointer-events:none; }
        @keyframes rnt-ripple { 0%{transform:scale(0.8);opacity:1;} 100%{transform:scale(1.8);opacity:0;} }

        /* Progress */
        .rnt-progress-bar-animated { animation: rnt-progressReduce linear forwards; box-shadow:0 0 10px currentColor; }
        @keyframes rnt-progressReduce { from{width:100%;} to{width:0%;} }

        .rnt-shimmer { animation:rnt-shimmer 2s infinite; }
        @keyframes rnt-shimmer { 0%{transform:translateX(-100%);} 100%{transform:translateX(200%);} }

        .rnt-btn-close:hover { transform: rotate(90deg); }
        .rnt-btn-close:active { transform: rotate(90deg) scale(0.9); }

        .rnt-toast:hover { transform: translateY(-2px); transition: transform 0.2s ease; }
        .rnt-toast:hover .rnt-icon-container { transform: scale(1.05); transition: transform 0.2s ease; }
      `}</style>
    </div>
  );
};

export default Toast;
