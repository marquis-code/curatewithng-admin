<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl font-heading font-bold text-slate-900 tracking-tight">Platform Settings</h1>
      <p class="text-slate-500 mt-1">Configure global application parameters.</p>
    </div>

    <div class="card overflow-hidden">
      <div v-if="loading" class="p-8 text-center text-slate-500">Loading settings...</div>
      
      <div v-else class="p-6 md:p-8 space-y-10">
        
        <!-- General Section -->
        <section>
          <h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <Settings class="w-5 h-5 text-slate-400" />
            General Configuration
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Platform Fee (%)</label>
              <input type="number" v-model="form.platformFeePercentage" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Support Email</label>
              <input type="email" value="hello@curatewithng.com" disabled class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed" />
            </div>
          </div>
        </section>

        <!-- Sourcing Fee Tiers Section -->
        <section class="pt-6 border-t border-slate-100">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Sparkles class="w-5 h-5 text-slate-400" />
              Sourcing Fee Tiers
            </h2>
            <button @click="addTier" class="text-sm font-bold text-primary-600 hover:text-primary-800 transition-colors bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-200">
              + Add Tier
            </button>
          </div>
          <div class="space-y-4">
            <div v-for="(tier, index) in form.sourcingFeeTiers" :key="index" class="relative p-4 bg-slate-50 rounded-xl border border-slate-200">
              <button @click="removeTier(index)" class="absolute top-2 right-2 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove Tier">
                <Trash2 class="w-4 h-4" />
              </button>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 sm:pt-0 sm:pr-10">
                <div>
                  <label class="block text-xs font-semibold text-slate-500 mb-1">Min Amount (₦)</label>
                  <input type="number" v-model="tier.minAmount" class="input-field !py-2 w-full bg-white" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-500 mb-1">Max Amount (₦) <span class="font-normal opacity-50">(optional)</span></label>
                  <input type="number" v-model="tier.maxAmount" class="input-field !py-2 w-full bg-white" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-500 mb-1">Fee (%)</label>
                  <input type="number" v-model="tier.percentage" class="input-field !py-2 w-full bg-white" />
                </div>
              </div>
            </div>
            <p class="text-xs text-slate-500 mt-2">Tiers are evaluated from top to bottom. Make sure your fallback (e.g. Min 0, Max empty) is at the bottom.</p>
          </div>
        </section>

        <div class="flex justify-end pt-6 border-t border-slate-100">
          <button @click="saveSettings" :disabled="actionLoading" class="px-8 py-3 bg-primary-900 text-white font-medium rounded-xl hover:bg-primary-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <Loader2 v-if="actionLoading" class="w-4 h-4 animate-spin" />
            <Save v-else class="w-4 h-4" />
            {{ actionLoading ? 'Saving...' : 'Save Configuration' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Settings, Shield, Save, Sparkles, Trash2, Loader2 } from 'lucide-vue-next';
import { useSettings } from '~/composables/modules/settings/useSettings';

definePageMeta({ middleware: 'auth' });
useHead({ title: 'Settings — Admin Portal' });

const { settings, loading, actionLoading, fetchSettings, updateSettings } = useSettings();

const form = ref({
  platformFeePercentage: 10,
  sourcingFeeTiers: [] as any[]
});

onMounted(async () => {
  await fetchSettings();
  if (settings.value) {
    form.value.platformFeePercentage = settings.value.platformFeePercentage || 10;
    form.value.sourcingFeeTiers = JSON.parse(JSON.stringify(settings.value.sourcingFeeTiers || []));
  }
});

const addTier = () => {
  form.value.sourcingFeeTiers.push({
    minAmount: 0,
    maxAmount: null,
    percentage: 10
  });
};

const removeTier = (index: number) => {
  form.value.sourcingFeeTiers.splice(index, 1);
};

const saveSettings = async () => {
  try {
    const payload = {
      platformFeePercentage: Number(form.value.platformFeePercentage),
      sourcingFeeTiers: form.value.sourcingFeeTiers.map(t => ({
        minAmount: Number(t.minAmount),
        maxAmount: t.maxAmount ? Number(t.maxAmount) : undefined,
        percentage: Number(t.percentage)
      }))
    };
    await updateSettings(payload);
    alert('Settings saved successfully!');
  } catch (e) {
    alert('Failed to save settings.');
  }
};
</script>
