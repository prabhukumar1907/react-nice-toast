// types.ts
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

export const Position = {
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
} as const;

export type Position = (typeof Position)[keyof typeof Position];

export type Theme = 'light' | 'dark';
export type Transition = 'fade' | 'slide' | 'bounce'|'zoom'|'slide-down'|'zoom-down';

export interface ToastOptions {
  type?: ToastType;
  duration?: number; 
  position?: Position;
  showProgressBar?: boolean;
  showIcon?: boolean;
  closeOnClick?: boolean;
  newestOnTop?:boolean;
  pauseOnHover?: boolean;
  theme?: Theme;
  transition?: Transition;
  className?: string;
}

export interface ToastData extends Required<Omit<ToastOptions, 'position' | 'className'>> {
  id: number;
  message: string;
  className?: string;
}

export type ToastListener = (toasts: ToastData[]) => void;
