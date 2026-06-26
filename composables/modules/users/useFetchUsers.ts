import { ref } from 'vue';
import { user_api } from '~/api_factory/modules/user';
import { useCustomToast } from '~/composables/core/useCustomToast';

export const useFetchUsers = () => {
  const users = ref([]);
  const stats = ref<any>(null);
  const loading = ref(false);
  const { showToast } = useCustomToast();

  const fetchUsers = async () => {
    loading.value = true;
    try {
      const response = await user_api.getUsers();
      const resData = response.data?.data;
      users.value = Array.isArray(resData) ? resData : (resData?.data || []);
    } catch (error: any) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to fetch users", toastType: "error" });
    } finally {
      loading.value = false;
    }
  };

  const fetchStats = async () => {
    try {
      const response = await user_api.getStats();
      stats.value = response.data?.data || response.data || null;
    } catch (error: any) {}
  };

  const toggleUserStatus = async (id: string) => {
    try {
      await user_api.toggleActive(id);
      showToast({ title: "Success", message: "User status updated", toastType: "success" });
      await fetchUsers();
    } catch (error: any) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to update status", toastType: "error" });
    }
  };

  return { users, stats, loading, fetchUsers, fetchStats, toggleUserStatus };
};
