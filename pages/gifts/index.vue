<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-heading font-bold text-slate-900 mb-1">Gifts</h1>
        <p class="text-slate-500">Manage platform gift listings</p>
      </div>
    </div>

    <div class="card overflow-hidden">
      <!-- Toolbar -->
      <div class="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div class="relative w-full max-w-sm">
          <input type="text" v-model="searchQuery" placeholder="Search gifts by name..." class="input-field !py-2 w-full pl-10" />
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <div class="flex gap-3">
          <select v-model="statusFilter" class="input-field !py-2 !w-48">
            <option value="">All Statuses</option>
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-white border-b border-slate-200 text-sm font-semibold text-slate-600">
              <th class="p-4">Gift Info</th>
              <th class="p-4">Vendor</th>
              <th class="p-4">Price</th>
              <th class="p-4">Status</th>
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
            <tr v-else-if="filteredGifts.length === 0" class="border-b border-slate-100 bg-white">
              <td colspan="5" class="p-8 text-center text-slate-500">No gifts found</td>
            </tr>
            <tr v-else v-for="gift in filteredGifts" :key="gift._id" class="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors">
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                    <img v-if="gift.images && gift.images.length > 0" :src="gift.images[0]" alt="Gift Image" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
                      <Image class="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <div class="font-medium text-slate-900 line-clamp-1">{{ gift.name }}</div>
                    <div class="text-xs text-slate-500 capitalize">{{ gift.category || 'Uncategorized' }} • {{ gift.budgetTier }}</div>
                  </div>
                </div>
              </td>
              <td class="p-4 text-sm text-slate-600 font-medium">{{ gift.vendorId?.businessName || 'Unknown Vendor' }}</td>
              <td class="p-4 font-bold text-slate-900">₦{{ gift.price?.toLocaleString() || 0 }}</td>
              <td class="p-4">
                <span :class="gift.isApproved ? 'badge-active' : 'badge-pending'">
                  {{ gift.isApproved ? 'APPROVED' : 'PENDING' }}
                </span>
                <span v-if="gift.isFeatured" class="badge-active ml-2 !bg-amber-50 !text-amber-800 !border-amber-200">Featured</span>
              </td>
              <td class="p-4 text-right">
                <button @click="openGiftDrawer(gift)" class="text-primary-600 hover:text-primary-800 font-medium text-sm border border-primary-200 px-3 py-1 rounded-lg hover:bg-primary-50 transition-colors">
                  Review
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Gift Detail Drawer -->
    <FloatingDrawer v-model="drawerOpen" title="Gift Review">
      <div v-if="selectedGift" class="space-y-6">
        
        <div class="w-full h-56 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center relative group">
          <img v-if="selectedGift.images && selectedGift.images.length > 0" :src="selectedGift.images[0]" class="w-full h-full object-cover" />
          <Image v-else class="w-12 h-12 text-slate-400" />
          <div v-if="selectedGift.images?.length > 1" class="absolute bottom-3 right-3 bg-slate-900/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            +{{ selectedGift.images.length - 1 }} more
          </div>
        </div>

        <div>
          <h4 class="text-xl font-bold text-slate-900">{{ selectedGift.name }}</h4>
          <p class="text-slate-500 text-sm mt-1 leading-relaxed">{{ selectedGift.description || 'No description provided' }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Price</div>
            <div class="font-bold text-slate-900 text-lg">₦{{ selectedGift.price?.toLocaleString() || 0 }}</div>
          </div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Stock Level</div>
            <div class="font-bold text-slate-900 text-lg" :class="selectedGift.stock > 0 ? 'text-primary-700' : 'text-danger-600'">
              {{ selectedGift.stock }} Units
            </div>
          </div>
        </div>

        <!-- Tag Classifications -->
        <div class="space-y-4">
          <div>
            <div class="text-xs text-slate-500 font-bold mb-2 uppercase tracking-wider">Classification</div>
            <div class="flex flex-wrap gap-2">
              <span class="px-2.5 py-1 bg-primary-50 text-primary-700 border border-primary-100 rounded-full text-xs font-semibold uppercase">{{ selectedGift.category }}</span>
              <span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-semibold uppercase">{{ selectedGift.budgetTier }} TIER</span>
            </div>
          </div>
          
          <div v-if="selectedGift.occasions?.length">
            <div class="text-xs text-slate-500 font-bold mb-2 uppercase tracking-wider">Occasions</div>
            <div class="flex flex-wrap gap-2">
              <span v-for="occ in selectedGift.occasions" :key="occ" class="px-2.5 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-full text-xs font-medium capitalize">{{ occ.replace('-', ' ') }}</span>
            </div>
          </div>

          <div v-if="selectedGift.recipientTypes?.length">
            <div class="text-xs text-slate-500 font-bold mb-2 uppercase tracking-wider">Recipients</div>
            <div class="flex flex-wrap gap-2">
              <span v-for="rec in selectedGift.recipientTypes" :key="rec" class="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-xs font-medium capitalize">{{ rec }}</span>
            </div>
          </div>
        </div>
        
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
           <div class="text-xs text-slate-400 font-medium mb-2 uppercase tracking-wider">Vendor Information</div>
           <div class="flex items-center gap-3">
             <div class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
               {{ selectedGift.vendorId?.businessName?.charAt(0) || 'V' }}
             </div>
             <div>
               <div class="font-bold text-slate-900">{{ selectedGift.vendorId?.businessName || 'Unknown Vendor' }}</div>
               <div class="text-xs text-slate-500">@{{ selectedGift.vendorId?.slug || 'slug-unavailable' }}</div>
             </div>
           </div>
        </div>
        
        <div class="pt-4 border-t border-slate-100 space-y-3">
          <h5 class="text-sm font-bold text-slate-900 mb-4">Gift Actions</h5>
          
          <button v-if="!selectedGift.isApproved" @click="handleApprove" :disabled="actionLoading" class="w-full btn-primary py-3 flex justify-center items-center gap-2">
            <CheckCircle class="w-5 h-5" />
            <span v-if="actionLoading">Processing...</span>
            <span v-else>Approve Gift</span>
          </button>
          
          <button @click="handleFeature" :disabled="actionLoading" class="w-full px-4 py-3 rounded-xl border border-amber-200 text-amber-700 bg-amber-50 font-medium hover:bg-amber-100 transition-colors flex justify-center items-center gap-2">
            <Star class="w-5 h-5" />
            <span v-if="actionLoading">Processing...</span>
            <span v-else>{{ selectedGift.isFeatured ? 'Remove Feature' : 'Feature Gift' }}</span>
          </button>
          
          <button @click="handleDelete" :disabled="actionLoading" class="w-full px-4 py-3 rounded-xl border border-slate-200 text-danger-600 font-medium hover:bg-danger-50 transition-colors flex justify-center items-center gap-2">
            <Trash2 class="w-5 h-5" />
            <span v-if="actionLoading">Processing...</span>
            <span v-else>Delete Gift</span>
          </button>
        </div>
      </div>
    </FloatingDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Search, Image, CheckCircle, Star, Trash2 } from 'lucide-vue-next';
