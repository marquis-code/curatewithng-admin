import { defineComponent, ref, computed, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, Fragment, renderList, createCommentVNode, useSSRContext } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/server-renderer/index.mjs';
import { Search, CheckCircle, XCircle } from 'file:///Users/marquis/curatewithng/admin/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';
import { F as FloatingDrawer } from './FloatingDrawer-CcGngjEx.mjs';
import { u as useFetchVendors } from './useFetchVendors-f9dzz7bE.mjs';
import { u as useHead } from './v3-CyTADNBk.mjs';
import './server.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/h3/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/ufo/dist/index.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Vendors \u2014 Admin Portal" });
    const { vendors, loading, actionLoading, approveVendor, rejectVendor } = useFetchVendors();
    const searchQuery = ref("");
    const statusFilter = ref("");
    const drawerOpen = ref(false);
    const selectedVendor = ref(null);
    const filteredVendors = computed(() => {
      let result = vendors.value;
      if (statusFilter.value) {
        if (statusFilter.value === "APPROVED") {
          result = result.filter((v) => v.isApproved);
        } else if (statusFilter.value === "PENDING") {
          result = result.filter((v) => !v.isApproved);
        }
      }
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(
          (v) => {
            var _a, _b, _c, _d;
            return ((_a = v.businessName) == null ? void 0 : _a.toLowerCase().includes(q)) || ((_c = (_b = v.userId) == null ? void 0 : _b.email) == null ? void 0 : _c.toLowerCase().includes(q)) || ((_d = v.slug) == null ? void 0 : _d.toLowerCase().includes(q));
          }
        );
      }
      return result;
    });
    const handleApprove = async () => {
      if (selectedVendor.value) {
        await approveVendor(selectedVendor.value._id);
        selectedVendor.value.isApproved = true;
      }
    };
    const handleReject = async () => {
      if (selectedVendor.value) {
        await rejectVendor(selectedVendor.value._id);
        selectedVendor.value.isApproved = false;
        drawerOpen.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-8"><div><h1 class="text-3xl font-heading font-bold text-slate-900 mb-1">Vendors</h1><p class="text-slate-500">Manage platform vendors and approvals</p></div></div><div class="card overflow-hidden"><div class="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50"><div class="relative w-full max-w-sm"><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Search vendors by business name..." class="input-field !py-2 w-full pl-10">`);
      _push(ssrRenderComponent(unref(Search), { class: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }, null, _parent));
      _push(`</div><select class="input-field !py-2 !w-48"><option value=""${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "") : ssrLooseEqual(statusFilter.value, "")) ? " selected" : ""}>All Statuses</option><option value="APPROVED"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "APPROVED") : ssrLooseEqual(statusFilter.value, "APPROVED")) ? " selected" : ""}>Approved</option><option value="PENDING"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "PENDING") : ssrLooseEqual(statusFilter.value, "PENDING")) ? " selected" : ""}>Pending</option><option value="REJECTED"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "REJECTED") : ssrLooseEqual(statusFilter.value, "REJECTED")) ? " selected" : ""}>Rejected</option><option value="SUSPENDED"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "SUSPENDED") : ssrLooseEqual(statusFilter.value, "SUSPENDED")) ? " selected" : ""}>Suspended</option></select></div><div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-white border-b border-slate-200 text-sm font-semibold text-slate-600"><th class="p-4">Business</th><th class="p-4">Owner Email</th><th class="p-4">Status</th><th class="p-4">Joined</th><th class="p-4 text-right">Actions</th></tr></thead><tbody>`);
      if (unref(loading)) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<tr class="border-b border-slate-100 bg-white"><td class="p-4"><div class="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div></td><td class="p-4 text-right"><div class="h-8 w-20 bg-slate-200 rounded ml-auto animate-pulse"></div></td></tr>`);
        });
        _push(`<!--]-->`);
      } else if (filteredVendors.value.length === 0) {
        _push(`<tr class="border-b border-slate-100 bg-white"><td colspan="5" class="p-8 text-center text-slate-500">No vendors found</td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(filteredVendors.value, (vendor) => {
          var _a, _b, _c;
          _push(`<tr class="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors"><td class="p-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 uppercase">${ssrInterpolate(((_a = vendor.businessName) == null ? void 0 : _a.substring(0, 2)) || ((_b = vendor.slug) == null ? void 0 : _b.substring(0, 2)) || "V")}</div><div><div class="font-medium text-slate-900">${ssrInterpolate(vendor.businessName || "Unnamed Vendor")}</div><div class="text-xs text-slate-500">@${ssrInterpolate(vendor.slug || "slug-unavailable")}</div></div></div></td><td class="p-4 text-sm text-slate-600">${ssrInterpolate(((_c = vendor.userId) == null ? void 0 : _c.email) || "No email attached")}</td><td class="p-4"><span class="${ssrRenderClass(vendor.isApproved ? "badge-active" : "badge-pending")}">${ssrInterpolate(vendor.isApproved ? "APPROVED" : "PENDING")}</span></td><td class="p-4 text-sm text-slate-600">${ssrInterpolate(new Date(vendor.createdAt).toLocaleDateString())}</td><td class="p-4 text-right"><button class="text-primary-600 hover:text-primary-800 font-medium text-sm border border-primary-200 px-3 py-1 rounded-lg hover:bg-primary-50 transition-colors"> Review </button></td></tr>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div></div>`);
      _push(ssrRenderComponent(FloatingDrawer, {
        modelValue: drawerOpen.value,
        "onUpdate:modelValue": ($event) => drawerOpen.value = $event,
        title: "Vendor Details"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            if (selectedVendor.value) {
              _push2(`<div class="space-y-6"${_scopeId}><div class="flex items-center gap-4 border-b border-slate-100 pb-6"${_scopeId}><div class="w-16 h-16 rounded-2xl bg-primary-50 text-primary-800 flex items-center justify-center text-2xl font-bold uppercase"${_scopeId}>${ssrInterpolate(((_a = selectedVendor.value.businessName) == null ? void 0 : _a.charAt(0)) || ((_b = selectedVendor.value.slug) == null ? void 0 : _b.charAt(0)) || "V")}</div><div${_scopeId}><h4 class="text-lg font-bold text-slate-900"${_scopeId}>${ssrInterpolate(selectedVendor.value.businessName || "Unnamed Vendor")}</h4><p class="text-slate-500 text-sm"${_scopeId}>@${ssrInterpolate(selectedVendor.value.slug || "slug-unavailable")}</p><p class="text-slate-500 text-xs mt-1"${_scopeId}>${ssrInterpolate((_c = selectedVendor.value.userId) == null ? void 0 : _c.email)}</p></div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div class="bg-slate-50 p-4 rounded-xl border border-slate-100"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Status</div><span class="${ssrRenderClass(selectedVendor.value.isApproved ? "badge-active" : "badge-pending")}"${_scopeId}>${ssrInterpolate(selectedVendor.value.isApproved ? "APPROVED" : "PENDING")}</span></div><div class="bg-slate-50 p-4 rounded-xl border border-slate-100"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Joined</div><div class="font-medium text-slate-900"${_scopeId}>${ssrInterpolate(new Date(selectedVendor.value.createdAt).toLocaleDateString())}</div></div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div class="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-center"${_scopeId}><div class="text-xs text-emerald-600 font-bold mb-1 uppercase tracking-wider"${_scopeId}>Total Earnings</div><div class="font-bold text-emerald-900 text-xl"${_scopeId}>\u20A6${ssrInterpolate(((_d = selectedVendor.value.totalEarnings) == null ? void 0 : _d.toLocaleString()) || 0)}</div></div><div class="bg-amber-50 p-4 rounded-xl border border-amber-100 text-center"${_scopeId}><div class="text-xs text-amber-600 font-bold mb-1 uppercase tracking-wider"${_scopeId}>Pending Payout</div><div class="font-bold text-amber-900 text-xl"${_scopeId}>\u20A6${ssrInterpolate(((_e = selectedVendor.value.pendingPayout) == null ? void 0 : _e.toLocaleString()) || 0)}</div></div></div><div class="space-y-4 pt-4 border-t border-slate-100"${_scopeId}><h5 class="text-sm font-bold text-slate-900"${_scopeId}>Business Information</h5><div class="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3"${_scopeId}><div${_scopeId}><span class="font-medium text-slate-900 block mb-1"${_scopeId}>Description</span><p class="text-sm"${_scopeId}>${ssrInterpolate(selectedVendor.value.description || "No description provided")}</p></div>`);
              if (((_f = selectedVendor.value.categories) == null ? void 0 : _f.length) > 0) {
                _push2(`<div class="pt-2"${_scopeId}><span class="font-medium text-slate-900 block mb-2"${_scopeId}>Categories</span><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
                ssrRenderList(selectedVendor.value.categories, (cat) => {
                  _push2(`<span class="text-[10px] uppercase font-bold px-2 py-1 bg-slate-200 text-slate-700 rounded-md"${_scopeId}>${ssrInterpolate(cat)}</span>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (selectedVendor.value.location) {
                _push2(`<div class="pt-2"${_scopeId}><span class="font-medium text-slate-900 block mb-1"${_scopeId}>Location</span><p${_scopeId}>${ssrInterpolate(selectedVendor.value.location.address)}</p><p class="text-xs text-slate-500"${_scopeId}>${ssrInterpolate(selectedVendor.value.location.city)}, ${ssrInterpolate(selectedVendor.value.location.state)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
              if (!selectedVendor.value.isApproved) {
                _push2(`<div class="pt-4 border-t border-slate-100 space-y-3"${_scopeId}><h5 class="text-sm font-bold text-slate-900 mb-4"${_scopeId}>Approval Actions</h5><button${ssrIncludeBooleanAttr(unref(actionLoading)) ? " disabled" : ""} class="w-full btn-primary py-3 flex justify-center items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle), { class: "w-5 h-5" }, null, _parent2, _scopeId));
                if (unref(actionLoading)) {
                  _push2(`<span${_scopeId}>Processing...</span>`);
                } else {
                  _push2(`<span${_scopeId}>Approve Vendor</span>`);
                }
                _push2(`</button><button${ssrIncludeBooleanAttr(unref(actionLoading)) ? " disabled" : ""} class="w-full px-4 py-3 rounded-xl border border-slate-200 text-danger-600 font-medium hover:bg-danger-50 transition-colors flex justify-center items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(XCircle), { class: "w-5 h-5" }, null, _parent2, _scopeId));
                if (unref(actionLoading)) {
                  _push2(`<span${_scopeId}>Processing...</span>`);
                } else {
                  _push2(`<span${_scopeId}>Reject Vendor</span>`);
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
              selectedVendor.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-6"
              }, [
                createVNode("div", { class: "flex items-center gap-4 border-b border-slate-100 pb-6" }, [
                  createVNode("div", { class: "w-16 h-16 rounded-2xl bg-primary-50 text-primary-800 flex items-center justify-center text-2xl font-bold uppercase" }, toDisplayString(((_g = selectedVendor.value.businessName) == null ? void 0 : _g.charAt(0)) || ((_h = selectedVendor.value.slug) == null ? void 0 : _h.charAt(0)) || "V"), 1),
                  createVNode("div", null, [
                    createVNode("h4", { class: "text-lg font-bold text-slate-900" }, toDisplayString(selectedVendor.value.businessName || "Unnamed Vendor"), 1),
                    createVNode("p", { class: "text-slate-500 text-sm" }, "@" + toDisplayString(selectedVendor.value.slug || "slug-unavailable"), 1),
                    createVNode("p", { class: "text-slate-500 text-xs mt-1" }, toDisplayString((_i = selectedVendor.value.userId) == null ? void 0 : _i.email), 1)
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100" }, [
                    createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Status"),
                    createVNode("span", {
                      class: selectedVendor.value.isApproved ? "badge-active" : "badge-pending"
                    }, toDisplayString(selectedVendor.value.isApproved ? "APPROVED" : "PENDING"), 3)
                  ]),
                  createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100" }, [
                    createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Joined"),
                    createVNode("div", { class: "font-medium text-slate-900" }, toDisplayString(new Date(selectedVendor.value.createdAt).toLocaleDateString()), 1)
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode("div", { class: "bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-center" }, [
                    createVNode("div", { class: "text-xs text-emerald-600 font-bold mb-1 uppercase tracking-wider" }, "Total Earnings"),
                    createVNode("div", { class: "font-bold text-emerald-900 text-xl" }, "\u20A6" + toDisplayString(((_j = selectedVendor.value.totalEarnings) == null ? void 0 : _j.toLocaleString()) || 0), 1)
                  ]),
                  createVNode("div", { class: "bg-amber-50 p-4 rounded-xl border border-amber-100 text-center" }, [
                    createVNode("div", { class: "text-xs text-amber-600 font-bold mb-1 uppercase tracking-wider" }, "Pending Payout"),
                    createVNode("div", { class: "font-bold text-amber-900 text-xl" }, "\u20A6" + toDisplayString(((_k = selectedVendor.value.pendingPayout) == null ? void 0 : _k.toLocaleString()) || 0), 1)
                  ])
                ]),
                createVNode("div", { class: "space-y-4 pt-4 border-t border-slate-100" }, [
                  createVNode("h5", { class: "text-sm font-bold text-slate-900" }, "Business Information"),
                  createVNode("div", { class: "text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3" }, [
                    createVNode("div", null, [
                      createVNode("span", { class: "font-medium text-slate-900 block mb-1" }, "Description"),
                      createVNode("p", { class: "text-sm" }, toDisplayString(selectedVendor.value.description || "No description provided"), 1)
                    ]),
                    ((_l = selectedVendor.value.categories) == null ? void 0 : _l.length) > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "pt-2"
                    }, [
                      createVNode("span", { class: "font-medium text-slate-900 block mb-2" }, "Categories"),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(selectedVendor.value.categories, (cat) => {
                          return openBlock(), createBlock("span", {
                            key: cat,
                            class: "text-[10px] uppercase font-bold px-2 py-1 bg-slate-200 text-slate-700 rounded-md"
                          }, toDisplayString(cat), 1);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    selectedVendor.value.location ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "pt-2"
                    }, [
                      createVNode("span", { class: "font-medium text-slate-900 block mb-1" }, "Location"),
                      createVNode("p", null, toDisplayString(selectedVendor.value.location.address), 1),
                      createVNode("p", { class: "text-xs text-slate-500" }, toDisplayString(selectedVendor.value.location.city) + ", " + toDisplayString(selectedVendor.value.location.state), 1)
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                !selectedVendor.value.isApproved ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "pt-4 border-t border-slate-100 space-y-3"
                }, [
                  createVNode("h5", { class: "text-sm font-bold text-slate-900 mb-4" }, "Approval Actions"),
                  createVNode("button", {
                    onClick: handleApprove,
                    disabled: unref(actionLoading),
                    class: "w-full btn-primary py-3 flex justify-center items-center gap-2"
                  }, [
                    createVNode(unref(CheckCircle), { class: "w-5 h-5" }),
                    unref(actionLoading) ? (openBlock(), createBlock("span", { key: 0 }, "Processing...")) : (openBlock(), createBlock("span", { key: 1 }, "Approve Vendor"))
                  ], 8, ["disabled"]),
                  createVNode("button", {
                    onClick: handleReject,
                    disabled: unref(actionLoading),
                    class: "w-full px-4 py-3 rounded-xl border border-slate-200 text-danger-600 font-medium hover:bg-danger-50 transition-colors flex justify-center items-center gap-2"
                  }, [
                    createVNode(unref(XCircle), { class: "w-5 h-5" }),
                    unref(actionLoading) ? (openBlock(), createBlock("span", { key: 0 }, "Processing...")) : (openBlock(), createBlock("span", { key: 1 }, "Reject Vendor"))
                  ], 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/vendors/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-GcDSSb0r.mjs.map
