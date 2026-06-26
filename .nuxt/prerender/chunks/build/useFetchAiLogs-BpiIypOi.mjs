import { ref } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/index.mjs';
import { G as GATEWAY_ENDPOINT_WITH_AUTH } from './axios.config-DHAaROs1.mjs';
import { u as useCustomToast } from './server.mjs';

const ai_api = {
  getSessions: () => GATEWAY_ENDPOINT_WITH_AUTH.get("/ai-curator/sessions/all"),
  getStats: () => GATEWAY_ENDPOINT_WITH_AUTH.get("/ai-curator/stats")
};
const useFetchAiLogs = () => {
  const logs = ref([]);
  const stats = ref(null);
  const loading = ref(false);
  const { showToast } = useCustomToast();
  const fetchLogs = async () => {
    var _a, _b, _c;
    loading.value = true;
    try {
      const response = await ai_api.getSessions();
      const resData = (_a = response.data) == null ? void 0 : _a.data;
      logs.value = Array.isArray(resData) ? resData : (resData == null ? void 0 : resData.data) || [];
    } catch (error) {
      showToast({ title: "Error", message: ((_c = (_b = error == null ? void 0 : error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) || "Failed to fetch AI logs", toastType: "error" });
    } finally {
      loading.value = false;
    }
  };
  const fetchStats = async () => {
    var _a;
    try {
      const response = await ai_api.getStats();
      stats.value = ((_a = response.data) == null ? void 0 : _a.data) || response.data || null;
    } catch (error) {
    }
  };
  return { logs, stats, loading, fetchLogs, fetchStats };
};

export { useFetchAiLogs as u };
//# sourceMappingURL=useFetchAiLogs-BpiIypOi.mjs.map
