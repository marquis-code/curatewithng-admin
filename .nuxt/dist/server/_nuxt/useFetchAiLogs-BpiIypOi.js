import { ref } from "vue";
import { G as GATEWAY_ENDPOINT_WITH_AUTH } from "./axios.config-DHAaROs1.js";
import { u as useCustomToast } from "../server.mjs";
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
    loading.value = true;
    try {
      const response = await ai_api.getSessions();
      const resData = response.data?.data;
      logs.value = Array.isArray(resData) ? resData : resData?.data || [];
    } catch (error) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to fetch AI logs", toastType: "error" });
    } finally {
      loading.value = false;
    }
  };
  const fetchStats = async () => {
    try {
      const response = await ai_api.getStats();
      stats.value = response.data?.data || response.data || null;
    } catch (error) {
    }
  };
  return { logs, stats, loading, fetchLogs, fetchStats };
};
export {
  useFetchAiLogs as u
};
//# sourceMappingURL=useFetchAiLogs-BpiIypOi.js.map
