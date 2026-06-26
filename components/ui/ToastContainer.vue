<template>
  <div class="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
    <transition-group 
      name="toast-slide" 
      tag="div"
      class="flex flex-col gap-3 items-end"
    >
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="pointer-events-auto flex items-center gap-3 px-4 py-3.5 min-w-[300px] max-w-sm rounded-2xl border bg-white shadow-xl shadow-slate-200/50"
        :class="getBorderStyle(toast.type)"
      >
        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" :class="getIconWrapperStyle(toast.type)">
           <Check v-if="toast.type === 'success'" class="w-4 h-4" />
           <AlertCircle v-else-if="toast.type === 'error'" class="w-4 h-4" />
           <AlertTriangle v-else-if="toast.type === 'warning'" class="w-4 h-4" />
           <Info v-else class="w-4 h-4" />
        </div>
        
        <div class="flex-1 text-sm font-semibold text-slate-800 break-words pr-2">
          {{ toast.message }}
        </div>
        
        <button @click="removeToast(toast.id)" class="text-slate-400 hover:text-slate-600 transition-colors p-1 flex-shrink-0">
          <X class="w-4 h-4" />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { X, Check, AlertCircle, AlertTriangle, Info } from 'lucide-vue-next';
import { useCustomToast } from '~/composables/core/useCustomToast';
import type { ToastType } from '~/composables/core/useCustomToast';

const { toasts, removeToast } = useCustomToast();

const getBorderStyle = (type: ToastType) => {
  switch (type) {
    case 'success': return 'border-emerald-200';
    case 'error': return 'border-red-200';
    case 'warning': return 'border-amber-200';
    default: return 'border-blue-200';
  }
};

const getIconWrapperStyle = (type: ToastType) => {
  switch (type) {
    case 'success': return 'bg-emerald-100 text-emerald-600';
    case 'error': return 'bg-red-100 text-red-600';
    case 'warning': return 'bg-amber-100 text-amber-600';
    default: return 'bg-blue-100 text-blue-600';
  }
};
</script>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-slide-enter-from {
  opacity: 0;
  transform: translateX(40px) scale(0.95);
}
.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(40px) scale(0.95);
  transition: all 0.3s ease;
}
.toast-slide-leave-active {
  position: absolute;
}
</style>
