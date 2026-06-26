import { ref } from 'vue';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  title?: string;
  message: string;
  type: ToastType;
  duration?: number;
}

// Global state outside the composable so it works anywhere (even in Axios interceptors)
const globalToasts = ref<ToastMessage[]>([]);

export const useCustomToast = () => {
  const toasts = globalToasts;

  const addToast = (message: string, type: ToastType = 'info', duration = 4000, title?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    toasts.value.push({ id, title, message, type, duration });

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  };

  const showToast = ({ title, message, toastType, duration = 3000 }: { title?: string, message: string, toastType: ToastType, duration?: number }) => {
    if (!import.meta.client) return;
    addToast(message, toastType, duration, title);
  };

  return {
    toasts,
    addToast,
    removeToast,
    showToast,
    success: (msg: string, d?: number) => addToast(msg, 'success', d),
    error: (msg: string, d?: number) => addToast(msg, 'error', d),
    warning: (msg: string, d?: number) => addToast(msg, 'warning', d),
    info: (msg: string, d?: number) => addToast(msg, 'info', d),
  };
};
