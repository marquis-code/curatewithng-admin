<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex justify-end transition-opacity">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
      @click="$emit('update:modelValue', false)"
    ></div>

    <!-- Drawer Content -->
    <div 
      class="relative w-full max-w-lg m-4 bg-white rounded-[2rem] border border-slate-200 overflow-hidden flex flex-col animate-slide-in-right"
    >
      <div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 class="text-xl font-heading font-bold text-slate-900">{{ title }}</h3>
        <button @click="$emit('update:modelValue', false)" class="text-slate-400 hover:text-slate-900 transition-colors bg-white w-8 h-8 rounded-full flex items-center justify-center border border-slate-200">
          <X class="w-4 h-4" />
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-6">
        <slot />
      </div>
      <div v-if="$slots.footer" class="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next';

defineProps<{
  modelValue: boolean;
  title: string;
}>();

defineEmits(['update:modelValue']);
</script>

<style scoped>
.animate-slide-in-right {
  animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
