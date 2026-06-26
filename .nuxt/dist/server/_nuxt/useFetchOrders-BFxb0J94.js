import { ref } from "vue";
import { G as GATEWAY_ENDPOINT_WITH_AUTH } from "./axios.config-DHAaROs1.js";
import { u as useCustomToast } from "../server.mjs";
const order_api = {
  getOrders: () => GATEWAY_ENDPOINT_WITH_AUTH.get("/orders"),
  getStats: () => GATEWAY_ENDPOINT_WITH_AUTH.get("/orders/stats"),
  updateStatus: (id, payload) => GATEWAY_ENDPOINT_WITH_AUTH.patch(`/orders/${id}/status`, payload)
};
const useFetchOrders = () => {
  const orders = ref([]);
  const stats = ref(null);
  const loading = ref(false);
  const { showToast } = useCustomToast();
  const fetchOrders = async () => {
    loading.value = true;
    try {
      const response = await order_api.getOrders();
      const resData = response.data?.data;
      orders.value = Array.isArray(resData) ? resData : resData?.data || [];
    } catch (error) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to fetch orders", toastType: "error" });
    } finally {
      loading.value = false;
    }
  };
  const fetchStats = async () => {
    try {
      const response = await order_api.getStats();
      stats.value = response.data?.data || response.data || null;
    } catch (error) {
    }
  };
  return { orders, stats, loading, fetchOrders, fetchStats };
};
export {
  useFetchOrders as u
};
//# sourceMappingURL=useFetchOrders-BFxb0J94.js.map
