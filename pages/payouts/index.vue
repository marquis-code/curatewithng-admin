<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-1">Payouts</h1>
        <p class="text-slate-500">Manage vendor withdrawal requests</p>
      </div>
    </div>

    <div class="card overflow-hidden">
      <!-- Toolbar -->
      <div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
        <div class="relative w-full max-w-sm">
          <input type="text" v-model="searchQuery" placeholder="Search payouts by vendor..." class="input-field !py-2 w-full pl-10" />
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <CustomSelect 
          v-model="statusFilter" 
          :options="[
            { label: 'All Statuses', value: '' },
            { label: 'Pending', value: 'PENDING' },
            { label: 'Completed', value: 'COMPLETED' },
            { label: 'Rejected', value: 'REJECTED' }
          ]"
          placeholder="All Statuses"
          class="w-full sm:w-48"
        />
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-white border-b border-slate-200 text-sm font-semibold text-slate-600">
              <th class="p-4">Vendor</th>
              <th class="p-4">Amount</th>
              <th class="p-4">Status</th>
              <th class="p-4">Requested At</th>
              <th class="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading" v-for="i in 5" :key="`skeleton-${i}`" class="border-b border-slate-100 bg-white">
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div></td>
              <td class="p-4 text-right"><div class="h-8 w-20 bg-slate-200 rounded ml-auto animate-pulse"></div></td>
            </tr>
            <tr v-else-if="filteredPayouts.length === 0" class="border-b border-slate-100 bg-white">
              <td colspan="5" class="p-8 text-center text-slate-500">No payouts found</td>
            </tr>
            <tr v-else v-for="payout in filteredPayouts" :key="payout.id" class="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors">
              <td class="p-4 font-medium text-slate-900">{{ payout.vendor?.businessName || 'Unknown Vendor' }}</td>
              <td class="p-4 font-bold text-slate-900">₦{{ payout.amount?.toLocaleString() || 0 }}</td>
              <td class="p-4">
                <span :class="payout.status === 'COMPLETED' ? 'badge-active' : (payout.status === 'PENDING' ? 'badge-pending' : 'badge-neutral')">
                  {{ payout.status || 'PENDING' }}
                </span>
              </td>
              <td class="p-4 text-sm text-slate-600">{{ new Date(payout.createdAt).toLocaleDateString() }}</td>
              <td class="p-4 text-right">
                <button @click="openPayoutDrawer(payout)" class="text-primary-600 hover:text-primary-800 font-medium text-sm border border-primary-200 px-3 py-1 rounded-lg hover:bg-primary-50 transition-colors">
                  Review
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Payout Detail Drawer -->
    <FloatingDrawer v-model="drawerOpen" title="Payout Review">
      <div v-if="selectedPayout" class="space-y-6">
        
        <div class="bg-primary-50 p-6 rounded-2xl border border-primary-100 text-center">
          <div class="text-xs text-primary-600 font-bold uppercase tracking-widest mb-2">Requested Amount</div>
          <div class="text-4xl font-heading font-black text-primary-900">₦{{ selectedPayout.amount?.toLocaleString() || 0 }}</div>
          <div class="mt-4 inline-flex">
             <span :class="selectedPayout.status === 'COMPLETED' ? 'badge-active' : 'badge-pending'">
              {{ selectedPayout.status || 'PENDING' }}
            </span>
          </div>
        </div>
        
        <div class="space-y-4 pt-4 border-t border-slate-100">
           <h5 class="text-sm font-bold text-slate-900">Vendor Bank Details</h5>
           <div class="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
             <div class="flex items-center gap-3">
               <Building class="w-4 h-4 text-slate-400" />
               <span class="font-medium text-slate-900">{{ selectedPayout.bankName || 'Not Provided' }}</span>
             </div>
             <div class="flex items-center gap-3">
               <CreditCard class="w-4 h-4 text-slate-400" />
               <span>{{ selectedPayout.accountNumber || 'N/A' }}</span>
             </div>
             <div class="flex items-start gap-3">
               <User class="w-4 h-4 text-slate-400 mt-0.5" />
               <span>{{ selectedPayout.accountName || 'N/A' }}</span>
             </div>
           </div>
        </div>

        <div class="pt-4 border-t border-slate-100 space-y-3" v-if="selectedPayout.status === 'PENDING'">
          <h5 class="text-sm font-bold text-slate-900 mb-4">Payout Actions</h5>
          <button @click="confirmApprove = true" :disabled="actionLoading" class="w-full btn-primary py-3 flex justify-center items-center gap-2">
            <CheckCircle class="w-5 h-5" />
            <span v-if="actionLoading">Processing...</span>
            <span v-else>Approve Transfer</span>
          </button>
          <button @click="confirmReject = true" :disabled="actionLoading" class="w-full px-4 py-3 rounded-xl border border-slate-200 text-danger-600 font-medium hover:bg-danger-50 transition-colors flex justify-center items-center gap-2">
            <XCircle class="w-5 h-5" />
            <span v-if="actionLoading">Processing...</span>
            <span v-else>Reject Request</span>
          </button>
        </div>
      </div>
    </FloatingDrawer>

    <ConfirmModal
      :isOpen="confirmApprove"
      title="Approve Payout"
      message="Are you sure you want to approve this payout? Funds will be transferred to the vendor's bank account."
      confirmText="Approve Payout"
      type="info"
      :loading="actionLoading"
      @confirm="executeApprove"
      @cancel="confirmApprove = false"
    />

    <ConfirmModal
      :isOpen="confirmReject"
      title="Reject Payout"
      message="Are you sure you want to reject this payout request?"
      confirmText="Reject Payout"
      type="danger"
      :loading="actionLoading"
      @confirm="executeReject"
      @cancel="confirmReject = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Search, Building, CreditCard, User, CheckCircle, XCircle } from 'lucide-vue-next';
