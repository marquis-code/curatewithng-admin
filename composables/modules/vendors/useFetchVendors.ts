import { ref } from 'vue';
import { vendor_api } from '~/api_factory/modules/vendor';
import { useCustomToast } from '~/composables/core/useCustomToast';

export const useFetchVendors = () => {
  const vendors = ref([]);
  const stats = ref<any>(null);
  const loading = ref(false);
  const actionLoading = ref(false);
  const { showToast } = useCustomToast();

  const fetchVendors = async () => {
    loading.value = true;
    try {
      const response = await vendor_api.getVendors();
      const resData = response.data?.data;
      vendors.value = Array.isArray(resData) ? resData : (resData?.data || []);
    } catch (error: any) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to fetch vendors", toastType: "error" });
    } finally {
      loading.value = false;
    }
  };

  const fetchStats = async () => {
    try {
      const response = await vendor_api.getStats();
      stats.value = response.data?.data || response.data || null;
    } catch (error: any) {}
  };

  const approveVendor = async (id: string) => {
    actionLoading.value = true;
    try {
      await vendor_api.approve(id);
      showToast({ title: "Success", message: "Vendor approved successfully", toastType: "success" });
      await fetchVendors();
    } catch (error: any) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to approve vendor", toastType: "error" });
    } finally {
      actionLoading.value = false;
    }
  };

  const rejectVendor = async (id: string) => {
    actionLoading.value = true;
    try {
      await vendor_api.reject(id);
      showToast({ title: "Success", message: "Vendor rejected successfully", toastType: "success" });
      await fetchVendors();
    } catch (error: any) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to reject vendor", toastType: "error" });
    } finally {
      actionLoading.value = false;
    }
  };

  return { vendors, stats, loading, actionLoading, fetchVendors, fetchStats, approveVendor, rejectVendor };
};