import FloatingDrawer from '~/components/ui/FloatingDrawer.vue';
import { useFetchGifts } from '~/composables/modules/gifts/useFetchGifts';

definePageMeta({ middleware: 'auth' });
useHead({ title: 'Gifts — Admin Portal' });

const { gifts, loading, actionLoading, fetchGifts, approveGift, featureGift, deleteGift } = useFetchGifts();
const searchQuery = ref('');
const statusFilter = ref('');

const drawerOpen = ref(false);
const selectedGift = ref<any>(null);

const filteredGifts = computed(() => {
  let result = gifts.value || [];
  if (statusFilter.value) {
    const isLookingForApproved = statusFilter.value === 'APPROVED';
    result = result.filter((g: any) => g.isApproved === isLookingForApproved);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter((g: any) => 
      g.name?.toLowerCase().includes(q)
    );
  }
  return result;
});

const openGiftDrawer = (gift: any) => {
  selectedGift.value = gift;
  drawerOpen.value = true;
};

const handleApprove = async () => {
  if (selectedGift.value) {
    await approveGift(selectedGift.value._id);
    selectedGift.value.isApproved = true;
  }
};

const handleFeature = async () => {
  if (selectedGift.value) {
    await featureGift(selectedGift.value._id);
    selectedGift.value.isFeatured = !selectedGift.value.isFeatured;
  }
};

const handleDelete = async () => {
  if (selectedGift.value && confirm('Are you sure you want to delete this gift?')) {
    await deleteGift(selectedGift.value._id);
    drawerOpen.value = false;
  }
};

onMounted(() => {
  fetchGifts();
});
</script>
