import { ref } from "vue";
import { G as GATEWAY_ENDPOINT_WITH_AUTH } from "./axios.config-DHAaROs1.js";
import { u as useCustomToast } from "../server.mjs";
const vendor_api = {
  getVendors: () => GATEWAY_ENDPOINT_WITH_AUTH.get("/vendors"),
  getStats: () => GATEWAY_ENDPOINT_WITH_AUTH.get("/vendors/stats"),
  approve: (id) => GATEWAY_ENDPOINT_WITH_AUTH.post(`/vendors/${id}/approve`),
  reject: (id) => GATEWAY_ENDPOINT_WITH_AUTH.post(`/vendors/${id}/reject`),
  updateStatus: (id, payload) => GATEWAY_ENDPOINT_WITH_AUTH.patch(`/vendors/${id}/status`, payload)
};
const useFetchVendors = () => {
  const vendors = ref([]);
  const stats = ref(null);
  const loading = ref(false);
  const actionLoading = ref(false);
  const { showToast } = useCustomToast();
  const fetchVendors = async () => {
    loading.value = true;
    try {
      const response = await vendor_api.getVendors();
      const resData = response.data?.data;
      vendors.value = Array.isArray(resData) ? resData : resData?.data || [];
    } catch (error) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to fetch vendors", toastType: "error" });
    } finally {
      loading.value = false;
    }
  };
  const fetchStats = async () => {
    try {
      const response = await vendor_api.getStats();
      stats.value = response.data?.data || response.data || null;
    } catch (error) {
    }
  };
  const approveVendor = async (id) => {
    actionLoading.value = true;
    try {
      await vendor_api.approve(id);
      showToast({ title: "Success", message: "Vendor approved successfully", toastType: "success" });
      await fetchVendors();
    } catch (error) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to approve vendor", toastType: "error" });
    } finally {
      actionLoading.value = false;
    }
  };
  const rejectVendor = async (id) => {
    actionLoading.value = true;
    try {
      await vendor_api.reject(id);
      showToast({ title: "Success", message: "Vendor rejected successfully", toastType: "success" });
      await fetchVendors();
    } catch (error) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to reject vendor", toastType: "error" });
    } finally {
      actionLoading.value = false;
    }
  };
  return { vendors, stats, loading, actionLoading, fetchVendors, fetchStats, approveVendor, rejectVendor };
};
export {
  useFetchVendors as u
};
//# sourceMappingURL=useFetchVendors-f9dzz7bE.js.map
