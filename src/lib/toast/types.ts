export const ToastType = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  LOADING: 'loading',
  UPDATE: 'update',
  DELETE: 'delete',
  UPLOAD: 'upload',
  DOWNLOAD: 'download',
  NETWORK: 'network',
  OFFLINE: 'offline',
  CUSTOM: 'custom',
} as const;

export type ToastType = (typeof ToastType)[keyof typeof ToastType];

// Toast Positions
export const Position = {
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
} as const;

export type Position = (typeof Position)[keyof typeof Position];

export interface ToastOptions {
  type?: ToastType;
  duration?: number;
  position?: Position;
  className?: string;
}

export interface ToastPromiseOptions {
  pending: string | ToastOptions;
  success: string | ToastOptions;
  error: string | ToastOptions;
}

export interface ToastData extends Required<Omit<ToastOptions, 'position' | 'className'>> {
  id: number;
  message: string;
  className?: string;
}

export type ToastListener = (toasts: ToastData[]) => void;
