<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-1">Orders</h1>
        <p class="text-slate-500">Monitor platform transactions</p>
      </div>
    </div>

    <div class="card overflow-hidden bg-white border border-slate-200 shadow-sm rounded-xl">
      <!-- Toolbar -->
      <div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
        <div class="relative w-full max-w-sm">
          <input type="text" v-model="searchQuery" placeholder="Search orders by ID..." class="input-field !py-2 w-full pl-10 bg-white" />
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <CustomSelect 
          v-model="statusFilter" 
          :options="[
            { label: 'All Statuses', value: '' },
            { label: 'Pending', value: 'PENDING' },
            { label: 'Processing', value: 'PROCESSING' },
            { label: 'Shipped', value: 'SHIPPED' },
            { label: 'Delivered', value: 'DELIVERED' },
            { label: 'Cancelled', value: 'CANCELLED' }
          ]"
          placeholder="All Statuses"
          class="w-full sm:w-48"
        />
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 text-sm font-semibold text-slate-600 border-b border-slate-200">
              <th class="p-4 rounded-tl-xl whitespace-nowrap">Order ID</th>
              <th class="p-4 whitespace-nowrap">Customer</th>
              <th class="p-4 whitespace-nowrap">Recipient</th>
              <th class="p-4 whitespace-nowrap">Amount</th>
              <th class="p-4 whitespace-nowrap">Payment</th>
              <th class="p-4 whitespace-nowrap">Fulfillment</th>
              <th class="p-4 whitespace-nowrap">Date</th>
              <th class="p-4 text-right rounded-tr-xl whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody class="text-sm text-slate-600">
            <tr v-if="loading" v-for="i in 5" :key="`skeleton-${i}`" class="border-b border-slate-100">
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-24 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-32 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-24 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-20 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-16 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-16 animate-pulse"></div></td>
              <td class="p-4"><div class="h-4 bg-slate-200 rounded w-20 animate-pulse"></div></td>
              <td class="p-4 text-right"><div class="h-8 w-16 bg-slate-200 rounded ml-auto animate-pulse"></div></td>
            </tr>
            <tr v-else-if="filteredOrders.length === 0" class="border-b border-slate-100">
              <td colspan="8" class="p-8 text-center text-slate-500">No orders found</td>
            </tr>
            <tr v-else v-for="order in filteredOrders" :key="order._id" class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td class="p-4 font-medium text-slate-900 font-mono text-sm">{{ order.orderNumber || `#${order._id?.substring(0, 8).toUpperCase()}` }}</td>
              <td class="p-4">
                <div class="flex flex-col">
                  <span class="font-medium text-slate-900">{{ order.userId?.firstName }} {{ order.userId?.lastName }}</span>
                  <span class="text-xs text-slate-500">{{ order.userId?.email || 'Guest User' }}</span>
                </div>
              </td>
              <td class="p-4">
                <div class="flex flex-col">
                  <span class="font-medium text-slate-700">{{ order.recipient?.name || 'N/A' }}</span>
                  <span class="text-xs text-slate-500">{{ order.recipient?.phone || '' }}</span>
                </div>
              </td>
              <td class="p-4">
                <div class="flex flex-col">
                  <span class="font-bold text-slate-900">₦{{ order.totalAmount?.toLocaleString() || 0 }}</span>
                  <span class="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{{ order.items?.length || 0 }} Items</span>
                </div>
              </td>
              <td class="p-4">
                <span :class="order.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'" class="text-[10px] uppercase font-bold px-2 py-0.5 rounded border">
                  {{ order.paymentStatus || 'UNPAID' }}
                </span>
              </td>
              <td class="p-4">
                <span :class="getStatusClass(order.status)">
                  {{ order.status || 'PENDING' }}
                </span>
              </td>
              <td class="p-4 text-xs font-medium text-slate-500">{{ new Date(order.createdAt).toLocaleDateString() }}</td>
              <td class="p-4 text-right">
                <button @click="openOrderDrawer(order)" class="text-primary-600 hover:text-primary-700 font-medium px-3 py-1 rounded hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-100">
                  Inspect
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Order Detail Drawer -->
    <FloatingDrawer v-model="drawerOpen" title="Order Inspector">
      <div v-if="selectedOrder" class="space-y-6 pb-12">
        
        <div class="bg-primary-50 p-6 rounded-2xl border border-primary-100 text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-transparent pointer-events-none"></div>
          <div class="relative z-10">
            <div class="text-xs text-primary-600 font-bold uppercase tracking-widest mb-2">Total Amount</div>
            <div class="text-4xl font-heading font-black text-primary-900">₦{{ selectedOrder.totalAmount?.toLocaleString() || 0 }}</div>
            <div class="mt-4 flex items-center justify-center gap-2">
               <span :class="getStatusClass(selectedOrder.status)">
                {{ selectedOrder.status || 'PENDING' }}
              </span>
               <span :class="selectedOrder.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'" class="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border">
                {{ selectedOrder.paymentStatus || 'UNPAID' }}
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div class="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider flex items-center gap-2">
              <Package class="w-3 h-3" /> Order ID
            </div>
            <div class="font-mono font-bold text-slate-900 text-sm">{{ selectedOrder.orderNumber || `#${selectedOrder._id?.substring(0, 12).toUpperCase()}` }}</div>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div class="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider flex items-center gap-2">
              <Calendar class="w-3 h-3" /> Timestamp
            </div>
            <div class="font-bold text-slate-900 text-sm">{{ new Date(selectedOrder.createdAt).toLocaleString() }}</div>
          </div>
        </div>
        
        <div class="space-y-4 pt-2">
           <h5 class="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
             <CreditCard class="w-4 h-4 text-primary-500" /> Financial Split
           </h5>
           <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3 text-sm text-slate-600">
              <div class="flex justify-between items-center">
                <span>Vendor Payout</span>
                <span class="font-bold text-slate-900">₦{{ selectedOrder.vendorAmount?.toLocaleString() || 0 }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Platform Commission</span>
                <span class="font-bold text-primary-600">₦{{ selectedOrder.platformFee?.toLocaleString() || 0 }}</span>
              </div>
              <div v-if="selectedOrder.paystackReference" class="flex justify-between items-center pt-3 border-t border-slate-200 mt-2">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Gateway Ref</span>
                <span class="font-mono text-xs font-bold text-slate-500">{{ selectedOrder.paystackReference }}</span>
              </div>
           </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div class="space-y-3 border-t border-slate-100 pt-4">
             <h5 class="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
               <User class="w-3 h-3 text-emerald-500" /> Customer (Buyer)
             </h5>
             <div class="text-sm text-slate-600 bg-white shadow-sm p-4 rounded-xl border border-slate-200 space-y-2">
               <div class="font-bold text-slate-900 text-base">{{ selectedOrder.userId?.firstName }} {{ selectedOrder.userId?.lastName }}</div>
               <div class="text-slate-500 text-xs">{{ selectedOrder.userId?.email }}</div>
             </div>
          </div>
  
          <div class="space-y-3 border-t border-slate-100 pt-4" v-if="selectedOrder.recipient">
             <h5 class="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
               <Gift class="w-3 h-3 text-indigo-500" /> Recipient
             </h5>
             <div class="text-sm text-slate-600 bg-white shadow-sm p-4 rounded-xl border border-slate-200 space-y-2">
               <div class="font-bold text-slate-900 text-base">{{ selectedOrder.recipient.name }}</div>
               <div class="text-slate-500 text-xs">{{ selectedOrder.recipient.phone || 'No phone provided' }}</div>
             </div>
          </div>
        </div>

        <div class="space-y-4 pt-4 border-t border-slate-100" v-if="selectedOrder.recipient">
           <h5 class="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
             <Truck class="w-4 h-4 text-amber-500" /> Delivery Instructions
           </h5>
           <div class="text-sm text-slate-600 bg-amber-50/30 p-4 rounded-xl border border-amber-100 space-y-3">
             <div class="flex items-start gap-3">
               <MapPin class="w-4 h-4 text-amber-500 mt-0.5" />
               <span class="font-medium text-slate-800">{{ selectedOrder.recipient.address || 'No address provided' }}</span>
             </div>
             <div v-if="selectedOrder.recipient.deliveryDate" class="text-xs font-bold text-amber-700 bg-amber-100 inline-block px-2 py-1 rounded ml-7">
               Deliver On: {{ new Date(selectedOrder.recipient.deliveryDate).toLocaleDateString() }}
             </div>
             <div v-if="selectedOrder.recipient.note" class="mt-3 p-3 bg-white rounded-lg border border-slate-200 italic text-slate-600 shadow-sm relative">
               <span class="absolute -top-2 -left-2 text-2xl text-slate-300">"</span>
               {{ selectedOrder.recipient.note }}
             </div>
           </div>
        </div>

        <div class="space-y-4 pt-4 border-t border-slate-100">
          <h5 class="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
            <ShoppingBag class="w-4 h-4 text-rose-500" /> Order Items ({{ selectedOrder.items?.length || 0 }})
          </h5>
          <div class="space-y-3">
            <div v-for="item in selectedOrder.items" :key="item._id" class="flex items-center gap-4 p-3 bg-white shadow-sm rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
               <div class="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                 <img v-if="item.giftId?.images?.[0]" :src="item.giftId.images[0]" class="w-full h-full object-cover" />
                 <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
                   <Image class="w-4 h-4" />
                 </div>
               </div>
               <div class="flex-1 min-w-0">
                 <div class="font-bold text-slate-900 truncate">{{ item.giftId?.name || 'Unknown Gift Item' }}</div>
                 <div class="text-xs text-slate-500 mt-0.5">
                   <span class="font-mono bg-slate-100 px-1 rounded border border-slate-200">Qty: {{ item.quantity }}</span>
                   × ₦{{ item.unitPrice?.toLocaleString() || 0 }}
                 </div>
               </div>
               <div class="font-black text-slate-900 text-right">
                 ₦{{ (item.unitPrice * item.quantity)?.toLocaleString() || 0 }}
               </div>
            </div>
          </div>
        </div>
        
        <div class="space-y-4 pt-4 border-t border-slate-100" v-if="selectedOrder.timeline?.length > 0">
          <h5 class="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Activity Timeline</h5>
          <div class="space-y-4 relative pl-4 border-l-2 border-slate-200 ml-2 pt-2">
             <div v-for="(event, idx) in selectedOrder.timeline" :key="idx" class="relative">
                <div class="absolute -left-[23px] top-1 w-3 h-3 rounded-full border-[3px] border-white shadow-sm" :class="idx === selectedOrder.timeline.length - 1 ? 'bg-primary-500' : 'bg-slate-300'"></div>
                <div class="text-sm font-bold text-slate-900">{{ event.status }}</div>
                <div class="text-xs font-mono text-slate-400 mt-0.5">{{ new Date(event.timestamp).toLocaleString() }}</div>
                <p v-if="event.note" class="text-sm text-slate-600 mt-1 bg-slate-50 p-2 rounded-md border border-slate-100">{{ event.note }}</p>
             </div>
          </div>
        </div>
      </div>
    </FloatingDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Search, User, Mail, MapPin, Package, Calendar, CreditCard, Gift, Truck, ShoppingBag, Image } from 'lucide-vue-next';
import FloatingDrawer from '~/components/ui/FloatingDrawer.vue';
import { useFetchOrders } from '~/composables/modules/orders/useFetchOrders';

definePageMeta({ middleware: 'auth' });
useHead({ title: 'Orders — Admin Portal' });

const { orders, loading, fetchOrders } = useFetchOrders();
const searchQuery = ref('');
const statusFilter = ref('');

const drawerOpen = ref(false);
const selectedOrder = ref<any>(null);

const filteredOrders = computed(() => {
  let result = orders.value;
  if (statusFilter.value) {
    result = result.filter((o: any) => o.status === statusFilter.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter((o: any) => 
      o.orderNumber?.toLowerCase().includes(q) ||
      o._id?.toLowerCase().includes(q)
    );
  }
  return result;
});

const openOrderDrawer = (order: any) => {
  selectedOrder.value = order;
  drawerOpen.value = true;
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'DELIVERED': return 'text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'SHIPPED': return 'text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'PROCESSING': return 'text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-blue-100 text-blue-800 border-blue-200';
    case 'CANCELLED': return 'text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-red-100 text-red-800 border-red-200';
    default: return 'text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-slate-100 text-slate-600 border-slate-200';
  }
};

onMounted(() => {
  fetchOrders();
});
</script>
