import { ref } from 'vue';
import { gift_api } from '~/api_factory/modules/gift';
import { useCustomToast } from '~/composables/core/useCustomToast';

export const useFetchGifts = () => {
  const gifts = ref([]);
  const loading = ref(false);
  const actionLoading = ref(false);
  const { showToast } = useCustomToast();

  const fetchGifts = async () => {
    loading.value = true;
    try {
      const response = await gift_api.getGifts();
      const resData = response.data?.data;
      gifts.value = Array.isArray(resData) ? resData : (resData?.data || []);
    } catch (error: any) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to fetch gifts", toastType: "error" });
    } finally {
      loading.value = false;
    }
  };

  const approveGift = async (id: string) => {
    actionLoading.value = true;
    try {
      await gift_api.approve(id);
      showToast({ title: "Success", message: "Gift approved successfully", toastType: "success" });
      await fetchGifts();
    } catch (error: any) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to approve gift", toastType: "error" });
    } finally {
      actionLoading.value = false;
    }
  };

  const featureGift = async (id: string) => {
    actionLoading.value = true;
    try {
      await gift_api.feature(id);
      showToast({ title: "Success", message: "Gift featured status updated", toastType: "success" });
      await fetchGifts();
    } catch (error: any) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to update feature status", toastType: "error" });
    } finally {
      actionLoading.value = false;
    }
  };

  const deleteGift = async (id: string) => {
    actionLoading.value = true;
    try {
      await gift_api.delete(id);
      showToast({ title: "Success", message: "Gift deleted successfully", toastType: "success" });
      await fetchGifts();
    } catch (error: any) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to delete gift", toastType: "error" });
    } finally {
      actionLoading.value = false;
    }
  };

  return { gifts, loading, actionLoading, fetchGifts, approveGift, featureGift, deleteGift };
};
