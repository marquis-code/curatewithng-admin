<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        @click="closeOnBackdrop && $emit('close')"
      ></div>

      <!-- Modal Content -->
      <div 
        class="bg-white rounded-2xl w-full max-w-lg z-10 overflow-hidden transform transition-all border border-slate-100"
        role="dialog" 
        aria-modal="true"
      >
        <!-- Header -->
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-lg font-heading font-bold text-slate-900">
            {{ title }}
          </h3>
          <button 
            @click="$emit('close')"
            class="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Body -->
        <div class="px-6 py-5 text-slate-600 text-sm">
          <slot></slot>
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next';

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  }
});

defineEmits(['close']);
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active > div:nth-child(2) {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-fade-leave-active > div:nth-child(2) {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-fade-enter-from > div:nth-child(2) {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
.modal-fade-leave-to > div:nth-child(2) {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
