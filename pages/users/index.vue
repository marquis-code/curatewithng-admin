<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-1">Users</h1>
        <p class="text-slate-500">Manage platform users (buyers)</p>
      </div>
    </div>

    <div class="card overflow-hidden">
      <!-- Toolbar -->
      <div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
        <div class="relative w-full max-w-sm">
          <input type="text" v-model="searchQuery" placeholder="Search users by email or name..." class="input-field !py-2 w-full pl-10" />
          <CustomSelect 
            v-model="roleFilter" 
            :options="[
              { label: 'All Roles', value: '' },
              { label: 'Users', value: 'user' },
              { label: 'Admins', value: 'admin' }
            ]"
            placeholder="All Roles"
            class="w-full sm:w-48"
          />
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-white border-b border-slate-200 text-sm font-semibold text-slate-600">
              <th class="p-4">Name</th>
              <th class="p-4">Email</th>
              <th class="p-4">Status</th>
              <th class="p-4">Joined</th>
              <th class="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading" v-for="i in 5" :key="`skeleton-${i}`" class="border-b border-slate-100 bg-white">
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div></td>
              <td class="p-4 text-right"><div class="h-6 w-6 bg-slate-200 rounded-full ml-auto animate-pulse"></div></td>
            </tr>
            <tr v-else-if="filteredUsers.length === 0" class="border-b border-slate-100 bg-white">
              <td colspan="5" class="p-8 text-center text-slate-500">No users found</td>
            </tr>
            <tr v-else v-for="user in filteredUsers" :key="user._id" class="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors">
              <td class="p-4 font-medium text-slate-900 flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-primary-50 text-primary-800 flex items-center justify-center font-bold text-xs uppercase overflow-hidden">
                  <img v-if="user.avatar" :src="user.avatar" alt="avatar" class="w-full h-full object-cover" />
                  <span v-else>{{ user.firstName?.charAt(0) || user.email?.charAt(0) }}</span>
                </div>
                {{ user.firstName }} {{ user.lastName }}
              </td>
              <td class="p-4 text-sm text-slate-600">{{ user.email }}</td>
              <td class="p-4">
                <span :class="user.isActive ? 'badge-active' : 'badge-neutral'">
                  {{ user.isActive ? 'ACTIVE' : 'INACTIVE' }}
                </span>
              </td>
              <td class="p-4 text-sm text-slate-600">{{ new Date(user.createdAt).toLocaleDateString() }}</td>
              <td class="p-4 text-right">
                <button @click="openUserDrawer(user)" class="text-primary-600 hover:text-primary-800 font-medium text-sm border border-primary-200 px-3 py-1 rounded-lg hover:bg-primary-50 transition-colors">
                  Manage
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- User Detail Drawer -->
    <FloatingDrawer v-model="drawerOpen" title="User Details">
      <div v-if="selectedUser" class="space-y-6">
        <div class="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div class="w-16 h-16 rounded-2xl bg-primary-50 text-primary-800 flex items-center justify-center text-2xl font-bold uppercase overflow-hidden">
             <img v-if="selectedUser.avatar" :src="selectedUser.avatar" alt="avatar" class="w-full h-full object-cover" />
             <span v-else>{{ selectedUser.firstName?.charAt(0) || selectedUser.email?.charAt(0) }}</span>
          </div>
          <div>
            <h4 class="text-lg font-bold text-slate-900">{{ selectedUser.firstName }} {{ selectedUser.lastName }}</h4>
            <p class="text-slate-500 text-sm">{{ selectedUser.email }}</p>
            <p v-if="selectedUser.phone" class="text-slate-500 text-xs mt-1">{{ selectedUser.phone }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Role</div>
            <div class="font-medium text-slate-900">{{ selectedUser.role || 'USER' }}</div>
          </div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Joined</div>
            <div class="font-medium text-slate-900">{{ new Date(selectedUser.createdAt).toLocaleDateString() }}</div>
          </div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Verified</div>
            <div class="font-medium text-slate-900">{{ selectedUser.isVerified ? 'Yes' : 'No' }}</div>
          </div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Saved Gifts</div>
            <div class="font-medium text-slate-900">{{ selectedUser.savedGifts?.length || 0 }} items</div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100">
          <h5 class="text-sm font-bold text-slate-900 mb-3">Shopping Preferences</h5>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3 text-sm text-slate-600">
            <div v-if="selectedUser.preferences?.budgetRange" class="flex justify-between items-center">
              <span class="font-medium">Budget Range:</span>
              <span class="font-bold text-slate-900">₦{{ selectedUser.preferences.budgetRange.min?.toLocaleString() || 0 }} - ₦{{ selectedUser.preferences.budgetRange.max?.toLocaleString() || 0 }}</span>
            </div>
            <div v-else class="text-slate-400 italic">No budget preference set</div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100">
          <h5 class="text-sm font-bold text-slate-900 mb-3">Recipients ({{ selectedUser.recipients?.length || 0 }})</h5>
          <div v-if="selectedUser.recipients?.length > 0" class="space-y-3 max-h-48 overflow-y-auto">
            <div v-for="(rec, idx) in selectedUser.recipients" :key="idx" class="bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm">
              <div class="flex justify-between items-start mb-1">
                <span class="font-bold text-slate-900">{{ rec.name }}</span>
                <span class="text-xs font-semibold text-primary-600 uppercase tracking-wider bg-primary-50 px-2 py-0.5 rounded">{{ rec.relationship }}</span>
              </div>
              <p v-if="rec.notes" class="text-xs text-slate-500 mt-1 italic">"{{ rec.notes }}"</p>
            </div>
          </div>
          <div v-else class="text-slate-400 text-sm italic py-2 text-center bg-slate-50 rounded-xl border border-slate-100">
            No recipients added yet.
          </div>
        </div>
        
        <div class="pt-4 border-t border-slate-100">
          <h5 class="text-sm font-bold text-slate-900 mb-4">Quick Actions</h5>
          <button @click="confirmStatusToggle = true" class="w-full flex justify-between items-center p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
            <div class="flex items-center gap-3">
              <div :class="selectedUser.isActive ? 'bg-amber-50 text-amber-600' : 'bg-success-50 text-success-600'" class="w-10 h-10 rounded-full flex items-center justify-center">
                <Power class="w-5 h-5" />
              </div>
              <div class="text-left">
                <div class="font-medium text-slate-900">{{ selectedUser.isActive ? 'Deactivate Account' : 'Activate Account' }}</div>
                <div class="text-xs text-slate-500">Change user access status</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </FloatingDrawer>

    <ConfirmModal
      :isOpen="confirmStatusToggle"
      :title="selectedUser?.isActive ? 'Deactivate User' : 'Activate User'"
      :message="selectedUser?.isActive ? 'Are you sure you want to deactivate this user? They will not be able to log in or use the platform.' : 'Are you sure you want to activate this user? They will regain access to the platform.'"
      :confirmText="selectedUser?.isActive ? 'Deactivate' : 'Activate'"
      :type="selectedUser?.isActive ? 'danger' : 'info'"
      :loading="isActionLoading"
      @confirm="executeToggleStatus"
      @cancel="confirmStatusToggle = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Search, Power } from 'lucide-vue-next';
import FloatingDrawer from '~/components/ui/FloatingDrawer.vue';
import ConfirmModal from '~/components/ui/ConfirmModal.vue';
import { useFetchUsers } from '~/composables/modules/users/useFetchUsers';

definePageMeta({ middleware: 'auth' });
useHead({ title: 'Users — Admin Portal' });

const { users, loading, fetchUsers, toggleUserStatus } = useFetchUsers();
const searchQuery = ref('');

const drawerOpen = ref(false);
const selectedUser = ref<any>(null);

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  const q = searchQuery.value.toLowerCase();
  return users.value.filter((u: any) => 
    u.email?.toLowerCase().includes(q) || 
    u.firstName?.toLowerCase().includes(q) || 
    u.lastName?.toLowerCase().includes(q)
  );
});

const openUserDrawer = (user: any) => {
  selectedUser.value = user;
  drawerOpen.value = true;
};

const confirmStatusToggle = ref(false);
const isActionLoading = ref(false);

const executeToggleStatus = async () => {
  if (selectedUser.value) {
    isActionLoading.value = true;
    try {
      await toggleUserStatus(selectedUser.value._id);
      selectedUser.value.isActive = !selectedUser.value.isActive;
      confirmStatusToggle.value = false;
    } finally {
      isActionLoading.value = false;
    }
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
