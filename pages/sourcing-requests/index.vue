<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-heading font-bold text-slate-900 mb-1">Sourcing Requests</h1>
        <p class="text-slate-500">Manage bespoke gift requests and send quotes</p>
      </div>
    </div>

    <!-- Trending Ideas Board -->
    <div class="mb-8" v-if="trending.length > 0">
      <h3 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span class="text-xl">🔥</span> Trending Ideas
      </h3>
      <div class="flex gap-4 overflow-x-auto pb-4">
        <div v-for="idea in trending" :key="idea._id" class="card min-w-[250px] p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-orange-100 flex-shrink-0 relative">
          <div v-if="idea.isTrending" class="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">TRENDING</div>
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-slate-900 line-clamp-2" :title="idea.giftIdea">{{ idea.giftIdea }}</h4>
            <div class="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md text-xs font-bold">{{ idea.requestCount }} requests</div>
          </div>
          <div class="text-xs text-slate-500">Last requested: {{ new Date(idea.latestRequestAt).toLocaleDateString() }}</div>
        </div>
      </div>
    </div>

    <div class="card overflow-hidden">
      <!-- Toolbar -->
      <div class="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div class="relative w-full max-w-sm">
          <input type="text" v-model="searchQuery" placeholder="Search by idea or contact name..." class="input-field !py-2 w-full pl-10" />
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <select v-model="statusFilter" class="input-field !py-2 !w-48">
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="QUOTED">Quoted</option>
          <option value="PAYMENT_RECEIVED">Payment Received</option>
          <option value="SOURCING">Sourcing</option>
          <option value="FULFILLED">Fulfilled</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-white border-b border-slate-200 text-sm font-semibold text-slate-600">
              <th class="p-4">Gift Idea</th>
              <th class="p-4">Contact</th>
              <th class="p-4">Ideal Budget</th>
              <th class="p-4">Status</th>
              <th class="p-4">Date</th>
              <th class="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading" v-for="i in 5" :key="`skeleton-${i}`" class="border-b border-slate-100 bg-white">
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div></td>
              <td class="p-4 text-right"><div class="h-8 w-20 bg-slate-200 rounded ml-auto animate-pulse"></div></td>
            </tr>
            <tr v-else-if="filteredRequests.length === 0" class="border-b border-slate-100 bg-white">
              <td colspan="6" class="p-8 text-center text-slate-500">No sourcing requests found</td>
            </tr>
            <tr v-else v-for="req in filteredRequests" :key="req._id" class="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors">
              <td class="p-4">
                <div class="font-medium text-slate-900">{{ req.giftIdea }}</div>
                <div class="text-xs text-slate-500">{{ req.occasion || 'Unspecified Occasion' }} • {{ req.timeline }}</div>
              </td>
              <td class="p-4">
                <div class="text-sm font-medium text-slate-700">{{ req.contactName }}</div>
                <div class="text-xs text-slate-500">{{ req.contactEmail }}</div>
              </td>
              <td class="p-4 text-sm font-medium text-slate-700">
                <span v-if="req.budgetSignal?.ideal">₦{{ req.budgetSignal.ideal.toLocaleString() }}</span>
                <span v-else>N/A</span>
                <span class="text-xs text-slate-400 font-normal block">{{ req.budgetSignal?.flexibility }}</span>
              </td>
              <td class="p-4">
                <span :class="getStatusBadge(req.status)">
                  {{ req.status }}
                </span>
              </td>
              <td class="p-4 text-sm text-slate-600">{{ new Date(req.createdAt).toLocaleDateString() }}</td>
              <td class="p-4 text-right">
                <button @click="openDrawer(req)" class="text-primary-600 hover:text-primary-800 font-medium text-sm border border-primary-200 px-3 py-1 rounded-lg hover:bg-primary-50 transition-colors">
                  Review
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Detail Drawer -->
    <FloatingDrawer v-model="drawerOpen" title="Sourcing Request Details">
      <div v-if="selectedRequest" class="space-y-6">
        
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
          <div v-if="selectedRequest.isTrending" class="absolute top-4 right-4 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">TRENDING</div>
          <div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Gift Idea</div>
          <div class="font-bold text-lg text-slate-900 mb-2">{{ selectedRequest.giftIdea }}</div>
          <span :class="getStatusBadge(selectedRequest.status)">{{ selectedRequest.status }}</span>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Ideal Budget</div>
            <div class="font-bold text-slate-900" v-if="selectedRequest.budgetSignal?.ideal">₦{{ selectedRequest.budgetSignal.ideal.toLocaleString() }}</div>
            <div class="text-xs text-slate-500 mt-1">{{ selectedRequest.budgetSignal?.flexibility }}</div>
          </div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Timeline</div>
            <div class="font-bold text-slate-900">{{ selectedRequest.timeline }}</div>
          </div>
        </div>

        <div>
          <h5 class="text-sm font-bold text-slate-900 mb-2">Contact Details</h5>
          <div class="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
            <div><span class="font-medium text-slate-900">Name:</span> {{ selectedRequest.contactName }}</div>
            <div><span class="font-medium text-slate-900">Email:</span> {{ selectedRequest.contactEmail }}</div>
            <div><span class="font-medium text-slate-900">Phone:</span> {{ selectedRequest.contactPhone }}</div>
            <div v-if="selectedRequest.additionalNotes" class="pt-2 mt-2 border-t border-slate-200">
              <span class="font-medium text-slate-900 block mb-1">Notes:</span> 
              {{ selectedRequest.additionalNotes }}
            </div>
          </div>
        </div>

        <!-- Escrow / Quote Panel -->
        <div class="border-t border-slate-200 pt-6">
          <h5 class="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-primary-500"></span>
            Send Quote to User
          </h5>
          
          <div v-if="selectedRequest.status === 'PENDING'" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Cost of Gift (₦)</label>
              <input type="number" v-model="inputQuoteAmount" class="input-field" placeholder="e.g. 75000" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Concierge Note (Internal)</label>
              <textarea v-model="conciergeNote" rows="2" class="input-field" placeholder="Found a vendor in Lekki..."></textarea>
            </div>
            <button @click="handleSetQuote" :disabled="actionLoading || !inputQuoteAmount" class="btn-primary w-full py-3">
              {{ actionLoading ? 'Processing...' : 'Calculate Fee & Send Quote' }}
            </button>
            <p class="text-xs text-slate-500 text-center">This will calculate the tiered sourcing fee and trigger an email to the user.</p>
          </div>

          <div v-else class="bg-primary-50 p-4 rounded-xl border border-primary-100">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-primary-800 font-medium">Cost of Gift:</span>
              <span class="font-bold text-primary-900">₦{{ selectedRequest.quote?.amount?.toLocaleString() || 0 }}</span>
            </div>
            <div class="flex justify-between items-center mb-3">
              <span class="text-sm text-primary-800 font-medium">Sourcing Fee:</span>
              <span class="font-bold text-primary-900">₦{{ selectedRequest.quote?.sourcingFee?.toLocaleString() || 0 }}</span>
            </div>
            <div class="flex justify-between items-center pt-3 border-t border-primary-200">
              <span class="text-sm font-bold text-primary-900">Total Quote:</span>
              <span class="text-xl font-black text-primary-900">₦{{ selectedRequest.quote?.total?.toLocaleString() || 0 }}</span>
            </div>
            <div class="mt-4 text-xs text-center text-primary-700">
              Sent at: {{ new Date(selectedRequest.quote?.sentAt).toLocaleString() }}
            </div>
          </div>

        </div>
      </div>
    </FloatingDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Search } from 'lucide-vue-next';
