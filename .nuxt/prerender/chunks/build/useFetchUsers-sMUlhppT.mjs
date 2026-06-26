import { ref } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/index.mjs';
import { G as GATEWAY_ENDPOINT_WITH_AUTH } from './axios.config-DHAaROs1.mjs';
import { u as useCustomToast } from './server.mjs';

const user_api = {
  getUsers: () => GATEWAY_ENDPOINT_WITH_AUTH.get("/users"),
  getStats: () => GATEWAY_ENDPOINT_WITH_AUTH.get("/users/stats"),
  toggleActive: (id) => GATEWAY_ENDPOINT_WITH_AUTH.patch(`/users/${id}/toggle-active`)
};
const useFetchUsers = () => {
  const users = ref([]);
  const stats = ref(null);
  const loading = ref(false);
  const { showToast } = useCustomToast();
  const fetchUsers = async () => {
    var _a, _b, _c;
    loading.value = true;
    try {
      const response = await user_api.getUsers();
      const resData = (_a = response.data) == null ? void 0 : _a.data;
      users.value = Array.isArray(resData) ? resData : (resData == null ? void 0 : resData.data) || [];
    } catch (error) {
      showToast({ title: "Error", message: ((_c = (_b = error == null ? void 0 : error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) || "Failed to fetch users", toastType: "error" });
    } finally {
      loading.value = false;
    }
  };
  const fetchStats = async () => {
    var _a;
    try {
      const response = await user_api.getStats();
      stats.value = ((_a = response.data) == null ? void 0 : _a.data) || response.data || null;
    } catch (error) {
    }
  };
  const toggleUserStatus = async (id) => {
    var _a, _b;
    try {
      await user_api.toggleActive(id);
      showToast({ title: "Success", message: "User status updated", toastType: "success" });
      await fetchUsers();
    } catch (error) {
      showToast({ title: "Error", message: ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Failed to update status", toastType: "error" });
    }
  };
  return { users, stats, loading, fetchUsers, fetchStats, toggleUserStatus };
};

export { useFetchUsers as u };
//# sourceMappingURL=useFetchUsers-sMUlhppT.mjs.map
