<template>
  <div class="min-h-screen grid lg:grid-cols-2 bg-white">
    
    <!-- Left: Form Section -->
    <div class="relative flex flex-col justify-center px-6 sm:px-16 lg:px-24 py-12">
      <!-- Notification Toast (No shadow, flat design) -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div v-if="notification" class="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-emerald-50 px-6 py-3 rounded-full border border-emerald-200">
          <div class="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700">
            <Check class="w-3.5 h-3.5" />
          </div>
          <p class="text-sm font-semibold text-emerald-800">{{ notification }}</p>
        </div>
      </transition>

      <div class="max-w-md w-full mx-auto">
        <!-- Logo -->
        <div class="flex items-center justify-center gap-3 mb-12">
          <div class="w-10 h-10 bg-slate-900 text-white flex items-center justify-center rounded-lg">
            <Shield class="w-5 h-5" />
          </div>
          <div class="font-heading font-extrabold text-xl tracking-tight text-slate-900">
            Curate<span class="text-accent-500">With</span>NG <span class="text-slate-400 font-medium tracking-normal ml-1 border-l border-slate-200 pl-2">Admin</span>
          </div>
        </div>

        <transition name="slide-fade" mode="out-in">
          <!-- Step 1: Login Credentials -->
          <div v-if="step === 'credentials'" key="credentials">
            <h1 class="text-2xl md:text-3xl text-center font-heading font-extrabold text-slate-900 mb-2">Secure Login</h1>
            <p class="text-slate-500 text-center text-base mb-10">Enter your credentials to access the command center.</p>

            <form @submit.prevent="handleLogin" class="space-y-6">
              <UiCustomInput
                v-model="email"
                type="email"
                label="Email"
                placeholder="admin@curatewithng.com"
                required
              >
                <template #icon>
                  <Mail class="w-4 h-4" />
                </template>
              </UiCustomInput>

              <UiCustomInput
                v-model="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                required
              >
                <template #icon>
                  <Lock class="w-4 h-4" />
                </template>
              </UiCustomInput>

              <button type="submit" :disabled="loading" class="w-full flex justify-center items-center gap-2 py-3.5 mt-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors">
                <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
                <span v-else>Continue securely</span>
                <ArrowRight v-if="!loading" class="w-4 h-4 ml-1" />
              </button>
            </form>
          </div>

          <!-- Step 2: OTP Verification -->
          <div v-else-if="step === 'otp'" key="otp">
            <div class="w-12 h-12 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center mb-6">
              <KeyRound class="w-6 h-6" />
            </div>
            <h1 class="text-3xl font-heading font-extrabold text-slate-900 mb-2">Two-Factor Auth</h1>
            <p class="text-slate-500 text-base mb-10">We've sent a 6-digit code to <strong>{{ email }}</strong></p>

            <form @submit.prevent="handleVerifyOTP" class="space-y-6">
              <div>
                <label class="text-sm font-semibold text-slate-700 mb-3 block">Verification Code</label>
                <div class="flex gap-3 justify-between">
                  <input
                    v-for="(digit, index) in otpDigits"
                    :key="index"
                    ref="otpInputs"
                    v-model="otpDigits[index]"
                    type="text"
                    inputmode="numeric"
                    maxlength="1"
                    @input="focusNext(index)"
                    @keydown="handleOtpKeydown($event, index)"
                    @paste="handleOtpPaste"
                    class="w-12 h-14 rounded-xl border border-slate-200 bg-white text-slate-900 text-center text-2xl font-semibold focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                  />
                </div>
              </div>
              <button type="submit" :disabled="loading" class="w-full flex justify-center items-center gap-2 py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors">
                <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
                <span v-else>Verify & Login</span>
              </button>
            </form>

            <div class="mt-8">
              <button @click="step = 'credentials'" type="button" class="text-sm text-slate-500 hover:text-slate-900 font-semibold transition-colors flex items-center gap-1">
                &larr; Back to login
              </button>
            </div>
          </div>
        </transition>

      </div>
    </div>

    <!-- Right: Image Section (Floating Card Layout) -->
    <div class="hidden lg:flex items-center justify-center p-6 bg-slate-50">
      <div class="relative w-full h-full overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-[0_0_40px_-10px_rgba(0,0,0,0.05)]">
        <img 
          src="~/assets/images/auth-bg.png" 
          alt="Premium Admin Dashboard" 
          class="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
        <div class="absolute bottom-12 left-12 right-12 z-10">
          <h2 class="font-heading font-extrabold text-4xl leading-tight mb-4 text-white">
            Command Central.
          </h2>
          <p class="text-white/80 text-lg max-w-md">
            Curate and manage the ecosystem with absolute precision.
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Mail, Lock, Loader2, ArrowRight, Shield, KeyRound, Check } from 'lucide-vue-next';
import { useAuth } from '~/composables/modules/auth/useAuth';
import { useCustomToast } from '~/composables/core/useCustomToast';

