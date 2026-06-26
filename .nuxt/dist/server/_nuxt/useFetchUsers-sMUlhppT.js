import { ref } from "vue";
import { G as GATEWAY_ENDPOINT_WITH_AUTH } from "./axios.config-DHAaROs1.js";
import { u as useCustomToast } from "../server.mjs";
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
    loading.value = true;
    try {
      const response = await user_api.getUsers();
      const resData = response.data?.data;
      users.value = Array.isArray(resData) ? resData : resData?.data || [];
    } catch (error) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to fetch users", toastType: "error" });
    } finally {
      loading.value = false;
    }
  };
  const fetchStats = async () => {
    try {
      const response = await user_api.getStats();
      stats.value = response.data?.data || response.data || null;
    } catch (error) {
    }
  };
  const toggleUserStatus = async (id) => {
    try {
      await user_api.toggleActive(id);
      showToast({ title: "Success", message: "User status updated", toastType: "success" });
      await fetchUsers();
    } catch (error) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to update status", toastType: "error" });
    }
  };
  return { users, stats, loading, fetchUsers, fetchStats, toggleUserStatus };
};
export {
  useFetchUsers as u
};
//# sourceMappingURL=useFetchUsers-sMUlhppT.js.map
