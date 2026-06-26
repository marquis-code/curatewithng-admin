<template>
  <Modal :isOpen="isOpen" :title="title" @close="$emit('cancel')">
    <div class="flex items-start gap-4">
      <div v-if="type === 'danger'" class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
        <AlertTriangle class="w-5 h-5 text-red-500" />
      </div>
      <div v-else-if="type === 'warning'" class="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
        <AlertCircle class="w-5 h-5 text-amber-500" />
      </div>
      <div v-else class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
        <Info class="w-5 h-5 text-blue-500" />
      </div>
      <div class="pt-1 text-slate-600 text-sm leading-relaxed">
        {{ message }}
      </div>
    </div>
    
    <template #footer>
      <button @click="$emit('cancel')" :disabled="loading" class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors">
        Cancel
      </button>
      <button 
        @click="$emit('confirm')" 
        class="px-4 py-2 text-sm font-medium text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-colors min-w-[100px]"
        :class="[
          type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 
          type === 'warning' ? 'bg-amber-600 hover:bg-amber-700' : 
          'bg-primary-600 hover:bg-primary-700'
        ]"
        :disabled="loading"
      >
        <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
        <span v-else>{{ confirmText }}</span>
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { AlertTriangle, AlertCircle, Info, Loader2 } from 'lucide-vue-next';
import Modal from './Modal.vue';

defineProps({
  isOpen: { type: Boolean, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  confirmText: { type: String, default: 'Confirm' },
  type: { type: String, default: 'info' }, // 'info', 'warning', 'danger'
  loading: { type: Boolean, default: false }
});

defineEmits(['confirm', 'cancel']);
</script>
