import { ref } from 'vue';
import { GATEWAY_ENDPOINT_WITH_AUTH as api } from '~/api_factory/axios.config';

export const useSettings = () => {
  const settings = ref<any>(null);
  const loading = ref(false);
  const actionLoading = ref(false);

  const fetchSettings = async () => {
    loading.value = true;
    try {
      const res = await api.get('/settings');
      settings.value = res.data;
    } catch (err: any) {
      console.error('Failed to fetch settings', err);
    } finally {
      loading.value = false;
    }
  };

  const updateSettings = async (payload: any) => {
    actionLoading.value = true;
    try {
      const res = await api.put('/settings', payload);
      settings.value = res.data;
      return res.data;
    } catch (err: any) {
      console.error('Failed to update settings', err);
      throw err;
    } finally {
      actionLoading.value = false;
    }
  };

  return {
    settings,
    loading,
    actionLoading,
    fetchSettings,
    updateSettings
  };
};
