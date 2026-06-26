<template>
  <div class="relative" ref="dropdownRef">
    <button
      type="button"
      class="input-field !py-2 flex items-center justify-between bg-white text-left text-sm w-full transition-all duration-200"
      :class="[
        disabled ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'cursor-pointer hover:border-slate-300',
        isOpen ? 'border-primary-500 ring-2 ring-primary-500/20' : 'border-slate-200'
      ]"
      @click="toggleDropdown"
      :disabled="disabled"
    >
      <span class="block truncate font-medium" :class="selectedLabel ? 'text-slate-900' : 'text-slate-500'">
        {{ selectedLabel || placeholder }}
      </span>
      <ChevronDown class="w-4 h-4 text-slate-400 flex-shrink-0 ml-2 transition-transform duration-200" :class="{'rotate-180': isOpen}" />
    </button>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 mt-1 w-full bg-white rounded-xl shadow-lg border border-slate-100 py-1 overflow-hidden focus:outline-none max-h-60 overflow-y-auto"
      >
        <div
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="cursor-pointer select-none relative py-2 pl-3 pr-9 text-sm transition-colors hover:bg-slate-50"
          :class="[modelValue === option.value ? 'bg-primary-50 text-primary-900 font-medium' : 'text-slate-700']"
        >
          <span class="block truncate">{{ option.label }}</span>
          <span
            v-if="modelValue === option.value"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-600"
          >
            <Check class="w-4 h-4" />
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ChevronDown, Check } from 'lucide-vue-next';

interface Option {
  label: string;
  value: string | number;
}

const props = defineProps<{
  modelValue: string | number;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}>();

const emit = defineEmits(['update:modelValue', 'change']);

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const selectedLabel = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue);
  return selected ? selected.label : '';
});

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value);
  emit('change', option.value);
  isOpen.value = false;
};

// Click outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
