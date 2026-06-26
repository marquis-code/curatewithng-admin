<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-1">Dashboard</h1>
        <p class="text-slate-500">Platform overview and metrics</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Users -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-primary-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
        <div class="flex justify-between items-start mb-4 relative z-10">
          <div>
            <div class="text-slate-500 text-xs font-bold tracking-wider uppercase mb-1">Total Users</div>
            <div class="text-2xl md:text-3xl font-heading font-extrabold text-slate-900">
              <span v-if="usersLoading" class="animate-pulse bg-slate-200 text-transparent rounded">0000</span>
              <span v-else>{{ userStats?.total || users.length || 0 }}</span>
            </div>
          </div>
          <div class="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shadow-inner border border-primary-100/50">
            <Users class="w-5 h-5" />
          </div>
        </div>
        <div class="text-sm text-slate-500 font-medium relative z-10">Registered buyers on platform</div>
      </div>

      <!-- Active Vendors -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
        <div class="flex justify-between items-start mb-4 relative z-10">
          <div>
            <div class="text-slate-500 text-xs font-bold tracking-wider uppercase mb-1">Active Vendors</div>
            <div class="text-2xl md:text-3xl font-heading font-extrabold text-slate-900">
              <span v-if="vendorsLoading" class="animate-pulse bg-slate-200 text-transparent rounded">000</span>
              <span v-else>{{ vendorStats?.total || vendors.length || 0 }}</span>
            </div>
          </div>
          <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner border border-indigo-100/50">
            <Store class="w-5 h-5" />
          </div>
        </div>
        <div class="text-sm text-slate-500 font-medium relative z-10">Approved sellers</div>
      </div>

      <!-- Total Orders -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
        <div class="flex justify-between items-start mb-4 relative z-10">
          <div>
            <div class="text-slate-500 text-xs font-bold tracking-wider uppercase mb-1">Total Orders</div>
            <div class="text-2xl md:text-3xl font-heading font-extrabold text-slate-900">
              <span v-if="ordersLoading" class="animate-pulse bg-slate-200 text-transparent rounded">0000</span>
              <span v-else>{{ orderStats?.totalOrders || orders.length || 0 }}</span>
            </div>
          </div>
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner border border-emerald-100/50">
            <Package class="w-5 h-5" />
          </div>
        </div>
        <div class="text-sm text-slate-500 font-medium relative z-10">Successful transactions</div>
      </div>

      <!-- AI Curations -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-slate-100 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
        <div class="flex justify-between items-start mb-4 relative z-10">
          <div>
            <div class="text-slate-500 text-xs font-bold tracking-wider uppercase mb-1">AI Curations</div>
            <div class="text-2xl md:text-3xl font-heading font-extrabold text-slate-900">
              <span v-if="aiLoading" class="animate-pulse bg-slate-200 text-transparent rounded">0000</span>
              <span v-else>{{ aiStats?.total || aiLogs.length || 0 }}</span>
            </div>
          </div>
          <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shadow-inner border border-slate-200/50">
            <Activity class="w-5 h-5" />
          </div>
        </div>
        <div class="text-sm text-slate-500 font-medium relative z-10">Generative AI requests processed</div>
      </div>
    </div>

    <!-- Analytics Chart -->
    <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-8">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h3 class="text-lg font-heading font-bold text-slate-900">Platform Revenue</h3>
          <p class="text-sm text-slate-500">Gross Merchandise Value (GMV) vs Platform Fees collected (Last 6 Months)</p>
        </div>
      </div>
      <div class="h-[350px]">
        <RevenueChart :loading="ordersLoading" :data="orderStats?.revenueOverTime || []" />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Vendors -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-heading font-bold text-slate-900">Recent Vendors</h3>
          <NuxtLink to="/vendors" class="text-sm text-primary-600 font-semibold hover:text-primary-800 transition-colors">View All</NuxtLink>
        </div>
        
        <div v-if="vendorsLoading" class="space-y-4">
          <div v-for="i in 3" :key="i" class="animate-pulse flex items-center gap-3">
            <div class="w-10 h-10 bg-slate-100 rounded-full"></div>
            <div class="flex-1 space-y-2"><div class="h-4 bg-slate-100 rounded w-1/2"></div><div class="h-3 bg-slate-100 rounded w-1/3"></div></div>
          </div>
        </div>
        <div v-else-if="vendors.length === 0" class="flex flex-col items-center justify-center py-10 text-center">
          <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
            <Store class="w-8 h-8 text-slate-300" />
          </div>
          <h4 class="text-base font-semibold text-slate-800 mb-1">No vendors yet</h4>
          <p class="text-sm text-slate-500 max-w-[250px]">When vendors register on the platform, they will appear here.</p>
        </div>
        <div v-else class="space-y-3">
          <div v-for="vendor in vendors.slice(0, 5)" :key="vendor._id" class="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer" @click="openVendorPreview(vendor)">
            <div class="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-700 font-bold uppercase shadow-sm">
              {{ vendor.businessName?.substring(0, 2) || vendor.slug?.substring(0, 2) || 'V' }}
            </div>
            <div class="flex-1">
              <div class="text-sm font-semibold text-slate-900">{{ vendor.businessName || 'Unnamed Vendor' }}</div>
              <div class="text-xs text-slate-500">{{ vendor.location?.city || 'No Location' }}, {{ vendor.location?.state || '' }}</div>
            </div>
            <span :class="vendor.isApproved ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'" class="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border">
              {{ vendor.isApproved ? 'APPROVED' : 'PENDING' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Recent Orders -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-heading font-bold text-slate-900">Recent Orders</h3>
          <NuxtLink to="/orders" class="text-sm text-primary-600 font-semibold hover:text-primary-800 transition-colors">View All</NuxtLink>
        </div>
        
        <div v-if="ordersLoading" class="space-y-4">
          <div v-for="i in 3" :key="i" class="animate-pulse flex items-center gap-3">
            <div class="w-10 h-10 bg-slate-100 rounded-full"></div>
            <div class="flex-1 space-y-2"><div class="h-4 bg-slate-100 rounded w-1/2"></div><div class="h-3 bg-slate-100 rounded w-1/3"></div></div>
          </div>
        </div>
        <div v-else-if="orders.length === 0" class="flex flex-col items-center justify-center py-10 text-center">
          <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
            <Package class="w-8 h-8 text-slate-300" />
          </div>
          <h4 class="text-base font-semibold text-slate-800 mb-1">No orders yet</h4>
          <p class="text-sm text-slate-500 max-w-[250px]">Recent transactions and purchases will be displayed here.</p>
        </div>
        <div v-else class="space-y-3">
          <div v-for="order in orders.slice(0, 5)" :key="order._id" class="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
            <div class="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 shadow-sm">
              <Package class="w-4 h-4" />
            </div>
            <div class="flex-1">
              <div class="text-sm font-semibold text-slate-900">{{ order.orderNumber || `#${order._id.substring(0, 8).toUpperCase()}` }}</div>
              <div class="text-xs text-slate-500">{{ order.userId?.email || 'Guest User' }}</div>
            </div>
            <div class="text-sm font-extrabold text-slate-900">₦{{ order.totalAmount?.toLocaleString() || 0 }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Floating Drawer for quick view -->
    <FloatingDrawer v-model="drawerOpen" :title="drawerTitle">
      <div v-if="drawerData" class="space-y-6">
        <div class="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div class="w-16 h-16 rounded-2xl bg-primary-50 text-primary-800 flex items-center justify-center text-2xl font-bold uppercase">
             {{ drawerData.businessName?.charAt(0) || drawerData.slug?.charAt(0) || 'V' }}
          </div>
          <div>
            <h4 class="text-lg font-bold text-slate-900">{{ drawerData.businessName || 'Unnamed Vendor' }}</h4>
            <p class="text-slate-500 text-sm">@{{ drawerData.slug || 'slug-unavailable' }}</p>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Status</div>
            <span :class="drawerData.isApproved ? 'badge-active' : 'badge-pending'">
              {{ drawerData.isApproved ? 'APPROVED' : 'PENDING' }}
            </span>
          </div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Joined</div>
            <div class="font-medium text-slate-900">{{ new Date(drawerData.createdAt).toLocaleDateString() }}</div>
          </div>
        </div>
      </div>
      
      <template #footer>
        <NuxtLink to="/vendors" class="btn-primary w-full text-center">Manage in Vendors</NuxtLink>
      </template>
    </FloatingDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Users, Store, Package, Activity } from 'lucide-vue-next';
import FloatingDrawer from '~/components/ui/FloatingDrawer.vue';
import RevenueChart from '~/components/ui/RevenueChart.vue';
import { useFetchUsers } from '~/composables/modules/users/useFetchUsers';
import { useFetchVendors } from '~/composables/modules/vendors/useFetchVendors';
import { useFetchOrders } from '~/composables/modules/orders/useFetchOrders';
import { useFetchAiLogs } from '~/composables/modules/ai/useFetchAiLogs';

definePageMeta({ middleware: 'auth' });
useHead({ title: 'Dashboard — Admin Portal' });

const { users, stats: userStats, loading: usersLoading, fetchUsers, fetchStats: fetchUserStats } = useFetchUsers();
const { vendors, stats: vendorStats, loading: vendorsLoading, fetchVendors, fetchStats: fetchVendorStats } = useFetchVendors();
const { orders, stats: orderStats, loading: ordersLoading, fetchOrders, fetchStats: fetchOrderStats } = useFetchOrders();
const { logs: aiLogs, stats: aiStats, loading: aiLoading, fetchLogs: fetchAiLogs, fetchStats: fetchAiStats } = useFetchAiLogs();

const drawerOpen = ref(false);
const drawerTitle = ref('');
const drawerData = ref<any>(null);

const openVendorPreview = (vendor: any) => {
  drawerTitle.value = 'Vendor Preview';
  drawerData.value = vendor;
  drawerOpen.value = true;
};

onMounted(() => {
  fetchUsers();
  fetchUserStats();
  fetchVendors();
  fetchVendorStats();
  fetchOrders();
  fetchOrderStats();
  fetchAiLogs();
  fetchAiStats();
});
</script>
