import { ref } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/index.mjs';
import { G as GATEWAY_ENDPOINT_WITH_AUTH } from './axios.config-DHAaROs1.mjs';
import { u as useCustomToast } from './server.mjs';

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
    var _a, _b, _c;
    loading.value = true;
    try {
      const response = await order_api.getOrders();
      const resData = (_a = response.data) == null ? void 0 : _a.data;
      orders.value = Array.isArray(resData) ? resData : (resData == null ? void 0 : resData.data) || [];
    } catch (error) {
      showToast({ title: "Error", message: ((_c = (_b = error == null ? void 0 : error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) || "Failed to fetch orders", toastType: "error" });
    } finally {
      loading.value = false;
    }
  };
  const fetchStats = async () => {
    var _a;
    try {
      const response = await order_api.getStats();
      stats.value = ((_a = response.data) == null ? void 0 : _a.data) || response.data || null;
    } catch (error) {
    }
  };
  return { orders, stats, loading, fetchOrders, fetchStats };
};

export { useFetchOrders as u };
//# sourceMappingURL=useFetchOrders-BFxb0J94.mjs.map
