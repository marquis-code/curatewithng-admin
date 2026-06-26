import { ref } from 'vue';
import { io, Socket } from 'socket.io-client';
import { useUser } from '../auth/user';
import { useRuntimeConfig } from '#app';
import { useCustomToast } from '../../core/useCustomToast';

export const useNotifications = () => {
  const { user, token } = useUser();
  const config = useRuntimeConfig();
  const { showToast } = useCustomToast();
  
  const socket = ref<Socket | null>(null);
  const unreadCount = ref(0);
  const notifications = ref<any[]>([]);
  const loading = ref(false);

  const connectSocket = () => {
    if (!token.value) return;

    socket.value = io(config.public.apiBase, {
      auth: { token: token.value }
    });

    socket.value.on('connect', () => {
      console.log('Admin connected to realtime notifications');
    });

    socket.value.on('new_notification', (data) => {
      unreadCount.value++;
      notifications.value.unshift(data);
      showToast({
        title: data.title,
        message: data.body,
        type: 'info'
      });
    });
  };

  const disconnectSocket = () => {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  };

  const fetchNotifications = async () => {
    if (!token.value) return;
    loading.value = true;
    try {
      const { data } = await useFetch<any>(`${config.public.apiBase}/notifications?limit=50`, {
        headers: { Authorization: `Bearer ${token.value}` }
      });
      if (data.value && data.value.data) {
        notifications.value = data.value.data;
      }
    } catch (e) {
      console.error('Failed to fetch notifications', e);
    } finally {
      loading.value = false;
    }
  };

  const fetchUnreadCount = async () => {
    if (!token.value) return;
    try {
      const { data } = await useFetch<any>(`${config.public.apiBase}/notifications/unread-count`, {
        headers: { Authorization: `Bearer ${token.value}` }
      });
      if (data.value) {
        unreadCount.value = data.value.count;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const markAsRead = async (id: string) => {
    if (!token.value) return;
    try {
      await useFetch(`${config.public.apiBase}/notifications/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token.value}` }
      });
      const index = notifications.value.findIndex(n => n._id === id);
      if (index !== -1 && !notifications.value[index].isRead) {
        notifications.value[index].isRead = true;
        unreadCount.value = Math.max(0, unreadCount.value - 1);
      }
    } catch (e) {
      console.error('Failed to mark read', e);
    }
  };

  const markAllAsRead = async () => {
    if (!token.value) return;
    try {
      await useFetch(`${config.public.apiBase}/notifications/read-all`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` }
      });
      notifications.value.forEach(n => n.isRead = true);
      unreadCount.value = 0;
    } catch (e) {
      console.error('Failed to mark all read', e);
    }
  };

  return {
    socket,
    unreadCount,
    notifications,
    loading,
    connectSocket,
    disconnectSocket,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
  };
};