import FloatingDrawer from '~/components/ui/FloatingDrawer.vue';
import { useFetchSourcingRequests } from '~/composables/modules/sourcing-requests/useFetchSourcingRequests';

definePageMeta({ middleware: 'auth' });
useHead({ title: 'Sourcing Requests — Admin Portal' });

const { requests, trending, loading, actionLoading, fetchRequests, fetchTrending, updateRequest, setQuote } = useFetchSourcingRequests();

const searchQuery = ref('');
const statusFilter = ref('');

const drawerOpen = ref(false);
const selectedRequest = ref<any>(null);

const inputQuoteAmount = ref<number | ''>('');
const conciergeNote = ref('');

const filteredRequests = computed(() => {
  let result = requests.value;
  if (statusFilter.value) {
    result = result.filter((r: any) => r.status === statusFilter.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter((r: any) => 
      r.giftIdea?.toLowerCase().includes(q) || 
      r.contactName?.toLowerCase().includes(q)
    );
  }
  return result;
});

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'PENDING': return 'badge-pending';
    case 'QUOTED': return 'bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold';
    case 'PAYMENT_RECEIVED': return 'badge-active'; // green
    case 'SOURCING': return 'bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full text-xs font-bold';
    case 'FULFILLED': return 'bg-slate-800 text-white px-2.5 py-0.5 rounded-full text-xs font-bold';
    case 'CANCELLED': return 'badge-neutral';
    default: return 'badge-neutral';
  }
};

const openDrawer = (req: any) => {
  selectedRequest.value = req;
  inputQuoteAmount.value = req.quote?.amount || '';
  conciergeNote.value = req.conciergeNote || '';
  drawerOpen.value = true;
};

const handleSetQuote = async () => {
  if (!selectedRequest.value || !inputQuoteAmount.value) return;
  
  if (conciergeNote.value) {
    await updateRequest(selectedRequest.value._id, { conciergeNote: conciergeNote.value });
  }

  const updated = await setQuote(selectedRequest.value._id, Number(inputQuoteAmount.value));
  selectedRequest.value = updated;
};

onMounted(() => {
  fetchRequests(1, 100);
  fetchTrending();
});
</script>
