import { ToastType, type ToastData, type ToastListener, type ToastOptions } from "./types";

class ToastManager {
  private toasts: ToastData[] = [];
  private listeners: ToastListener[] = [];

  subscribe(listener: ToastListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach(listener => listener([...this.toasts]));
  }

  add(message: string, options: ToastOptions = {}): number {
    const id = Date.now() + Math.random();
    const newToast: ToastData = {
      id,
      message,
      type: options.type || ToastType.INFO,
      duration: options.duration || 3000,
      className: options.className,
    };
    this.toasts = [...this.toasts, newToast];
    this.notify();
    return id;
  }

  remove(id: number): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.notify();
  }

  clear(): void {
    this.toasts = [];
    this.notify();
  }
}

export const toastManager = new ToastManager();

// Main toast function
export const toast = (message: string, options?: ToastOptions): number => {
  return toastManager.add(message, options);
};

// Convenience methods
toast.success = (message: string, options?: Omit<ToastOptions, 'type'>): number => 
  toast(message, { ...options, type: ToastType.SUCCESS });

toast.error = (message: string, options?: Omit<ToastOptions, 'type'>): number => 
  toast(message, { ...options, type: ToastType.ERROR });

toast.warning = (message: string, options?: Omit<ToastOptions, 'type'>): number => 
  toast(message, { ...options, type: ToastType.WARNING });

toast.info = (message: string, options?: Omit<ToastOptions, 'type'>): number => 
  toast(message, { ...options, type: ToastType.INFO });

toast.dismiss = (id: number): void => toastManager.remove(id);
toast.clear = (): void => toastManager.clear();