definePageMeta({ layout: false });
useHead({ title: 'Admin Login — CurateWithNG' });

const { login, verifyOtp } = useAuth();
const toast = useCustomToast();

// Pre-fill the admin email as requested
const email = ref('usisangozi@gmail.com');
const password = ref('');
const otpDigits = ref(['', '', '', '', '', '']);
const otpInputs = ref<HTMLInputElement[]>([]);
const otp = computed(() => otpDigits.value.join(''));
const loading = ref(false);
const step = ref<'credentials' | 'otp'>('credentials');
const notification = ref('');

const showNotification = (msg: string) => {
  notification.value = msg;
  setTimeout(() => {
    notification.value = '';
  }, 4000);
};

const focusNext = (index: number) => {
  if (otpDigits.value[index] && index < 5) {
    otpInputs.value[index + 1]?.focus();
  }
};

const handleOtpKeydown = (e: KeyboardEvent, index: number) => {
  if (e.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    otpInputs.value[index - 1]?.focus();
    otpDigits.value[index - 1] = '';
  } else if (e.key === 'ArrowLeft' && index > 0) {
    otpInputs.value[index - 1]?.focus();
  } else if (e.key === 'ArrowRight' && index < 5) {
    otpInputs.value[index + 1]?.focus();
  }
};

const handleOtpPaste = (e: ClipboardEvent) => {
  e.preventDefault();
  const pastedData = e.clipboardData?.getData('text');
  if (!pastedData) return;
  
  const numbers = pastedData.replace(/\D/g, '').slice(0, 6).split('');
  numbers.forEach((num, idx) => {
    otpDigits.value[idx] = num;
  });
  
  const nextEmptyIdx = otpDigits.value.findIndex(d => !d);
  if (nextEmptyIdx !== -1) {
    otpInputs.value[nextEmptyIdx]?.focus();
  } else {
    otpInputs.value[5]?.focus();
  }
};

const handleLogin = async () => {
  loading.value = true;
  try {
    const response = await login({ email: email.value, password: password.value });
    
    if (response && response.requiresOtp) {
      showNotification('Verification code sent to your email.');
      step.value = 'otp';
    } else {
      // If no OTP required, directly go to dashboard
      navigateTo('/dashboard');
    }
  } catch (e: any) {
    toast.error(e.response?.data?.message || e.message || 'Login failed. Please check your credentials.');
  } finally {
    loading.value = false;
  }
};

const handleVerifyOTP = async () => {
  if (otp.value.length < 6) {
    toast.warning('Please enter a valid 6-digit code');
    return;
  }

  loading.value = true;
  try {
    await verifyOtp(email.value, otp.value);
    
    showNotification('Verification successful! Logging you in...');
    
    setTimeout(() => {
      navigateTo('/dashboard');
    }, 800);
    
  } catch (e: any) {
    toast.error(e.response?.data?.message || e.message || 'Invalid verification code.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
