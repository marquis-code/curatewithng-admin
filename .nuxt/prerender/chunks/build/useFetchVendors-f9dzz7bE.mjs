import { ref } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/index.mjs';
import { G as GATEWAY_ENDPOINT_WITH_AUTH } from './axios.config-DHAaROs1.mjs';
import { u as useCustomToast } from './server.mjs';

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
    var _a, _b, _c;
    loading.value = true;
    try {
      const response = await vendor_api.getVendors();
      const resData = (_a = response.data) == null ? void 0 : _a.data;
      vendors.value = Array.isArray(resData) ? resData : (resData == null ? void 0 : resData.data) || [];
    } catch (error) {
      showToast({ title: "Error", message: ((_c = (_b = error == null ? void 0 : error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) || "Failed to fetch vendors", toastType: "error" });
    } finally {
      loading.value = false;
    }
  };
  const fetchStats = async () => {
    var _a;
    try {
      const response = await vendor_api.getStats();
      stats.value = ((_a = response.data) == null ? void 0 : _a.data) || response.data || null;
    } catch (error) {
    }
  };
  const approveVendor = async (id) => {
    var _a, _b;
    actionLoading.value = true;
    try {
      await vendor_api.approve(id);
      showToast({ title: "Success", message: "Vendor approved successfully", toastType: "success" });
      await fetchVendors();
    } catch (error) {
      showToast({ title: "Error", message: ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Failed to approve vendor", toastType: "error" });
    } finally {
      actionLoading.value = false;
    }
  };
  const rejectVendor = async (id) => {
    var _a, _b;
    actionLoading.value = true;
    try {
      await vendor_api.reject(id);
      showToast({ title: "Success", message: "Vendor rejected successfully", toastType: "success" });
      await fetchVendors();
    } catch (error) {
      showToast({ title: "Error", message: ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Failed to reject vendor", toastType: "error" });
    } finally {
      actionLoading.value = false;
    }
  };
  return { vendors, stats, loading, actionLoading, fetchVendors, fetchStats, approveVendor, rejectVendor };
};

export { useFetchVendors as u };
//# sourceMappingURL=useFetchVendors-f9dzz7bE.mjs.map
