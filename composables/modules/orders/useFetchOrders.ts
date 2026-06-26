import { ref } from 'vue';
import { order_api } from '~/api_factory/modules/order';
import { useCustomToast } from '~/composables/core/useCustomToast';

export const useFetchOrders = () => {
  const orders = ref([]);
  const stats = ref<any>(null);
  const loading = ref(false);
  const { showToast } = useCustomToast();

  const fetchOrders = async () => {
    loading.value = true;
    try {
      const response = await order_api.getOrders();
      const resData = response.data?.data;
      orders.value = Array.isArray(resData) ? resData : (resData?.data || []);
    } catch (error: any) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to fetch orders", toastType: "error" });
    } finally {
      loading.value = false;
    }
  };

  const fetchStats = async () => {
    try {
      const response = await order_api.getStats();
      stats.value = response.data?.data || response.data || null;
    } catch (error: any) {}
  };

  return { orders, stats, loading, fetchOrders, fetchStats };
};
