<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-1">AI Curation Logs</h1>
        <p class="text-slate-500">View generative AI requests and responses</p>
      </div>
    </div>

    <div class="card overflow-hidden bg-white border border-slate-200 shadow-sm rounded-xl">
      <!-- Toolbar -->
      <div class="p-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4 bg-slate-50">
        <div class="relative w-full sm:max-w-sm">
          <input type="text" v-model="searchQuery" placeholder="Search prompts or recipients..." class="input-field !py-2 w-full pl-10 bg-white" />
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <CustomSelect 
          v-model="statusFilter" 
          :options="[
            { label: 'All Statuses', value: 'all' },
            { label: 'Converted', value: 'converted' },
            { label: 'Browsing', value: 'browsing' }
          ]"
          placeholder="All Statuses"
          class="w-full sm:w-48"
        />
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 text-sm font-semibold text-slate-600 border-b border-slate-200">
              <th class="p-4 rounded-tl-xl">Recipient</th>
              <th class="p-4">Occasion</th>
              <th class="p-4">Prompt Snippet</th>
              <th class="p-4">Status</th>
              <th class="p-4">Time</th>
              <th class="p-4 text-right rounded-tr-xl">Trace</th>
            </tr>
          </thead>
          <tbody class="text-sm text-slate-600">
            <tr v-if="loading" v-for="i in 5" :key="`skeleton-${i}`" class="border-b border-slate-100">
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-full animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div></td>
              <td class="p-4 text-right"><div class="h-8 w-20 bg-slate-200 rounded ml-auto animate-pulse"></div></td>
            </tr>
            <tr v-else-if="filteredLogs.length === 0" class="border-b border-slate-100">
              <td colspan="6" class="p-8 text-center text-slate-500">No logs found</td>
            </tr>
            <tr v-else v-for="log in filteredLogs" :key="log._id" class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td class="p-4">
                <div class="flex flex-col">
                  <span class="font-medium text-slate-900">{{ log.recipientProfile?.name || 'Anonymous' }}</span>
                  <span class="text-xs text-slate-500 capitalize">{{ log.recipientProfile?.relationship || 'N/A' }}</span>
                </div>
              </td>
              <td class="p-4">
                <span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium capitalize border border-slate-200">
                  {{ log.recipientProfile?.occasion || 'General' }}
                </span>
              </td>
              <td class="p-4 max-w-xs truncate font-mono text-xs text-slate-500">
                {{ log.aiPrompt }}
              </td>
              <td class="p-4">
                <span v-if="log.isConverted" class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium border border-emerald-200">Converted</span>
                <span v-else class="px-2 py-1 bg-slate-100 text-slate-500 rounded text-xs font-medium border border-slate-200">Browsing</span>
              </td>
              <td class="p-4 text-slate-500">{{ new Date(log.createdAt).toLocaleString() }}</td>
              <td class="p-4 text-right">
                <button @click="openLogDrawer(log)" class="text-primary-600 hover:text-primary-700 font-medium px-3 py-1 rounded hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-100">
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- AI Log Drawer -->
    <FloatingDrawer v-model="drawerOpen" title="AI Interaction Details">
      <div v-if="selectedLog" class="space-y-6">
        
        <!-- Recipient Profile -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-500 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <User class="w-4 h-4 text-primary-500" /> Recipient Profile
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="block text-xs text-slate-400 font-medium uppercase mb-1">Relationship</span>
              <span class="text-slate-900 font-medium capitalize">{{ selectedLog.recipientProfile?.relationship || 'N/A' }}</span>
            </div>
            <div>
              <span class="block text-xs text-slate-400 font-medium uppercase mb-1">Demographics</span>
              <span class="text-slate-900 font-medium capitalize">{{ selectedLog.recipientProfile?.age }} yrs • {{ selectedLog.recipientProfile?.gender }}</span>
            </div>
            <div>
              <span class="block text-xs text-slate-400 font-medium uppercase mb-1">Budget Range</span>
              <span class="text-slate-900 font-medium font-mono text-xs">
                ₦{{ (selectedLog.recipientProfile?.budgetMin || 0).toLocaleString() }} - ₦{{ (selectedLog.recipientProfile?.budgetMax || 0).toLocaleString() }}
              </span>
            </div>
            <div>
              <span class="block text-xs text-slate-400 font-medium uppercase mb-1">Occasion</span>
              <span class="text-slate-900 font-medium capitalize">{{ selectedLog.recipientProfile?.occasion }}</span>
            </div>
            <div class="col-span-2 mt-2">
              <span class="block text-xs text-slate-400 font-medium uppercase mb-2">Interests</span>
              <div class="flex flex-wrap gap-2">
                <span v-for="interest in selectedLog.recipientProfile?.interests || []" :key="interest" class="px-2 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-xs rounded">
                  {{ interest }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- System Prompt -->
        <div class="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-inner">
          <div class="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
            <Brain class="w-4 h-4 text-slate-500" /> Prompt Provided to AI
          </div>
          <div class="whitespace-pre-wrap leading-relaxed text-sm text-slate-700 font-mono text-xs overflow-x-auto">{{ selectedLog.aiPrompt || 'No prompt recorded' }}</div>
        </div>
        
        <!-- Recommendations -->
        <div class="bg-white p-5 rounded-xl border border-primary-100 shadow-sm">
          <div class="text-xs text-primary-600 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Sparkles class="w-4 h-4" /> AI Recommendations
          </div>
          
          <div v-if="selectedLog.recommendations && selectedLog.recommendations.length > 0" class="space-y-4">
            <div v-for="(rec, idx) in selectedLog.recommendations" :key="idx" class="p-4 rounded-lg border border-slate-100 bg-slate-50 flex flex-col gap-2">
              <div class="flex justify-between items-start">
                <div>
                  <div class="font-bold text-slate-900 flex items-center gap-2">
                    {{ rec.customName || 'Catalog Gift' }}
                    <span v-if="rec.isCustom" class="px-2 py-0.5 bg-primary-100 text-primary-700 text-[10px] uppercase font-bold rounded">Custom Idea</span>
                    <span v-else class="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold rounded">In Catalog</span>
                  </div>
                  <div v-if="rec.customDescription" class="text-sm text-slate-500 mt-1">{{ rec.customDescription }}</div>
                </div>
                <div class="flex flex-col items-end">
                  <div class="bg-white px-2 py-1 rounded shadow-sm border border-slate-200 text-xs font-bold font-mono">
                    Score: <span :class="rec.score >= 90 ? 'text-emerald-600' : 'text-slate-600'">{{ rec.score }}</span>
                  </div>
                  <div v-if="rec.estimatedPrice" class="text-xs font-mono font-medium text-slate-400 mt-1">~₦{{ rec.estimatedPrice.toLocaleString() }}</div>
                </div>
              </div>
              <div class="text-sm bg-white p-2 rounded border border-slate-100 text-slate-600 mt-1">
                <span class="font-medium text-slate-800">Reasoning:</span> {{ rec.reasoning }}
              </div>
              <div v-if="rec.giftId" class="text-xs text-slate-400 font-mono mt-1">Gift ID: {{ rec.giftId }}</div>
            </div>
          </div>
          <div v-else class="text-sm text-slate-500 italic p-4 text-center bg-slate-50 rounded-lg">
            No valid recommendations parsed.
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-xl border border-slate-200">
            <div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Conversion</div>
            <div class="font-bold text-slate-900 text-sm flex items-center gap-2">
              <div class="w-2 h-2 rounded-full" :class="selectedLog.isConverted ? 'bg-emerald-500' : 'bg-slate-300'"></div>
              {{ selectedLog.isConverted ? 'User Checked Out' : 'No Action Taken' }}
            </div>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200">
            <div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Timestamp</div>
            <div class="font-bold text-slate-900 text-sm">{{ new Date(selectedLog.createdAt).toLocaleString() }}</div>
          </div>
        </div>
        
      </div>
    </FloatingDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Search, User, Brain, Sparkles } from 'lucide-vue-next';
import FloatingDrawer from '~/components/ui/FloatingDrawer.vue';
import { useFetchAiLogs } from '~/composables/modules/ai/useFetchAiLogs';

definePageMeta({ middleware: 'auth' });
useHead({ title: 'AI Logs — Admin Portal' });

const { logs, loading, fetchLogs } = useFetchAiLogs();
const searchQuery = ref('');

const drawerOpen = ref(false);
const selectedLog = ref<any>(null);

const filteredLogs = computed(() => {
  if (!searchQuery.value) return logs.value;
  const q = searchQuery.value.toLowerCase();
  return logs.value.filter((l: any) => 
    l.aiPrompt?.toLowerCase().includes(q) ||
    l.recipientProfile?.name?.toLowerCase().includes(q) ||
    l.recipientProfile?.relationship?.toLowerCase().includes(q)
  );
});

const openLogDrawer = (log: any) => {
  selectedLog.value = log;
  drawerOpen.value = true;
};

onMounted(() => {
  fetchLogs();
});
</script>
