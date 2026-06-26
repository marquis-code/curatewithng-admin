<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-1">Vendors</h1>
        <p class="text-slate-500">Manage platform vendors and approvals</p>
      </div>
    </div>

    <div class="card overflow-hidden">
      <!-- Toolbar -->
      <div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
        <div class="relative w-full max-w-sm">
          <input type="text" v-model="searchQuery" placeholder="Search vendors by business name..." class="input-field !py-2 w-full pl-10" />
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <CustomSelect 
          v-model="statusFilter" 
          :options="[
            { label: 'All Statuses', value: '' },
            { label: 'Approved', value: 'APPROVED' },
            { label: 'Pending', value: 'PENDING' },
            { label: 'Rejected', value: 'REJECTED' },
            { label: 'Suspended', value: 'SUSPENDED' }
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
              <th class="p-4">Business</th>
              <th class="p-4">Owner Email</th>
              <th class="p-4">Status</th>
              <th class="p-4">Joined</th>
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
            <tr v-else-if="filteredVendors.length === 0" class="border-b border-slate-100 bg-white">
              <td colspan="5" class="p-8 text-center text-slate-500">No vendors found</td>
            </tr>
            <tr v-else v-for="vendor in filteredVendors" :key="vendor._id" class="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors">
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 uppercase">
                    {{ vendor.businessName?.substring(0, 2) || vendor.slug?.substring(0, 2) || 'V' }}
                  </div>
                  <div>
                    <div class="font-medium text-slate-900">{{ vendor.businessName || 'Unnamed Vendor' }}</div>
                    <div class="text-xs text-slate-500">@{{ vendor.slug || 'slug-unavailable' }}</div>
                  </div>
                </div>
              </td>
              <td class="p-4 text-sm text-slate-600">{{ vendor.userId?.email || 'No email attached' }}</td>
              <td class="p-4">
                <span :class="vendor.isApproved ? 'badge-active' : 'badge-pending'">
                  {{ vendor.isApproved ? 'APPROVED' : 'PENDING' }}
                </span>
              </td>
              <td class="p-4 text-sm text-slate-600">{{ new Date(vendor.createdAt).toLocaleDateString() }}</td>
              <td class="p-4 text-right">
                <button @click="openVendorDrawer(vendor)" class="text-primary-600 hover:text-primary-800 font-medium text-sm border border-primary-200 px-3 py-1 rounded-lg hover:bg-primary-50 transition-colors">
                  Review
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Vendor Detail Drawer -->
    <FloatingDrawer v-model="drawerOpen" title="Vendor Details">
      <div v-if="selectedVendor" class="space-y-6">
        <div class="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div class="w-16 h-16 rounded-2xl bg-primary-50 text-primary-800 flex items-center justify-center text-2xl font-bold uppercase">
            {{ selectedVendor.businessName?.charAt(0) || selectedVendor.slug?.charAt(0) || 'V' }}
          </div>
          <div>
            <h4 class="text-lg font-bold text-slate-900">{{ selectedVendor.businessName || 'Unnamed Vendor' }}</h4>
            <p class="text-slate-500 text-sm">@{{ selectedVendor.slug || 'slug-unavailable' }}</p>
            <p class="text-slate-500 text-xs mt-1">{{ selectedVendor.userId?.email }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Status</div>
            <span :class="selectedVendor.isApproved ? 'badge-active' : 'badge-pending'">
              {{ selectedVendor.isApproved ? 'APPROVED' : 'PENDING' }}
            </span>
          </div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Joined</div>
            <div class="font-medium text-slate-900">{{ new Date(selectedVendor.createdAt).toLocaleDateString() }}</div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-center">
            <div class="text-xs text-emerald-600 font-bold mb-1 uppercase tracking-wider">Total Earnings</div>
            <div class="font-bold text-emerald-900 text-xl">₦{{ selectedVendor.totalEarnings?.toLocaleString() || 0 }}</div>
          </div>
          <div class="bg-amber-50 p-4 rounded-xl border border-amber-100 text-center">
            <div class="text-xs text-amber-600 font-bold mb-1 uppercase tracking-wider">Pending Payout</div>
            <div class="font-bold text-amber-900 text-xl">₦{{ selectedVendor.pendingPayout?.toLocaleString() || 0 }}</div>
          </div>
        </div>

        <div class="space-y-4 pt-4 border-t border-slate-100">
          <h5 class="text-sm font-bold text-slate-900">Business Information</h5>
          <div class="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
            <div>
              <span class="font-medium text-slate-900 block mb-1">Description</span>
              <p class="text-sm">{{ selectedVendor.description || 'No description provided' }}</p>
            </div>
            <div v-if="selectedVendor.categories?.length > 0" class="pt-2">
              <span class="font-medium text-slate-900 block mb-2">Categories</span>
              <div class="flex flex-wrap gap-2">
                 <span v-for="cat in selectedVendor.categories" :key="cat" class="text-[10px] uppercase font-bold px-2 py-1 bg-slate-200 text-slate-700 rounded-md">
                   {{ cat }}
                 </span>
              </div>
            </div>
            <div v-if="selectedVendor.location" class="pt-2">
              <span class="font-medium text-slate-900 block mb-1">Location</span>
              <p>{{ selectedVendor.location.address }}</p>
              <p class="text-xs text-slate-500">{{ selectedVendor.location.city }}, {{ selectedVendor.location.state }}</p>
            </div>
          </div>
        </div>
        
        <div class="pt-4 border-t border-slate-100 space-y-3" v-if="!selectedVendor.isApproved">
          <h5 class="text-sm font-bold text-slate-900 mb-4">Approval Actions</h5>
          <button @click="confirmApprove = true" :disabled="actionLoading" class="w-full btn-primary py-3 flex justify-center items-center gap-2">
            <CheckCircle class="w-5 h-5" />
            <span v-if="actionLoading">Processing...</span>
            <span v-else>Approve Vendor</span>
          </button>
          <button @click="confirmReject = true" :disabled="actionLoading" class="w-full px-4 py-3 rounded-xl border border-slate-200 text-danger-600 font-medium hover:bg-danger-50 transition-colors flex justify-center items-center gap-2">
            <XCircle class="w-5 h-5" />
            <span v-if="actionLoading">Processing...</span>
            <span v-else>Reject Vendor</span>
          </button>
        </div>
      </div>
    </FloatingDrawer>

    <ConfirmModal
      :isOpen="confirmApprove"
      title="Approve Vendor"
      message="Are you sure you want to approve this vendor? They will be able to list gifts on the platform."
      confirmText="Approve"
      type="info"
      :loading="actionLoading"
      @confirm="executeApprove"
      @cancel="confirmApprove = false"
    />

    <ConfirmModal
      :isOpen="confirmReject"
      title="Reject Vendor"
      message="Are you sure you want to reject this vendor? This action cannot be undone easily."
      confirmText="Reject"
      type="danger"
      :loading="actionLoading"
      @confirm="executeReject"
      @cancel="confirmReject = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Search, CheckCircle, XCircle } from 'lucide-vue-next';
import FloatingDrawer from '~/components/ui/FloatingDrawer.vue';
import ConfirmModal from '~/components/ui/ConfirmModal.vue';
import { useFetchVendors } from '~/composables/modules/vendors/useFetchVendors';

definePageMeta({ middleware: 'auth' });
useHead({ title: 'Vendors — Admin Portal' });

const { vendors, loading, actionLoading, fetchVendors, approveVendor, rejectVendor } = useFetchVendors();
const searchQuery = ref('');
const statusFilter = ref('');

const drawerOpen = ref(false);
const selectedVendor = ref<any>(null);

const filteredVendors = computed(() => {
  let result = vendors.value;
  if (statusFilter.value) {
    if (statusFilter.value === 'APPROVED') {
       result = result.filter((v: any) => v.isApproved);
    } else if (statusFilter.value === 'PENDING') {
       result = result.filter((v: any) => !v.isApproved);
    }
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter((v: any) => 
      v.businessName?.toLowerCase().includes(q) || 
      v.userId?.email?.toLowerCase().includes(q) ||
      v.slug?.toLowerCase().includes(q)
    );
  }
  return result;
});

const openVendorDrawer = (vendor: any) => {
  selectedVendor.value = vendor;
  drawerOpen.value = true;
};

const confirmApprove = ref(false);
const confirmReject = ref(false);

const executeApprove = async () => {
  if (selectedVendor.value) {
    await approveVendor(selectedVendor.value._id);
    selectedVendor.value.isApproved = true;
    confirmApprove.value = false;
  }
};

const executeReject = async () => {
  if (selectedVendor.value) {
    await rejectVendor(selectedVendor.value._id);
    selectedVendor.value.isApproved = false;
    confirmReject.value = false;
    drawerOpen.value = false;
  }
};

onMounted(() => {
  fetchVendors();
});
</script>
