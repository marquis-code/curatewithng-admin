import { defineComponent, ref, computed, resolveComponent, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createTextVNode, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Search, Package, Calendar, CreditCard, User, Gift, Truck, MapPin, ShoppingBag, Image } from "lucide-vue-next";
import { F as FloatingDrawer } from "./FloatingDrawer-CcGngjEx.js";
import { u as useFetchOrders } from "./useFetchOrders-BFxb0J94.js";
import "/Users/marquis/curatewithng/admin/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-CyTADNBk.js";
import "../server.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/marquis/curatewithng/admin/node_modules/unctx/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/marquis/curatewithng/admin/node_modules/defu/dist/defu.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/ufo/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/klona/dist/index.mjs";
import "./axios.config-DHAaROs1.js";
import "axios";
import "./user-BM2pELKn.js";
import "./cookie-IdT47JXv.js";
import "/Users/marquis/curatewithng/admin/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/destr/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/ohash/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Orders — Admin Portal" });
    const { orders, loading } = useFetchOrders();
    const searchQuery = ref("");
    const statusFilter = ref("");
    const drawerOpen = ref(false);
    const selectedOrder = ref(null);
    const filteredOrders = computed(() => {
      let result = orders.value;
      if (statusFilter.value) {
        result = result.filter((o) => o.status === statusFilter.value);
      }
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(
          (o) => o.orderNumber?.toLowerCase().includes(q) || o._id?.toLowerCase().includes(q)
        );
      }
      return result;
    });
    const getStatusClass = (status) => {
      switch (status) {
        case "DELIVERED":
          return "text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-emerald-100 text-emerald-800 border-emerald-200";
        case "SHIPPED":
          return "text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-indigo-100 text-indigo-800 border-indigo-200";
        case "PROCESSING":
          return "text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-blue-100 text-blue-800 border-blue-200";
        case "CANCELLED":
          return "text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-red-100 text-red-800 border-red-200";
        default:
          return "text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-slate-100 text-slate-600 border-slate-200";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CustomSelect = resolveComponent("CustomSelect");
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"><div><h1 class="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-1">Orders</h1><p class="text-slate-500">Monitor platform transactions</p></div></div><div class="card overflow-hidden bg-white border border-slate-200 shadow-sm rounded-xl"><div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50"><div class="relative w-full max-w-sm"><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Search orders by ID..." class="input-field !py-2 w-full pl-10 bg-white">`);
      _push(ssrRenderComponent(unref(Search), { class: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CustomSelect, {
        modelValue: statusFilter.value,
        "onUpdate:modelValue": ($event) => statusFilter.value = $event,
        options: [
          { label: "All Statuses", value: "" },
          { label: "Pending", value: "PENDING" },
          { label: "Processing", value: "PROCESSING" },
          { label: "Shipped", value: "SHIPPED" },
          { label: "Delivered", value: "DELIVERED" },
          { label: "Cancelled", value: "CANCELLED" }
        ],
        placeholder: "All Statuses",
        class: "w-full sm:w-48"
      }, null, _parent));
      _push(`</div><div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-slate-50 text-sm font-semibold text-slate-600 border-b border-slate-200"><th class="p-4 rounded-tl-xl whitespace-nowrap">Order ID</th><th class="p-4 whitespace-nowrap">Customer</th><th class="p-4 whitespace-nowrap">Recipient</th><th class="p-4 whitespace-nowrap">Amount</th><th class="p-4 whitespace-nowrap">Payment</th><th class="p-4 whitespace-nowrap">Fulfillment</th><th class="p-4 whitespace-nowrap">Date</th><th class="p-4 text-right rounded-tr-xl whitespace-nowrap">Actions</th></tr></thead><tbody class="text-sm text-slate-600">`);
      if (unref(loading)) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<tr class="border-b border-slate-100"><td class="p-4"><div class="h-4 bg-slate-200 rounded w-24 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-32 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-24 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-20 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-16 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-16 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-20 animate-pulse"></div></td><td class="p-4 text-right"><div class="h-8 w-16 bg-slate-200 rounded ml-auto animate-pulse"></div></td></tr>`);
        });
        _push(`<!--]-->`);
      } else if (filteredOrders.value.length === 0) {
        _push(`<tr class="border-b border-slate-100"><td colspan="8" class="p-8 text-center text-slate-500">No orders found</td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(filteredOrders.value, (order) => {
          _push(`<tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors"><td class="p-4 font-medium text-slate-900 font-mono text-sm">${ssrInterpolate(order.orderNumber || `#${order._id?.substring(0, 8).toUpperCase()}`)}</td><td class="p-4"><div class="flex flex-col"><span class="font-medium text-slate-900">${ssrInterpolate(order.userId?.firstName)} ${ssrInterpolate(order.userId?.lastName)}</span><span class="text-xs text-slate-500">${ssrInterpolate(order.userId?.email || "Guest User")}</span></div></td><td class="p-4"><div class="flex flex-col"><span class="font-medium text-slate-700">${ssrInterpolate(order.recipient?.name || "N/A")}</span><span class="text-xs text-slate-500">${ssrInterpolate(order.recipient?.phone || "")}</span></div></td><td class="p-4"><div class="flex flex-col"><span class="font-bold text-slate-900">₦${ssrInterpolate(order.totalAmount?.toLocaleString() || 0)}</span><span class="text-[10px] text-slate-400 font-medium uppercase tracking-wider">${ssrInterpolate(order.items?.length || 0)} Items</span></div></td><td class="p-4"><span class="${ssrRenderClass([order.paymentStatus === "PAID" ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-amber-100 text-amber-800 border-amber-200", "text-[10px] uppercase font-bold px-2 py-0.5 rounded border"])}">${ssrInterpolate(order.paymentStatus || "UNPAID")}</span></td><td class="p-4"><span class="${ssrRenderClass(getStatusClass(order.status))}">${ssrInterpolate(order.status || "PENDING")}</span></td><td class="p-4 text-xs font-medium text-slate-500">${ssrInterpolate(new Date(order.createdAt).toLocaleDateString())}</td><td class="p-4 text-right"><button class="text-primary-600 hover:text-primary-700 font-medium px-3 py-1 rounded hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-100"> Inspect </button></td></tr>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div></div>`);
      _push(ssrRenderComponent(FloatingDrawer, {
        modelValue: drawerOpen.value,
        "onUpdate:modelValue": ($event) => drawerOpen.value = $event,
        title: "Order Inspector"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (selectedOrder.value) {
              _push2(`<div class="space-y-6 pb-12"${_scopeId}><div class="bg-primary-50 p-6 rounded-2xl border border-primary-100 text-center relative overflow-hidden"${_scopeId}><div class="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-transparent pointer-events-none"${_scopeId}></div><div class="relative z-10"${_scopeId}><div class="text-xs text-primary-600 font-bold uppercase tracking-widest mb-2"${_scopeId}>Total Amount</div><div class="text-4xl font-heading font-black text-primary-900"${_scopeId}>₦${ssrInterpolate(selectedOrder.value.totalAmount?.toLocaleString() || 0)}</div><div class="mt-4 flex items-center justify-center gap-2"${_scopeId}><span class="${ssrRenderClass(getStatusClass(selectedOrder.value.status))}"${_scopeId}>${ssrInterpolate(selectedOrder.value.status || "PENDING")}</span><span class="${ssrRenderClass([selectedOrder.value.paymentStatus === "PAID" ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-amber-100 text-amber-800 border-amber-200", "text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border"])}"${_scopeId}>${ssrInterpolate(selectedOrder.value.paymentStatus || "UNPAID")}</span></div></div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"${_scopeId}><div class="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Package), { class: "w-3 h-3" }, null, _parent2, _scopeId));
              _push2(` Order ID </div><div class="font-mono font-bold text-slate-900 text-sm"${_scopeId}>${ssrInterpolate(selectedOrder.value.orderNumber || `#${selectedOrder.value._id?.substring(0, 12).toUpperCase()}`)}</div></div><div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"${_scopeId}><div class="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Calendar), { class: "w-3 h-3" }, null, _parent2, _scopeId));
              _push2(` Timestamp </div><div class="font-bold text-slate-900 text-sm"${_scopeId}>${ssrInterpolate(new Date(selectedOrder.value.createdAt).toLocaleString())}</div></div></div><div class="space-y-4 pt-2"${_scopeId}><h5 class="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CreditCard), { class: "w-4 h-4 text-primary-500" }, null, _parent2, _scopeId));
              _push2(` Financial Split </h5><div class="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3 text-sm text-slate-600"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>Vendor Payout</span><span class="font-bold text-slate-900"${_scopeId}>₦${ssrInterpolate(selectedOrder.value.vendorAmount?.toLocaleString() || 0)}</span></div><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>Platform Commission</span><span class="font-bold text-primary-600"${_scopeId}>₦${ssrInterpolate(selectedOrder.value.platformFee?.toLocaleString() || 0)}</span></div>`);
              if (selectedOrder.value.paystackReference) {
                _push2(`<div class="flex justify-between items-center pt-3 border-t border-slate-200 mt-2"${_scopeId}><span class="text-xs font-bold uppercase tracking-wider text-slate-400"${_scopeId}>Gateway Ref</span><span class="font-mono text-xs font-bold text-slate-500"${_scopeId}>${ssrInterpolate(selectedOrder.value.paystackReference)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"${_scopeId}><div class="space-y-3 border-t border-slate-100 pt-4"${_scopeId}><h5 class="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(User), { class: "w-3 h-3 text-emerald-500" }, null, _parent2, _scopeId));
              _push2(` Customer (Buyer) </h5><div class="text-sm text-slate-600 bg-white shadow-sm p-4 rounded-xl border border-slate-200 space-y-2"${_scopeId}><div class="font-bold text-slate-900 text-base"${_scopeId}>${ssrInterpolate(selectedOrder.value.userId?.firstName)} ${ssrInterpolate(selectedOrder.value.userId?.lastName)}</div><div class="text-slate-500 text-xs"${_scopeId}>${ssrInterpolate(selectedOrder.value.userId?.email)}</div></div></div>`);
              if (selectedOrder.value.recipient) {
                _push2(`<div class="space-y-3 border-t border-slate-100 pt-4"${_scopeId}><h5 class="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Gift), { class: "w-3 h-3 text-indigo-500" }, null, _parent2, _scopeId));
                _push2(` Recipient </h5><div class="text-sm text-slate-600 bg-white shadow-sm p-4 rounded-xl border border-slate-200 space-y-2"${_scopeId}><div class="font-bold text-slate-900 text-base"${_scopeId}>${ssrInterpolate(selectedOrder.value.recipient.name)}</div><div class="text-slate-500 text-xs"${_scopeId}>${ssrInterpolate(selectedOrder.value.recipient.phone || "No phone provided")}</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (selectedOrder.value.recipient) {
                _push2(`<div class="space-y-4 pt-4 border-t border-slate-100"${_scopeId}><h5 class="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Truck), { class: "w-4 h-4 text-amber-500" }, null, _parent2, _scopeId));
                _push2(` Delivery Instructions </h5><div class="text-sm text-slate-600 bg-amber-50/30 p-4 rounded-xl border border-amber-100 space-y-3"${_scopeId}><div class="flex items-start gap-3"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(MapPin), { class: "w-4 h-4 text-amber-500 mt-0.5" }, null, _parent2, _scopeId));
                _push2(`<span class="font-medium text-slate-800"${_scopeId}>${ssrInterpolate(selectedOrder.value.recipient.address || "No address provided")}</span></div>`);
                if (selectedOrder.value.recipient.deliveryDate) {
                  _push2(`<div class="text-xs font-bold text-amber-700 bg-amber-100 inline-block px-2 py-1 rounded ml-7"${_scopeId}> Deliver On: ${ssrInterpolate(new Date(selectedOrder.value.recipient.deliveryDate).toLocaleDateString())}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (selectedOrder.value.recipient.note) {
                  _push2(`<div class="mt-3 p-3 bg-white rounded-lg border border-slate-200 italic text-slate-600 shadow-sm relative"${_scopeId}><span class="absolute -top-2 -left-2 text-2xl text-slate-300"${_scopeId}>&quot;</span> ${ssrInterpolate(selectedOrder.value.recipient.note)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="space-y-4 pt-4 border-t border-slate-100"${_scopeId}><h5 class="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ShoppingBag), { class: "w-4 h-4 text-rose-500" }, null, _parent2, _scopeId));
              _push2(` Order Items (${ssrInterpolate(selectedOrder.value.items?.length || 0)}) </h5><div class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(selectedOrder.value.items, (item) => {
                _push2(`<div class="flex items-center gap-4 p-3 bg-white shadow-sm rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"${_scopeId}><div class="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200"${_scopeId}>`);
                if (item.giftId?.images?.[0]) {
                  _push2(`<img${ssrRenderAttr("src", item.giftId.images[0])} class="w-full h-full object-cover"${_scopeId}>`);
                } else {
                  _push2(`<div class="w-full h-full flex items-center justify-center text-slate-400"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Image), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                }
                _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><div class="font-bold text-slate-900 truncate"${_scopeId}>${ssrInterpolate(item.giftId?.name || "Unknown Gift Item")}</div><div class="text-xs text-slate-500 mt-0.5"${_scopeId}><span class="font-mono bg-slate-100 px-1 rounded border border-slate-200"${_scopeId}>Qty: ${ssrInterpolate(item.quantity)}</span> × ₦${ssrInterpolate(item.unitPrice?.toLocaleString() || 0)}</div></div><div class="font-black text-slate-900 text-right"${_scopeId}> ₦${ssrInterpolate((item.unitPrice * item.quantity)?.toLocaleString() || 0)}</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
              if (selectedOrder.value.timeline?.length > 0) {
                _push2(`<div class="space-y-4 pt-4 border-t border-slate-100"${_scopeId}><h5 class="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2"${_scopeId}>Activity Timeline</h5><div class="space-y-4 relative pl-4 border-l-2 border-slate-200 ml-2 pt-2"${_scopeId}><!--[-->`);
                ssrRenderList(selectedOrder.value.timeline, (event, idx) => {
                  _push2(`<div class="relative"${_scopeId}><div class="${ssrRenderClass([idx === selectedOrder.value.timeline.length - 1 ? "bg-primary-500" : "bg-slate-300", "absolute -left-[23px] top-1 w-3 h-3 rounded-full border-[3px] border-white shadow-sm"])}"${_scopeId}></div><div class="text-sm font-bold text-slate-900"${_scopeId}>${ssrInterpolate(event.status)}</div><div class="text-xs font-mono text-slate-400 mt-0.5"${_scopeId}>${ssrInterpolate(new Date(event.timestamp).toLocaleString())}</div>`);
                  if (event.note) {
                    _push2(`<p class="text-sm text-slate-600 mt-1 bg-slate-50 p-2 rounded-md border border-slate-100"${_scopeId}>${ssrInterpolate(event.note)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              selectedOrder.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-6 pb-12"
              }, [
                createVNode("div", { class: "bg-primary-50 p-6 rounded-2xl border border-primary-100 text-center relative overflow-hidden" }, [
                  createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-primary-100/50 to-transparent pointer-events-none" }),
                  createVNode("div", { class: "relative z-10" }, [
                    createVNode("div", { class: "text-xs text-primary-600 font-bold uppercase tracking-widest mb-2" }, "Total Amount"),
                    createVNode("div", { class: "text-4xl font-heading font-black text-primary-900" }, "₦" + toDisplayString(selectedOrder.value.totalAmount?.toLocaleString() || 0), 1),
                    createVNode("div", { class: "mt-4 flex items-center justify-center gap-2" }, [
                      createVNode("span", {
                        class: getStatusClass(selectedOrder.value.status)
                      }, toDisplayString(selectedOrder.value.status || "PENDING"), 3),
                      createVNode("span", {
                        class: [selectedOrder.value.paymentStatus === "PAID" ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-amber-100 text-amber-800 border-amber-200", "text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border"]
                      }, toDisplayString(selectedOrder.value.paymentStatus || "UNPAID"), 3)
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode("div", { class: "bg-white p-4 rounded-xl border border-slate-200 shadow-sm" }, [
                    createVNode("div", { class: "text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider flex items-center gap-2" }, [
                      createVNode(unref(Package), { class: "w-3 h-3" }),
                      createTextVNode(" Order ID ")
                    ]),
                    createVNode("div", { class: "font-mono font-bold text-slate-900 text-sm" }, toDisplayString(selectedOrder.value.orderNumber || `#${selectedOrder.value._id?.substring(0, 12).toUpperCase()}`), 1)
                  ]),
                  createVNode("div", { class: "bg-white p-4 rounded-xl border border-slate-200 shadow-sm" }, [
                    createVNode("div", { class: "text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider flex items-center gap-2" }, [
                      createVNode(unref(Calendar), { class: "w-3 h-3" }),
                      createTextVNode(" Timestamp ")
                    ]),
                    createVNode("div", { class: "font-bold text-slate-900 text-sm" }, toDisplayString(new Date(selectedOrder.value.createdAt).toLocaleString()), 1)
                  ])
                ]),
                createVNode("div", { class: "space-y-4 pt-2" }, [
                  createVNode("h5", { class: "text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2" }, [
                    createVNode(unref(CreditCard), { class: "w-4 h-4 text-primary-500" }),
                    createTextVNode(" Financial Split ")
                  ]),
                  createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3 text-sm text-slate-600" }, [
                    createVNode("div", { class: "flex justify-between items-center" }, [
                      createVNode("span", null, "Vendor Payout"),
                      createVNode("span", { class: "font-bold text-slate-900" }, "₦" + toDisplayString(selectedOrder.value.vendorAmount?.toLocaleString() || 0), 1)
                    ]),
                    createVNode("div", { class: "flex justify-between items-center" }, [
                      createVNode("span", null, "Platform Commission"),
                      createVNode("span", { class: "font-bold text-primary-600" }, "₦" + toDisplayString(selectedOrder.value.platformFee?.toLocaleString() || 0), 1)
                    ]),
                    selectedOrder.value.paystackReference ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-between items-center pt-3 border-t border-slate-200 mt-2"
                    }, [
                      createVNode("span", { class: "text-xs font-bold uppercase tracking-wider text-slate-400" }, "Gateway Ref"),
                      createVNode("span", { class: "font-mono text-xs font-bold text-slate-500" }, toDisplayString(selectedOrder.value.paystackReference), 1)
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 pt-2" }, [
                  createVNode("div", { class: "space-y-3 border-t border-slate-100 pt-4" }, [
                    createVNode("h5", { class: "text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2" }, [
                      createVNode(unref(User), { class: "w-3 h-3 text-emerald-500" }),
                      createTextVNode(" Customer (Buyer) ")
                    ]),
                    createVNode("div", { class: "text-sm text-slate-600 bg-white shadow-sm p-4 rounded-xl border border-slate-200 space-y-2" }, [
                      createVNode("div", { class: "font-bold text-slate-900 text-base" }, toDisplayString(selectedOrder.value.userId?.firstName) + " " + toDisplayString(selectedOrder.value.userId?.lastName), 1),
                      createVNode("div", { class: "text-slate-500 text-xs" }, toDisplayString(selectedOrder.value.userId?.email), 1)
                    ])
                  ]),
                  selectedOrder.value.recipient ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-3 border-t border-slate-100 pt-4"
                  }, [
                    createVNode("h5", { class: "text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2" }, [
                      createVNode(unref(Gift), { class: "w-3 h-3 text-indigo-500" }),
                      createTextVNode(" Recipient ")
                    ]),
                    createVNode("div", { class: "text-sm text-slate-600 bg-white shadow-sm p-4 rounded-xl border border-slate-200 space-y-2" }, [
                      createVNode("div", { class: "font-bold text-slate-900 text-base" }, toDisplayString(selectedOrder.value.recipient.name), 1),
                      createVNode("div", { class: "text-slate-500 text-xs" }, toDisplayString(selectedOrder.value.recipient.phone || "No phone provided"), 1)
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                selectedOrder.value.recipient ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-4 pt-4 border-t border-slate-100"
                }, [
                  createVNode("h5", { class: "text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2" }, [
                    createVNode(unref(Truck), { class: "w-4 h-4 text-amber-500" }),
                    createTextVNode(" Delivery Instructions ")
                  ]),
                  createVNode("div", { class: "text-sm text-slate-600 bg-amber-50/30 p-4 rounded-xl border border-amber-100 space-y-3" }, [
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode(unref(MapPin), { class: "w-4 h-4 text-amber-500 mt-0.5" }),
                      createVNode("span", { class: "font-medium text-slate-800" }, toDisplayString(selectedOrder.value.recipient.address || "No address provided"), 1)
                    ]),
                    selectedOrder.value.recipient.deliveryDate ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-xs font-bold text-amber-700 bg-amber-100 inline-block px-2 py-1 rounded ml-7"
                    }, " Deliver On: " + toDisplayString(new Date(selectedOrder.value.recipient.deliveryDate).toLocaleDateString()), 1)) : createCommentVNode("", true),
                    selectedOrder.value.recipient.note ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mt-3 p-3 bg-white rounded-lg border border-slate-200 italic text-slate-600 shadow-sm relative"
                    }, [
                      createVNode("span", { class: "absolute -top-2 -left-2 text-2xl text-slate-300" }, '"'),
                      createTextVNode(" " + toDisplayString(selectedOrder.value.recipient.note), 1)
                    ])) : createCommentVNode("", true)
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "space-y-4 pt-4 border-t border-slate-100" }, [
                  createVNode("h5", { class: "text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2" }, [
                    createVNode(unref(ShoppingBag), { class: "w-4 h-4 text-rose-500" }),
                    createTextVNode(" Order Items (" + toDisplayString(selectedOrder.value.items?.length || 0) + ") ", 1)
                  ]),
                  createVNode("div", { class: "space-y-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.items, (item) => {
                      return openBlock(), createBlock("div", {
                        key: item._id,
                        class: "flex items-center gap-4 p-3 bg-white shadow-sm rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                      }, [
                        createVNode("div", { class: "w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200" }, [
                          item.giftId?.images?.[0] ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: item.giftId.images[0],
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "w-full h-full flex items-center justify-center text-slate-400"
                          }, [
                            createVNode(unref(Image), { class: "w-4 h-4" })
                          ]))
                        ]),
                        createVNode("div", { class: "flex-1 min-w-0" }, [
                          createVNode("div", { class: "font-bold text-slate-900 truncate" }, toDisplayString(item.giftId?.name || "Unknown Gift Item"), 1),
                          createVNode("div", { class: "text-xs text-slate-500 mt-0.5" }, [
                            createVNode("span", { class: "font-mono bg-slate-100 px-1 rounded border border-slate-200" }, "Qty: " + toDisplayString(item.quantity), 1),
                            createTextVNode(" × ₦" + toDisplayString(item.unitPrice?.toLocaleString() || 0), 1)
                          ])
                        ]),
                        createVNode("div", { class: "font-black text-slate-900 text-right" }, " ₦" + toDisplayString((item.unitPrice * item.quantity)?.toLocaleString() || 0), 1)
                      ]);
                    }), 128))
                  ])
                ]),
                selectedOrder.value.timeline?.length > 0 ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-4 pt-4 border-t border-slate-100"
                }, [
                  createVNode("h5", { class: "text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2" }, "Activity Timeline"),
                  createVNode("div", { class: "space-y-4 relative pl-4 border-l-2 border-slate-200 ml-2 pt-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.timeline, (event, idx) => {
                      return openBlock(), createBlock("div", {
                        key: idx,
                        class: "relative"
                      }, [
                        createVNode("div", {
                          class: ["absolute -left-[23px] top-1 w-3 h-3 rounded-full border-[3px] border-white shadow-sm", idx === selectedOrder.value.timeline.length - 1 ? "bg-primary-500" : "bg-slate-300"]
                        }, null, 2),
                        createVNode("div", { class: "text-sm font-bold text-slate-900" }, toDisplayString(event.status), 1),
                        createVNode("div", { class: "text-xs font-mono text-slate-400 mt-0.5" }, toDisplayString(new Date(event.timestamp).toLocaleString()), 1),
                        event.note ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-slate-600 mt-1 bg-slate-50 p-2 rounded-md border border-slate-100"
                        }, toDisplayString(event.note), 1)) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/orders/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DOdt6Knv.js.map
