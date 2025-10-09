import { ToastType, type ToastData, type ToastListener, type ToastOptions } from "./types";

class ToastManager {
  private toasts: ToastData[] = [];
  private listeners: ToastListener[] = [];

  subscribe(listener: ToastListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  add(message: string, options: ToastOptions = {}): number {
    const id = Date.now() + Math.random();

    const newToast: ToastData = {
      id,
      message,
      type: options.type || ToastType.INFO,
      duration: options.duration ?? 5000,
      showProgressBar: options.showProgressBar ?? true,
      showIcon: options.showIcon ?? true,
      closeOnClick: options.closeOnClick ?? true,
      pauseOnHover: options.pauseOnHover ?? true,
      showCloseButton:options.showCloseButton??true,
      autoClose:options.autoClose ?? true,
      theme: options.theme ?? "light",
      transition: options.transition ?? "zoom-down",
      newestOnTop: options.newestOnTop ?? false,
      className: options.className,
    };

    this.toasts = newToast.newestOnTop
      ? [newToast, ...this.toasts]
      : [...this.toasts, newToast];

    this.notify();
    return id;
  }

  update(id: number, options: Partial<Omit<ToastData, "id">>): void {
    this.toasts = this.toasts.map((toast) =>
      toast.id === id ? { ...toast, ...options } : toast
    );
    this.notify();
  }

  remove(id: number): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notify();
  }

  clear(): void {
    this.toasts = [];
    this.notify();
  }
}

// Singleton instance
export const toastManager = new ToastManager();

// Main toast function
export const toast = (message: string, options?: ToastOptions): number =>
  toastManager.add(message, options);

// Shortcut methods
toast.success = (message: string, options?: Omit<ToastOptions, "type">) =>
  toast(message, { ...options, type: ToastType.SUCCESS });
toast.error = (message: string, options?: Omit<ToastOptions, "type">) =>
  toast(message, { ...options, type: ToastType.ERROR });
toast.warning = (message: string, options?: Omit<ToastOptions, "type">) =>
  toast(message, { ...options, type: ToastType.WARNING });
toast.info = (message: string, options?: Omit<ToastOptions, "type">) =>
  toast(message, { ...options, type: ToastType.INFO });
toast.loading = (message: string, options?: Omit<ToastOptions, "type">) =>
  toast(message, { ...options, type: ToastType.LOADING });
toast.update = (message: string, options?: Omit<ToastOptions, "type">) =>
  toast(message, { ...options, type: ToastType.UPDATE });
toast.delete = (message: string, options?: Omit<ToastOptions, "type">) =>
  toast(message, { ...options, type: ToastType.DELETE });
toast.upload = (message: string, options?: Omit<ToastOptions, "type">) =>
  toast(message, { ...options, type: ToastType.UPLOAD });
toast.download = (message: string, options?: Omit<ToastOptions, "type">) =>
  toast(message, { ...options, type: ToastType.DOWNLOAD });
toast.network = (message: string, options?: Omit<ToastOptions, "type">) =>
  toast(message, { ...options, type: ToastType.NETWORK });
toast.offline = (message: string, options?: Omit<ToastOptions, "type">) =>
  toast(message, { ...options, type: ToastType.OFFLINE });
toast.custom = (message: string, options?: Omit<ToastOptions, "type">) =>
  toast(message, { ...options, type: ToastType.CUSTOM });

// Dismiss and clear
toast.dismiss = (id: number) => toastManager.remove(id);
toast.clear = () => toastManager.clear();

// Promise-based toast
interface PromiseToastOptions {
  loading: string;
  success: string;
  error: string;
  duration?: number;
}

toast.promise = <T>(
  promise: Promise<T>,
  messages: PromiseToastOptions
): Promise<T> => {
  const id = toast.loading(messages.loading, { duration: 999999 });
  promise
    .then((res) => {
      toastManager.update(id, {
        message: messages.success,
        type: ToastType.SUCCESS,
        duration: messages.duration ?? 3000,
      });
      return res;
    })
    .catch((err) => {
      toastManager.update(id, {
        message: messages.error,
        type: ToastType.ERROR,
        duration: messages.duration ?? 3000,
      });
      throw err;
    });
  return promise;
};
