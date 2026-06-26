import { defineComponent, ref, computed, resolveComponent, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, useSSRContext } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/server-renderer/index.mjs';
import { Search, Building, CreditCard, User, CheckCircle, XCircle } from 'file:///Users/marquis/curatewithng/admin/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';
import { F as FloatingDrawer } from './FloatingDrawer-CcGngjEx.mjs';
import { _ as _sfc_main$1 } from './ConfirmModal-sqmrmPpx.mjs';
import { G as GATEWAY_ENDPOINT_WITH_AUTH } from './axios.config-DHAaROs1.mjs';
import { u as useCustomToast } from './server.mjs';
import { u as useHead } from './v3-CyTADNBk.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/axios/index.js';
import './user-BM2pELKn.mjs';
import './cookie-IdT47JXv.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/h3/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/destr/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/ohash/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/klona/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/ufo/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/hookable/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/defu/dist/defu.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/scule/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unctx/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/marquis/curatewithng/admin/node_modules/pathe/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/ipx/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/vue-router/vue-router.node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unhead/dist/server.mjs';
import 'node:async_hooks';
import 'file:///Users/marquis/curatewithng/admin/node_modules/devalue/index.js';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/unhead/dist/plugins.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Payouts \u2014 Admin Portal" });
    const { showToast } = useCustomToast();
    const payouts = ref([]);
    const loading = ref(false);
    const actionLoading = ref(false);
    const searchQuery = ref("");
    const statusFilter = ref("");
    const drawerOpen = ref(false);
    const selectedPayout = ref(null);
    const fetchPayouts = async () => {
      var _a;
      loading.value = true;
      try {
        const res = await GATEWAY_ENDPOINT_WITH_AUTH.get("/payments/payouts");
        payouts.value = ((_a = res.data) == null ? void 0 : _a.data) || res.data || [];
      } catch (error) {
        console.error("Error fetching payouts", error);
      } finally {
        loading.value = false;
      }
    };
    const filteredPayouts = computed(() => {
      let result = payouts.value;
      if (statusFilter.value) {
        result = result.filter((p) => p.status === statusFilter.value);
      }
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(
          (p) => {
            var _a, _b;
            return (_b = (_a = p.vendor) == null ? void 0 : _a.businessName) == null ? void 0 : _b.toLowerCase().includes(q);
          }
        );
      }
      return result;
    });
    const confirmApprove = ref(false);
    const confirmReject = ref(false);
    const executeApprove = async () => {
      var _a, _b;
      if (selectedPayout.value) {
        actionLoading.value = true;
        try {
          await GATEWAY_ENDPOINT_WITH_AUTH.post(`/payments/payout/${selectedPayout.value.id}/approve`);
          showToast({ title: "Success", message: "Payout approved", toastType: "success" });
          selectedPayout.value.status = "COMPLETED";
          await fetchPayouts();
          confirmApprove.value = false;
          drawerOpen.value = false;
        } catch (error) {
          showToast({ title: "Error", message: ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Failed to approve", toastType: "error" });
        } finally {
          actionLoading.value = false;
        }
      }
    };
    const executeReject = async () => {
      if (selectedPayout.value) {
        actionLoading.value = true;
        setTimeout(() => {
          selectedPayout.value.status = "REJECTED";
          actionLoading.value = false;
          confirmReject.value = false;
          drawerOpen.value = false;
        }, 1e3);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CustomSelect = resolveComponent("CustomSelect");
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"><div><h1 class="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-1">Payouts</h1><p class="text-slate-500">Manage vendor withdrawal requests</p></div></div><div class="card overflow-hidden"><div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50"><div class="relative w-full max-w-sm"><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Search payouts by vendor..." class="input-field !py-2 w-full pl-10">`);
      _push(ssrRenderComponent(unref(Search), { class: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CustomSelect, {
        modelValue: statusFilter.value,
        "onUpdate:modelValue": ($event) => statusFilter.value = $event,
        options: [
          { label: "All Statuses", value: "" },
          { label: "Pending", value: "PENDING" },
          { label: "Completed", value: "COMPLETED" },
          { label: "Rejected", value: "REJECTED" }
        ],
        placeholder: "All Statuses",
        class: "w-full sm:w-48"
      }, null, _parent));
      _push(`</div><div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-white border-b border-slate-200 text-sm font-semibold text-slate-600"><th class="p-4">Vendor</th><th class="p-4">Amount</th><th class="p-4">Status</th><th class="p-4">Requested At</th><th class="p-4 text-right">Actions</th></tr></thead><tbody>`);
      if (loading.value) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<tr class="border-b border-slate-100 bg-white"><td class="p-4"><div class="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div></td><td class="p-4 text-right"><div class="h-8 w-20 bg-slate-200 rounded ml-auto animate-pulse"></div></td></tr>`);
        });
        _push(`<!--]-->`);
      } else if (filteredPayouts.value.length === 0) {
        _push(`<tr class="border-b border-slate-100 bg-white"><td colspan="5" class="p-8 text-center text-slate-500">No payouts found</td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(filteredPayouts.value, (payout) => {
          var _a, _b;
          _push(`<tr class="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors"><td class="p-4 font-medium text-slate-900">${ssrInterpolate(((_a = payout.vendor) == null ? void 0 : _a.businessName) || "Unknown Vendor")}</td><td class="p-4 font-bold text-slate-900">\u20A6${ssrInterpolate(((_b = payout.amount) == null ? void 0 : _b.toLocaleString()) || 0)}</td><td class="p-4"><span class="${ssrRenderClass(payout.status === "COMPLETED" ? "badge-active" : payout.status === "PENDING" ? "badge-pending" : "badge-neutral")}">${ssrInterpolate(payout.status || "PENDING")}</span></td><td class="p-4 text-sm text-slate-600">${ssrInterpolate(new Date(payout.createdAt).toLocaleDateString())}</td><td class="p-4 text-right"><button class="text-primary-600 hover:text-primary-800 font-medium text-sm border border-primary-200 px-3 py-1 rounded-lg hover:bg-primary-50 transition-colors"> Review </button></td></tr>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div></div>`);
      _push(ssrRenderComponent(FloatingDrawer, {
        modelValue: drawerOpen.value,
        "onUpdate:modelValue": ($event) => drawerOpen.value = $event,
        title: "Payout Review"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            if (selectedPayout.value) {
              _push2(`<div class="space-y-6"${_scopeId}><div class="bg-primary-50 p-6 rounded-2xl border border-primary-100 text-center"${_scopeId}><div class="text-xs text-primary-600 font-bold uppercase tracking-widest mb-2"${_scopeId}>Requested Amount</div><div class="text-4xl font-heading font-black text-primary-900"${_scopeId}>\u20A6${ssrInterpolate(((_a = selectedPayout.value.amount) == null ? void 0 : _a.toLocaleString()) || 0)}</div><div class="mt-4 inline-flex"${_scopeId}><span class="${ssrRenderClass(selectedPayout.value.status === "COMPLETED" ? "badge-active" : "badge-pending")}"${_scopeId}>${ssrInterpolate(selectedPayout.value.status || "PENDING")}</span></div></div><div class="space-y-4 pt-4 border-t border-slate-100"${_scopeId}><h5 class="text-sm font-bold text-slate-900"${_scopeId}>Vendor Bank Details</h5><div class="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Building), { class: "w-4 h-4 text-slate-400" }, null, _parent2, _scopeId));
              _push2(`<span class="font-medium text-slate-900"${_scopeId}>${ssrInterpolate(selectedPayout.value.bankName || "Not Provided")}</span></div><div class="flex items-center gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CreditCard), { class: "w-4 h-4 text-slate-400" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(selectedPayout.value.accountNumber || "N/A")}</span></div><div class="flex items-start gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(User), { class: "w-4 h-4 text-slate-400 mt-0.5" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(selectedPayout.value.accountName || "N/A")}</span></div></div></div>`);
              if (selectedPayout.value.status === "PENDING") {
                _push2(`<div class="pt-4 border-t border-slate-100 space-y-3"${_scopeId}><h5 class="text-sm font-bold text-slate-900 mb-4"${_scopeId}>Payout Actions</h5><button${ssrIncludeBooleanAttr(actionLoading.value) ? " disabled" : ""} class="w-full btn-primary py-3 flex justify-center items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle), { class: "w-5 h-5" }, null, _parent2, _scopeId));
                if (actionLoading.value) {
                  _push2(`<span${_scopeId}>Processing...</span>`);
                } else {
                  _push2(`<span${_scopeId}>Approve Transfer</span>`);
                }
                _push2(`</button><button${ssrIncludeBooleanAttr(actionLoading.value) ? " disabled" : ""} class="w-full px-4 py-3 rounded-xl border border-slate-200 text-danger-600 font-medium hover:bg-danger-50 transition-colors flex justify-center items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(XCircle), { class: "w-5 h-5" }, null, _parent2, _scopeId));
                if (actionLoading.value) {
                  _push2(`<span${_scopeId}>Processing...</span>`);
                } else {
                  _push2(`<span${_scopeId}>Reject Request</span>`);
                }
                _push2(`</button></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              selectedPayout.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-6"
              }, [
                createVNode("div", { class: "bg-primary-50 p-6 rounded-2xl border border-primary-100 text-center" }, [
                  createVNode("div", { class: "text-xs text-primary-600 font-bold uppercase tracking-widest mb-2" }, "Requested Amount"),
                  createVNode("div", { class: "text-4xl font-heading font-black text-primary-900" }, "\u20A6" + toDisplayString(((_b = selectedPayout.value.amount) == null ? void 0 : _b.toLocaleString()) || 0), 1),
                  createVNode("div", { class: "mt-4 inline-flex" }, [
                    createVNode("span", {
                      class: selectedPayout.value.status === "COMPLETED" ? "badge-active" : "badge-pending"
                    }, toDisplayString(selectedPayout.value.status || "PENDING"), 3)
                  ])
                ]),
                createVNode("div", { class: "space-y-4 pt-4 border-t border-slate-100" }, [
                  createVNode("h5", { class: "text-sm font-bold text-slate-900" }, "Vendor Bank Details"),
                  createVNode("div", { class: "text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3" }, [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode(unref(Building), { class: "w-4 h-4 text-slate-400" }),
                      createVNode("span", { class: "font-medium text-slate-900" }, toDisplayString(selectedPayout.value.bankName || "Not Provided"), 1)
                    ]),
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode(unref(CreditCard), { class: "w-4 h-4 text-slate-400" }),
                      createVNode("span", null, toDisplayString(selectedPayout.value.accountNumber || "N/A"), 1)
                    ]),
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode(unref(User), { class: "w-4 h-4 text-slate-400 mt-0.5" }),
                      createVNode("span", null, toDisplayString(selectedPayout.value.accountName || "N/A"), 1)
                    ])
                  ])
                ]),
                selectedPayout.value.status === "PENDING" ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "pt-4 border-t border-slate-100 space-y-3"
                }, [
                  createVNode("h5", { class: "text-sm font-bold text-slate-900 mb-4" }, "Payout Actions"),
                  createVNode("button", {
                    onClick: ($event) => confirmApprove.value = true,
                    disabled: actionLoading.value,
                    class: "w-full btn-primary py-3 flex justify-center items-center gap-2"
                  }, [
                    createVNode(unref(CheckCircle), { class: "w-5 h-5" }),
                    actionLoading.value ? (openBlock(), createBlock("span", { key: 0 }, "Processing...")) : (openBlock(), createBlock("span", { key: 1 }, "Approve Transfer"))
                  ], 8, ["onClick", "disabled"]),
                  createVNode("button", {
                    onClick: ($event) => confirmReject.value = true,
                    disabled: actionLoading.value,
                    class: "w-full px-4 py-3 rounded-xl border border-slate-200 text-danger-600 font-medium hover:bg-danger-50 transition-colors flex justify-center items-center gap-2"
                  }, [
                    createVNode(unref(XCircle), { class: "w-5 h-5" }),
                    actionLoading.value ? (openBlock(), createBlock("span", { key: 0 }, "Processing...")) : (openBlock(), createBlock("span", { key: 1 }, "Reject Request"))
                  ], 8, ["onClick", "disabled"])
                ])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        isOpen: confirmApprove.value,
        title: "Approve Payout",
        message: "Are you sure you want to approve this payout? Funds will be transferred to the vendor's bank account.",
        confirmText: "Approve Payout",
        type: "info",
        loading: actionLoading.value,
        onConfirm: executeApprove,
        onCancel: ($event) => confirmApprove.value = false
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        isOpen: confirmReject.value,
        title: "Reject Payout",
        message: "Are you sure you want to reject this payout request?",
        confirmText: "Reject Payout",
        type: "danger",
        loading: actionLoading.value,
        onConfirm: executeReject,
        onCancel: ($event) => confirmReject.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/payouts/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D_P47Bmk.mjs.map
