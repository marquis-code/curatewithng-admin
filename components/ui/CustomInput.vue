<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-sm font-semibold text-slate-700">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <div v-if="$slots.icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
        <slot name="icon"></slot>
      </div>
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        :required="required"
        :minlength="minlength"
        :readonly="readonly"
        :class="[
          'w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-slate-800 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500',
          $slots.icon ? 'pl-10' : '',
          type === 'password' ? 'pr-12' : '',
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 hover:border-slate-300 focus:border-transparent',
          readonly ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''
        ]"
      />
      <button 
        v-if="type === 'password'" 
        type="button"
        @click="showPassword = !showPassword"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
      >
        <Eye v-if="!showPassword" class="w-5 h-5" />
        <EyeOff v-else class="w-5 h-5" />
      </button>
    </div>
    <span v-if="error" class="text-xs text-red-500">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useId } from '#imports';
import { Eye, EyeOff } from 'lucide-vue-next';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  },
  minlength: {
    type: [String, Number],
    default: undefined
  }
});

defineEmits(['update:modelValue']);

const showPassword = ref(false);
const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password';
  }
  return props.type;
});

const id = useId();
</script>