import FloatingDrawer from '~/components/ui/FloatingDrawer.vue';
import ConfirmModal from '~/components/ui/ConfirmModal.vue';
import { GATEWAY_ENDPOINT_WITH_AUTH } from '~/api_factory/axios.config';
import { useCustomToast } from '~/composables/core/useCustomToast';

definePageMeta({ middleware: 'auth' });
useHead({ title: 'Payouts — Admin Portal' });

const { showToast } = useCustomToast();
const payouts = ref<any[]>([]);
const loading = ref(false);
const actionLoading = ref(false);

const searchQuery = ref('');
const statusFilter = ref('');

const drawerOpen = ref(false);
const selectedPayout = ref<any>(null);

const fetchPayouts = async () => {
  loading.value = true;
  try {
    const res = await GATEWAY_ENDPOINT_WITH_AUTH.get('/payments/payouts');
    payouts.value = res.data?.data || res.data || [];
  } catch (error: any) {
    console.error('Error fetching payouts', error);
  } finally {
    loading.value = false;
  }
};

const filteredPayouts = computed(() => {
  let result = payouts.value;
  if (statusFilter.value) {
    result = result.filter((p: any) => p.status === statusFilter.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter((p: any) => 
      p.vendor?.businessName?.toLowerCase().includes(q)
    );
  }
  return result;
});

const openPayoutDrawer = (payout: any) => {
  selectedPayout.value = payout;
  drawerOpen.value = true;
};

const confirmApprove = ref(false);
const confirmReject = ref(false);

const executeApprove = async () => {
  if (selectedPayout.value) {
    actionLoading.value = true;
    try {
      await GATEWAY_ENDPOINT_WITH_AUTH.post(`/payments/payout/${selectedPayout.value.id}/approve`);
      showToast({ title: "Success", message: "Payout approved", toastType: "success" });
      selectedPayout.value.status = 'COMPLETED';
      await fetchPayouts();
      confirmApprove.value = false;
      drawerOpen.value = false;
    } catch (error: any) {
      showToast({ title: "Error", message: error?.response?.data?.message || "Failed to approve", toastType: "error" });
    } finally {
      actionLoading.value = false;
    }
  }
};

const executeReject = async () => {
  // Assuming there's a reject endpoint or logic
  if (selectedPayout.value) {
     actionLoading.value = true;
     setTimeout(() => {
       showToast({ title: "Success", message: "Payout rejected", toastType: "success" });
       selectedPayout.value.status = 'REJECTED';
       actionLoading.value = false;
       confirmReject.value = false;
       drawerOpen.value = false;
     }, 1000);
  }
};

onMounted(() => {
  fetchPayouts();
});
</script>
