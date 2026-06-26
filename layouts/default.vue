<template>
  <div class="min-h-screen bg-slate-50 flex">
    
    <!-- Mobile overlay -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 bg-slate-900/50 z-20 md:hidden transition-opacity"
      @click="sidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside 
      :class="[
        'w-64 bg-primary-900 text-white flex flex-col fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out md:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="p-6 flex justify-between items-center">
        <div>
          <div class="font-heading font-extrabold text-2xl tracking-tight">
            Curate<span class="text-accent-400">With</span>NG
          </div>
          <div class="text-primary-300 text-xs mt-1 font-medium tracking-wider uppercase">Platform Admin</div>
        </div>
        <!-- Close button on mobile -->
        <button class="md:hidden text-primary-200 hover:text-white" @click="sidebarOpen = false">
          <X class="w-6 h-6" />
        </button>
      </div>
      
      <div class="flex-1 overflow-y-auto py-4">
        <nav class="space-y-1 px-3">
          <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path"
            @click="sidebarOpen = false"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-primary-200 hover:bg-primary-800/50 hover:text-white"
            active-class="bg-primary-800 text-white">
            <component :is="link.icon" class="w-5 h-5" />
            {{ link.name }}
          </NuxtLink>
        </nav>
      </div>

      <div class="p-4 border-t border-primary-800">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center font-bold text-white">
            {{ user?.firstName?.charAt(0) || 'A' }}
          </div>
          <div class="flex-1 overflow-hidden">
            <div class="text-sm font-medium truncate">{{ user?.firstName }} {{ user?.lastName }}</div>
            <div class="text-xs text-primary-300 truncate">Administrator</div>
          </div>
        </div>
        <button @click="showSignOutModal = true" class="w-full py-2 px-3 rounded-lg text-sm font-medium text-danger-300 hover:bg-danger-500/10 hover:text-danger-200 transition-colors flex items-center justify-center gap-2">
          <LogOut class="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 md:ml-64 flex flex-col min-h-screen min-w-0">
      <!-- Topbar -->
      <header class="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-3 md:px-6 sticky top-0 z-10">
        <div class="flex items-center gap-3">
          <button class="md:hidden text-slate-600 hover:text-slate-900" @click="sidebarOpen = true">
            <Menu class="w-6 h-6" />
          </button>
          <div class="text-slate-600 font-medium hidden sm:block">Platform Administration</div>
        </div>
        <div class="flex items-center gap-4">
          <!-- Notification bell -->
          <button @click="toggleNotifications" class="relative w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
            <Bell class="w-4 h-4" />
            <span v-if="unreadCount > 0" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              {{ unreadCount }}
            </span>
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex-1 p-2 md:p-6 overflow-x-hidden w-full">
        <slot />
      </div>
    </main>

    <!-- Sign Out Modal -->
    <div v-if="showSignOutModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showSignOutModal = false"></div>
      <div class="bg-white rounded-2xl w-full max-w-sm relative z-10 p-6 text-center border border-slate-100">
        <div class="w-12 h-12 rounded-full bg-danger-50 text-danger-600 flex items-center justify-center mx-auto mb-4">
          <LogOut class="w-6 h-6" />
        </div>
        <h3 class="text-lg font-bold text-slate-900 mb-2">Sign Out</h3>
        <p class="text-slate-500 text-sm mb-6">Are you sure you want to end your session?</p>
        <div class="flex gap-3">
          <button @click="showSignOutModal = false" class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button @click="handleLogOut" class="flex-1 px-4 py-2.5 rounded-xl bg-danger-600 text-white font-medium hover:bg-danger-700 transition-colors">
            Yes, Sign out
          </button>
        </div>
      </div>
    </div>

    <!-- Notifications Drawer -->
    <FloatingDrawer v-model="notificationsOpen" title="Notifications">
      <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
        <h3 class="font-bold text-slate-900">Recent Alerts</h3>
        <button v-if="unreadCount > 0" @click="markAllAsRead" class="text-xs text-primary-600 font-medium hover:text-primary-700">
          Mark all as read
        </button>
      </div>
      
      <div v-if="loading" class="space-y-4 py-4">
         <div v-for="i in 3" :key="i" class="animate-pulse flex gap-3">
            <div class="w-10 h-10 bg-slate-200 rounded-full"></div>
            <div class="flex-1 space-y-2 py-1">
               <div class="h-4 bg-slate-200 rounded w-3/4"></div>
               <div class="h-3 bg-slate-200 rounded w-5/6"></div>
            </div>
         </div>
      </div>

      <div v-else-if="notifications.length === 0" class="text-center py-10 text-slate-500">
         <Bell class="w-10 h-10 mx-auto text-slate-300 mb-2" />
         <p class="text-sm">You have no notifications yet.</p>
      </div>

      <div v-else class="space-y-3">
         <div v-for="notif in notifications" :key="notif._id" 
              class="p-4 rounded-xl border transition-colors cursor-pointer"
              :class="notif.isRead ? 'bg-white border-slate-100 shadow-sm' : 'bg-primary-50 border-primary-100 shadow-sm'"
              @click="markAsRead(notif._id)">
            <div class="flex justify-between items-start mb-1">
               <div class="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span v-if="!notif.isRead" class="w-2 h-2 rounded-full bg-primary-500"></span>
                  {{ notif.title }}
               </div>
               <span class="text-[10px] text-slate-400 font-mono">{{ new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
            </div>
            <p class="text-xs text-slate-600 ml-4">{{ notif.body }}</p>
         </div>
      </div>
    </FloatingDrawer>

  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useUser } from '~/composables/modules/auth/user';
import { useNotifications } from '~/composables/modules/notifications/useNotifications';
import { LayoutDashboard, Users, Store, Gift, Package, CreditCard, Brain, Settings, Bell, Menu, X, LogOut } from 'lucide-vue-next';
import FloatingDrawer from '~/components/ui/FloatingDrawer.vue';

const { user, logOut } = useUser();
const { unreadCount, notifications, loading, connectSocket, disconnectSocket, fetchUnreadCount, fetchNotifications, markAsRead, markAllAsRead } = useNotifications();

const sidebarOpen = ref(false);
const showSignOutModal = ref(false);
const notificationsOpen = ref(false);

const toggleNotifications = () => {
  notificationsOpen.value = true;
  if (notifications.value.length === 0) {
    fetchNotifications();
  }
};

onMounted(() => {
  if (user.value) {
    connectSocket();
    fetchUnreadCount();
  }
});

watch(() => user.value, (newVal) => {
  if (newVal) {
    connectSocket();
    fetchUnreadCount();
  } else {
    disconnectSocket();
  }
});

const handleLogOut = () => {
  showSignOutModal.value = false;
  logOut();
};

const navLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Users', path: '/users', icon: Users },
  { name: 'Vendors', path: '/vendors', icon: Store },
  { name: 'Gifts', path: '/gifts', icon: Gift },
  { name: 'Sourcing Requests', path: '/sourcing-requests', icon: Package },
  { name: 'Orders', path: '/orders', icon: Package },
  { name: 'Payouts', path: '/payouts', icon: CreditCard },
  { name: 'AI Logs', path: '/ai-logs', icon: Brain },
  { name: 'Settings', path: '/settings', icon: Settings },
];
</script>

<style>
a.router-link-active {
  @apply bg-primary-800 text-white;
}
</style>
