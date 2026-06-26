import { _ as __nuxt_component_0 } from './nuxt-link-D9wemAsM.mjs';
import { defineComponent, ref, unref, withCtx, createTextVNode, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, computed, mergeProps, useSSRContext } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/server-renderer/index.mjs';
import { Users, Store, Package, Activity } from 'file:///Users/marquis/curatewithng/admin/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';
import { F as FloatingDrawer } from './FloatingDrawer-CcGngjEx.mjs';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'file:///Users/marquis/curatewithng/admin/node_modules/chart.js/dist/chart.js';
import { Line } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue-chartjs/dist/index.js';
import { u as useFetchUsers } from './useFetchUsers-sMUlhppT.mjs';
import { u as useFetchVendors } from './useFetchVendors-f9dzz7bE.mjs';
import { u as useFetchOrders } from './useFetchOrders-BFxb0J94.mjs';
import { u as useFetchAiLogs } from './useFetchAiLogs-BpiIypOi.mjs';
import { u as useHead } from './v3-CyTADNBk.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/ufo/dist/index.mjs';
import './server.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/h3/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/destr/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/hookable/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/ohash/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/klona/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/defu/dist/defu.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/scule/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unctx/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/marquis/curatewithng/admin/node_modules/pathe/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/ipx/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/vue-router/vue-router.node.mjs';
import './axios.config-DHAaROs1.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/axios/index.js';
import './user-BM2pELKn.mjs';
import './cookie-IdT47JXv.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import '../_/renderer.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unhead/dist/server.mjs';
import 'node:async_hooks';
import 'file:///Users/marquis/curatewithng/admin/node_modules/devalue/index.js';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unhead/dist/plugins.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RevenueChart",
  __ssrInlineRender: true,
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    Chart.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
      Filler
    );
    const props = __props;
    const chartData = computed(() => {
      const sortedData = [...props.data];
      return {
        labels: sortedData.map((item) => item.month),
        datasets: [
          {
            label: "Platform Revenue (\u20A6)",
            backgroundColor: "rgba(124, 58, 237, 0.1)",
            // primary-600 with opacity
            borderColor: "#7c3aed",
            // primary-600
            borderWidth: 3,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#7c3aed",
            pointHoverBackgroundColor: "#7c3aed",
            pointHoverBorderColor: "#ffffff",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            tension: 0.4,
            data: sortedData.map((item) => item.revenue),
            yAxisID: "y"
          },
          {
            label: "Total GMV (\u20A6)",
            backgroundColor: "rgba(16, 185, 129, 0.05)",
            // emerald-500 with opacity
            borderColor: "#10b981",
            // emerald-500
            borderWidth: 2,
            borderDash: [5, 5],
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#10b981",
            pointHoverBackgroundColor: "#10b981",
            pointHoverBorderColor: "#ffffff",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: false,
            tension: 0.4,
            data: sortedData.map((item) => item.gmv),
            yAxisID: "y1"
          }
        ]
      };
    });
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        legend: {
          position: "top",
          align: "end",
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            boxHeight: 8,
            font: {
              family: "'Plus Jakarta Sans', sans-serif",
              weight: "600",
              size: 12
            },
            color: "#64748b"
            // slate-500
          }
        },
        tooltip: {
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          // slate-900
          titleFont: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 14,
            weight: "bold"
          },
          bodyFont: {
            family: "'Inter', sans-serif",
            size: 13
          },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(context.parsed.y);
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            font: {
              family: "'Plus Jakarta Sans', sans-serif",
              size: 12,
              weight: "500"
            },
            color: "#94a3b8"
            // slate-400
          }
        },
        y: {
          type: "linear",
          display: true,
          position: "left",
          grid: {
            color: "#f1f5f9",
            // slate-100
            drawBorder: false
          },
          ticks: {
            font: {
              family: "'Plus Jakarta Sans', sans-serif",
              size: 11,
              weight: "600"
            },
            color: "#94a3b8",
            callback: function(value) {
              if (value >= 1e6) return "\u20A6" + (value / 1e6).toFixed(1) + "M";
              if (value >= 1e3) return "\u20A6" + (value / 1e3).toFixed(1) + "k";
              return "\u20A6" + value;
            }
          }
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          grid: {
            drawOnChartArea: false
            // only want the grid lines for one axis to show up
          },
          ticks: {
            font: {
              family: "'Plus Jakarta Sans', sans-serif",
              size: 11,
              weight: "600"
            },
            color: "#10b981",
            // emerald-500
            callback: function(value) {
              if (value >= 1e6) return "\u20A6" + (value / 1e6).toFixed(1) + "M";
              if (value >= 1e3) return "\u20A6" + (value / 1e3).toFixed(1) + "k";
              return "\u20A6" + value;
            }
          }
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-full min-h-[350px]" }, _attrs))}>`);
      if (__props.loading) {
        _push(`<div class="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10 rounded-xl"><div class="flex flex-col items-center gap-3 text-slate-500"><div class="w-8 h-8 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div><span class="text-sm font-medium">Loading Chart Data...</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.loading && ((_a = chartData.value.labels) == null ? void 0 : _a.length) === 0) {
        _push(`<div class="absolute inset-0 flex items-center justify-center"><div class="text-slate-500 text-sm">No revenue data available for the last 6 months.</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.loading && ((_b = chartData.value.labels) == null ? void 0 : _b.length) > 0) {
        _push(ssrRenderComponent(unref(Line), {
          data: chartData.value,
          options: chartOptions
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/RevenueChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Dashboard \u2014 Admin Portal" });
    const { users, stats: userStats, loading: usersLoading } = useFetchUsers();
    const { vendors, stats: vendorStats, loading: vendorsLoading } = useFetchVendors();
    const { orders, stats: orderStats, loading: ordersLoading } = useFetchOrders();
    const { logs: aiLogs, stats: aiStats, loading: aiLoading } = useFetchAiLogs();
    const drawerOpen = ref(false);
    const drawerTitle = ref("");
    const drawerData = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-8"><div><h1 class="text-3xl font-heading font-bold text-slate-900 mb-1">Dashboard</h1><p class="text-slate-500">Platform overview and metrics</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"><div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"><div class="absolute -right-6 -top-6 w-24 h-24 bg-primary-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div><div class="flex justify-between items-start mb-4 relative z-10"><div><div class="text-slate-500 text-xs font-bold tracking-wider uppercase mb-1">Total Users</div><div class="text-3xl font-heading font-extrabold text-slate-900">`);
      if (unref(usersLoading)) {
        _push(`<span class="animate-pulse bg-slate-200 text-transparent rounded">0000</span>`);
      } else {
        _push(`<span>${ssrInterpolate(((_a = unref(userStats)) == null ? void 0 : _a.total) || unref(users).length || 0)}</span>`);
      }
      _push(`</div></div><div class="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shadow-inner border border-primary-100/50">`);
      _push(ssrRenderComponent(unref(Users), { class: "w-5 h-5" }, null, _parent));
      _push(`</div></div><div class="text-sm text-slate-500 font-medium relative z-10">Registered buyers on platform</div></div><div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"><div class="absolute -right-6 -top-6 w-24 h-24 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div><div class="flex justify-between items-start mb-4 relative z-10"><div><div class="text-slate-500 text-xs font-bold tracking-wider uppercase mb-1">Active Vendors</div><div class="text-3xl font-heading font-extrabold text-slate-900">`);
      if (unref(vendorsLoading)) {
        _push(`<span class="animate-pulse bg-slate-200 text-transparent rounded">000</span>`);
      } else {
        _push(`<span>${ssrInterpolate(((_b = unref(vendorStats)) == null ? void 0 : _b.total) || unref(vendors).length || 0)}</span>`);
      }
      _push(`</div></div><div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner border border-indigo-100/50">`);
      _push(ssrRenderComponent(unref(Store), { class: "w-5 h-5" }, null, _parent));
      _push(`</div></div><div class="text-sm text-slate-500 font-medium relative z-10">Approved sellers</div></div><div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"><div class="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div><div class="flex justify-between items-start mb-4 relative z-10"><div><div class="text-slate-500 text-xs font-bold tracking-wider uppercase mb-1">Total Orders</div><div class="text-3xl font-heading font-extrabold text-slate-900">`);
      if (unref(ordersLoading)) {
        _push(`<span class="animate-pulse bg-slate-200 text-transparent rounded">0000</span>`);
      } else {
        _push(`<span>${ssrInterpolate(((_c = unref(orderStats)) == null ? void 0 : _c.totalOrders) || unref(orders).length || 0)}</span>`);
      }
      _push(`</div></div><div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner border border-emerald-100/50">`);
      _push(ssrRenderComponent(unref(Package), { class: "w-5 h-5" }, null, _parent));
      _push(`</div></div><div class="text-sm text-slate-500 font-medium relative z-10">Successful transactions</div></div><div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"><div class="absolute -right-6 -top-6 w-24 h-24 bg-slate-100 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div><div class="flex justify-between items-start mb-4 relative z-10"><div><div class="text-slate-500 text-xs font-bold tracking-wider uppercase mb-1">AI Curations</div><div class="text-3xl font-heading font-extrabold text-slate-900">`);
      if (unref(aiLoading)) {
        _push(`<span class="animate-pulse bg-slate-200 text-transparent rounded">0000</span>`);
      } else {
        _push(`<span>${ssrInterpolate(((_d = unref(aiStats)) == null ? void 0 : _d.total) || unref(aiLogs).length || 0)}</span>`);
      }
      _push(`</div></div><div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shadow-inner border border-slate-200/50">`);
      _push(ssrRenderComponent(unref(Activity), { class: "w-5 h-5" }, null, _parent));
      _push(`</div></div><div class="text-sm text-slate-500 font-medium relative z-10">Generative AI requests processed</div></div></div><div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-8"><div class="flex justify-between items-center mb-6"><div><h3 class="text-lg font-heading font-bold text-slate-900">Platform Revenue</h3><p class="text-sm text-slate-500">Gross Merchandise Value (GMV) vs Platform Fees collected (Last 6 Months)</p></div></div><div class="h-[350px]">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        loading: unref(ordersLoading),
        data: ((_e = unref(orderStats)) == null ? void 0 : _e.revenueOverTime) || []
      }, null, _parent));
      _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"><div class="flex justify-between items-center mb-6"><h3 class="text-lg font-heading font-bold text-slate-900">Recent Vendors</h3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/vendors",
        class: "text-sm text-primary-600 font-semibold hover:text-primary-800 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View All`);
          } else {
            return [
              createTextVNode("View All")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(vendorsLoading)) {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="animate-pulse flex items-center gap-3"><div class="w-10 h-10 bg-slate-100 rounded-full"></div><div class="flex-1 space-y-2"><div class="h-4 bg-slate-100 rounded w-1/2"></div><div class="h-3 bg-slate-100 rounded w-1/3"></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(vendors).length === 0) {
        _push(`<div class="flex flex-col items-center justify-center py-10 text-center"><div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100 shadow-sm">`);
        _push(ssrRenderComponent(unref(Store), { class: "w-8 h-8 text-slate-300" }, null, _parent));
        _push(`</div><h4 class="text-base font-semibold text-slate-800 mb-1">No vendors yet</h4><p class="text-sm text-slate-500 max-w-[250px]">When vendors register on the platform, they will appear here.</p></div>`);
      } else {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(vendors).slice(0, 5), (vendor) => {
          var _a2, _b2, _c2, _d2;
          _push(`<div class="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer"><div class="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-700 font-bold uppercase shadow-sm">${ssrInterpolate(((_a2 = vendor.businessName) == null ? void 0 : _a2.substring(0, 2)) || ((_b2 = vendor.slug) == null ? void 0 : _b2.substring(0, 2)) || "V")}</div><div class="flex-1"><div class="text-sm font-semibold text-slate-900">${ssrInterpolate(vendor.businessName || "Unnamed Vendor")}</div><div class="text-xs text-slate-500">${ssrInterpolate(((_c2 = vendor.location) == null ? void 0 : _c2.city) || "No Location")}, ${ssrInterpolate(((_d2 = vendor.location) == null ? void 0 : _d2.state) || "")}</div></div><span class="${ssrRenderClass([vendor.isApproved ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200", "text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border"])}">${ssrInterpolate(vendor.isApproved ? "APPROVED" : "PENDING")}</span></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"><div class="flex justify-between items-center mb-6"><h3 class="text-lg font-heading font-bold text-slate-900">Recent Orders</h3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/orders",
        class: "text-sm text-primary-600 font-semibold hover:text-primary-800 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View All`);
          } else {
            return [
              createTextVNode("View All")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(ordersLoading)) {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="animate-pulse flex items-center gap-3"><div class="w-10 h-10 bg-slate-100 rounded-full"></div><div class="flex-1 space-y-2"><div class="h-4 bg-slate-100 rounded w-1/2"></div><div class="h-3 bg-slate-100 rounded w-1/3"></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(orders).length === 0) {
        _push(`<div class="flex flex-col items-center justify-center py-10 text-center"><div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100 shadow-sm">`);
        _push(ssrRenderComponent(unref(Package), { class: "w-8 h-8 text-slate-300" }, null, _parent));
        _push(`</div><h4 class="text-base font-semibold text-slate-800 mb-1">No orders yet</h4><p class="text-sm text-slate-500 max-w-[250px]">Recent transactions and purchases will be displayed here.</p></div>`);
      } else {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(orders).slice(0, 5), (order) => {
          var _a2, _b2;
          _push(`<div class="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"><div class="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 shadow-sm">`);
          _push(ssrRenderComponent(unref(Package), { class: "w-4 h-4" }, null, _parent));
          _push(`</div><div class="flex-1"><div class="text-sm font-semibold text-slate-900">${ssrInterpolate(order.orderNumber || `#${order._id.substring(0, 8).toUpperCase()}`)}</div><div class="text-xs text-slate-500">${ssrInterpolate(((_a2 = order.userId) == null ? void 0 : _a2.email) || "Guest User")}</div></div><div class="text-sm font-extrabold text-slate-900">\u20A6${ssrInterpolate(((_b2 = order.totalAmount) == null ? void 0 : _b2.toLocaleString()) || 0)}</div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(FloatingDrawer, {
        modelValue: drawerOpen.value,
        "onUpdate:modelValue": ($event) => drawerOpen.value = $event,
        title: drawerTitle.value
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/vendors",
              class: "btn-primary w-full text-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Manage in Vendors`);
                } else {
                  return [
                    createTextVNode("Manage in Vendors")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "/vendors",
                class: "btn-primary w-full text-center"
              }, {
                default: withCtx(() => [
                  createTextVNode("Manage in Vendors")
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2;
          if (_push2) {
            if (drawerData.value) {
              _push2(`<div class="space-y-6"${_scopeId}><div class="flex items-center gap-4 border-b border-slate-100 pb-6"${_scopeId}><div class="w-16 h-16 rounded-2xl bg-primary-50 text-primary-800 flex items-center justify-center text-2xl font-bold uppercase"${_scopeId}>${ssrInterpolate(((_a2 = drawerData.value.businessName) == null ? void 0 : _a2.charAt(0)) || ((_b2 = drawerData.value.slug) == null ? void 0 : _b2.charAt(0)) || "V")}</div><div${_scopeId}><h4 class="text-lg font-bold text-slate-900"${_scopeId}>${ssrInterpolate(drawerData.value.businessName || "Unnamed Vendor")}</h4><p class="text-slate-500 text-sm"${_scopeId}>@${ssrInterpolate(drawerData.value.slug || "slug-unavailable")}</p></div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div class="bg-slate-50 p-4 rounded-xl border border-slate-100"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Status</div><span class="${ssrRenderClass(drawerData.value.isApproved ? "badge-active" : "badge-pending")}"${_scopeId}>${ssrInterpolate(drawerData.value.isApproved ? "APPROVED" : "PENDING")}</span></div><div class="bg-slate-50 p-4 rounded-xl border border-slate-100"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Joined</div><div class="font-medium text-slate-900"${_scopeId}>${ssrInterpolate(new Date(drawerData.value.createdAt).toLocaleDateString())}</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              drawerData.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-6"
              }, [
                createVNode("div", { class: "flex items-center gap-4 border-b border-slate-100 pb-6" }, [
                  createVNode("div", { class: "w-16 h-16 rounded-2xl bg-primary-50 text-primary-800 flex items-center justify-center text-2xl font-bold uppercase" }, toDisplayString(((_c2 = drawerData.value.businessName) == null ? void 0 : _c2.charAt(0)) || ((_d2 = drawerData.value.slug) == null ? void 0 : _d2.charAt(0)) || "V"), 1),
                  createVNode("div", null, [
                    createVNode("h4", { class: "text-lg font-bold text-slate-900" }, toDisplayString(drawerData.value.businessName || "Unnamed Vendor"), 1),
                    createVNode("p", { class: "text-slate-500 text-sm" }, "@" + toDisplayString(drawerData.value.slug || "slug-unavailable"), 1)
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100" }, [
                    createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Status"),
                    createVNode("span", {
                      class: drawerData.value.isApproved ? "badge-active" : "badge-pending"
                    }, toDisplayString(drawerData.value.isApproved ? "APPROVED" : "PENDING"), 3)
                  ]),
                  createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100" }, [
                    createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Joined"),
                    createVNode("div", { class: "font-medium text-slate-900" }, toDisplayString(new Date(drawerData.value.createdAt).toLocaleDateString()), 1)
                  ])
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-V14dTnFH.mjs.map
