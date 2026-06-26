import { ref } from 'vue';
import { GATEWAY_ENDPOINT_WITH_AUTH as api } from '~/api_factory/axios.config';

export const useFetchSourcingRequests = () => {
  const requests = ref<any[]>([]);
  const trending = ref<any[]>([]);
  const loading = ref(false);
  const actionLoading = ref(false);
  const total = ref(0);

  const fetchRequests = async (page = 1, limit = 50) => {
    loading.value = true;
    try {
      const res = await api.get(`/sourcing-requests?page=${page}&limit=${limit}`);
      requests.value = res.data?.data || res.data || [];
      total.value = res.data?.total || 0;
    } catch (err: any) {
      console.error('Failed to fetch sourcing requests', err);
    } finally {
      loading.value = false;
    }
  };

  const fetchTrending = async () => {
    try {
      const res = await api.get('/sourcing-requests/trending');
      trending.value = res.data || [];
    } catch (err: any) {
      console.error('Failed to fetch trending ideas', err);
    }
  };

  const updateRequest = async (id: string, payload: any) => {
    actionLoading.value = true;
    try {
      const res = await api.patch(`/sourcing-requests/${id}`, payload);
      // Update local state
      const idx = requests.value.findIndex(r => r._id === id);
      if (idx !== -1) {
        requests.value[idx] = res.data;
      }
      return res.data;
    } catch (err: any) {
      console.error('Failed to update sourcing request', err);
      throw err;
    } finally {
      actionLoading.value = false;
    }
  };

  const setQuote = async (id: string, amount: number) => {
    actionLoading.value = true;
    try {
      const res = await api.post(`/sourcing-requests/${id}/quote`, { amount });
      // Update local state
      const idx = requests.value.findIndex(r => r._id === id);
      if (idx !== -1) {
        requests.value[idx] = res.data;
      }
      return res.data;
    } catch (err: any) {
      console.error('Failed to set quote', err);
      throw err;
    } finally {
      actionLoading.value = false;
    }
  };

  return {
    requests,
    trending,
    loading,
    actionLoading,
    total,
    fetchRequests,
    fetchTrending,
    updateRequest,
    setQuote
  };
};
