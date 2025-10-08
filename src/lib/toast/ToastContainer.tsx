import { useState, useEffect } from "react";
import { toastManager } from "./toastManager";
import Toast from "./Toast";
import { Position, type ToastData } from "./types";

interface ToastContainerProps {
  position?: Position;
  maxToasts?: number;
  showIcon?: boolean;
  showProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  theme?: "light" | "dark";
  transition?: "slide" | "zoom" | "bounce" | "fade";

}

const ToastContainer: React.FC<ToastContainerProps> = ({
  position = Position.TOP_RIGHT,
  maxToasts = 5,
  showIcon = true,
  showProgressBar = true,
  closeOnClick = false,
  pauseOnHover = false,
  theme = "light",
  transition = "slide",
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    return unsubscribe;
  }, []);

  const getPositionStyles = (): string => {
    switch (position) {
      case Position.TOP_LEFT:
        return "top-4 left-4";
      case Position.TOP_CENTER:
        return "top-4 left-1/2 -translate-x-1/2";
      case Position.TOP_RIGHT:
        return "top-4 right-4";
      case Position.BOTTOM_LEFT:
        return "bottom-4 left-4";
      case Position.BOTTOM_CENTER:
        return "bottom-4 left-1/2 -translate-x-1/2";
      case Position.BOTTOM_RIGHT:
        return "bottom-4 right-4";
      default:
        return "top-4 right-4";
    }
  };

  const visibleToasts = toasts.slice(-maxToasts);

  return (
    <div
      className={`fixed ${getPositionStyles()} z-50 flex flex-col gap-2`}
      aria-live="polite"
      aria-atomic="false"
    >
      {visibleToasts.map((toastData) => (
        <Toast
          key={toastData.id}
          {...toastData}
          onRemove={toastManager.remove.bind(toastManager)}
          showIcon={showIcon}
          showProgressBar={showProgressBar}
          closeOnClick={closeOnClick}
          pauseOnHover={pauseOnHover}
          theme={theme}
          transition={transition}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
