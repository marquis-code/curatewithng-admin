import { defineComponent, ref, computed, resolveComponent, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/server-renderer/index.mjs';
import { Search, Image, CheckCircle, Star, Trash2 } from 'file:///Users/marquis/curatewithng/admin/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';
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

const gift_api = {
  getGifts: () => GATEWAY_ENDPOINT_WITH_AUTH.get("/gifts"),
  approve: (id) => GATEWAY_ENDPOINT_WITH_AUTH.post(`/gifts/${id}/approve`),
  feature: (id) => GATEWAY_ENDPOINT_WITH_AUTH.post(`/gifts/${id}/feature`),
  delete: (id) => GATEWAY_ENDPOINT_WITH_AUTH.delete(`/gifts/${id}`)
};
const useFetchGifts = () => {
  const gifts = ref([]);
  const loading = ref(false);
  const actionLoading = ref(false);
  const { showToast } = useCustomToast();
  const fetchGifts = async () => {
    var _a, _b, _c;
    loading.value = true;
    try {
      const response = await gift_api.getGifts();
      const resData = (_a = response.data) == null ? void 0 : _a.data;
      gifts.value = Array.isArray(resData) ? resData : (resData == null ? void 0 : resData.data) || [];
    } catch (error) {
      showToast({ title: "Error", message: ((_c = (_b = error == null ? void 0 : error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) || "Failed to fetch gifts", toastType: "error" });
    } finally {
      loading.value = false;
    }
  };
  const approveGift = async (id) => {
    var _a, _b;
    actionLoading.value = true;
    try {
      await gift_api.approve(id);
      showToast({ title: "Success", message: "Gift approved successfully", toastType: "success" });
      await fetchGifts();
    } catch (error) {
      showToast({ title: "Error", message: ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Failed to approve gift", toastType: "error" });
    } finally {
      actionLoading.value = false;
    }
  };
  const featureGift = async (id) => {
    var _a, _b;
    actionLoading.value = true;
    try {
      await gift_api.feature(id);
      showToast({ title: "Success", message: "Gift featured status updated", toastType: "success" });
      await fetchGifts();
    } catch (error) {
      showToast({ title: "Error", message: ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Failed to update feature status", toastType: "error" });
    } finally {
      actionLoading.value = false;
    }
  };
  const deleteGift = async (id) => {
    var _a, _b;
    actionLoading.value = true;
    try {
      await gift_api.delete(id);
      showToast({ title: "Success", message: "Gift deleted successfully", toastType: "success" });
      await fetchGifts();
    } catch (error) {
      showToast({ title: "Error", message: ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Failed to delete gift", toastType: "error" });
    } finally {
      actionLoading.value = false;
    }
  };
  return { gifts, loading, actionLoading, fetchGifts, approveGift, featureGift, deleteGift };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Gifts \u2014 Admin Portal" });
    const { gifts, loading, actionLoading, approveGift, featureGift, deleteGift } = useFetchGifts();
    const searchQuery = ref("");
    const statusFilter = ref("");
    const drawerOpen = ref(false);
    const selectedGift = ref(null);
    const filteredGifts = computed(() => {
      let result = gifts.value || [];
      if (statusFilter.value) {
        const isLookingForApproved = statusFilter.value === "APPROVED";
        result = result.filter((g) => g.isApproved === isLookingForApproved);
      }
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(
          (g) => {
            var _a;
            return (_a = g.name) == null ? void 0 : _a.toLowerCase().includes(q);
          }
        );
      }
      return result;
    });
    const confirmApprove = ref(false);
    const confirmDelete = ref(false);
    const executeApprove = async () => {
      if (selectedGift.value) {
        await approveGift(selectedGift.value._id);
        selectedGift.value.isApproved = true;
        confirmApprove.value = false;
      }
    };
    const handleFeature = async () => {
      if (selectedGift.value) {
        await featureGift(selectedGift.value._id);
        selectedGift.value.isFeatured = !selectedGift.value.isFeatured;
      }
    };
    const executeDelete = async () => {
      if (selectedGift.value) {
        await deleteGift(selectedGift.value._id);
        confirmDelete.value = false;
        drawerOpen.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CustomSelect = resolveComponent("CustomSelect");
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"><div><h1 class="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-1">Gifts</h1><p class="text-slate-500">Manage platform gift listings</p></div></div><div class="card overflow-hidden"><div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50"><div class="relative w-full max-w-sm"><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Search gifts by name..." class="input-field !py-2 w-full pl-10">`);
      _push(ssrRenderComponent(unref(Search), { class: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }, null, _parent));
      _push(`</div><div class="flex gap-3 w-full sm:w-auto">`);
      _push(ssrRenderComponent(_component_CustomSelect, {
        modelValue: statusFilter.value,
        "onUpdate:modelValue": ($event) => statusFilter.value = $event,
        options: [
          { label: "All Statuses", value: "" },
          { label: "Approved", value: "APPROVED" },
          { label: "Pending", value: "PENDING" },
          { label: "Rejected", value: "REJECTED" }
        ],
        placeholder: "All Statuses",
        class: "w-full sm:w-48"
      }, null, _parent));
      _push(`</div></div><div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-white border-b border-slate-200 text-sm font-semibold text-slate-600"><th class="p-4">Gift Info</th><th class="p-4">Vendor</th><th class="p-4">Price</th><th class="p-4">Status</th><th class="p-4 text-right">Actions</th></tr></thead><tbody>`);
      if (unref(loading)) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<tr class="border-b border-slate-100 bg-white"><td class="p-4"><div class="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div></td><td class="p-4 text-right"><div class="h-8 w-20 bg-slate-200 rounded ml-auto animate-pulse"></div></td></tr>`);
        });
        _push(`<!--]-->`);
      } else if (filteredGifts.value.length === 0) {
        _push(`<tr class="border-b border-slate-100 bg-white"><td colspan="5" class="p-8 text-center text-slate-500">No gifts found</td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(filteredGifts.value, (gift) => {
          var _a, _b;
          _push(`<tr class="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors"><td class="p-4"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">`);
          if (gift.images && gift.images.length > 0) {
            _push(`<img${ssrRenderAttr("src", gift.images[0])} alt="Gift Image" class="w-full h-full object-cover">`);
          } else {
            _push(`<div class="w-full h-full flex items-center justify-center text-slate-400">`);
            _push(ssrRenderComponent(unref(Image), { class: "w-5 h-5" }, null, _parent));
            _push(`</div>`);
          }
          _push(`</div><div><div class="font-medium text-slate-900 line-clamp-1">${ssrInterpolate(gift.name)}</div><div class="text-xs text-slate-500 capitalize">${ssrInterpolate(gift.category || "Uncategorized")} \u2022 ${ssrInterpolate(gift.budgetTier)}</div></div></div></td><td class="p-4 text-sm text-slate-600 font-medium">${ssrInterpolate(((_a = gift.vendorId) == null ? void 0 : _a.businessName) || "Unknown Vendor")}</td><td class="p-4 font-bold text-slate-900">\u20A6${ssrInterpolate(((_b = gift.price) == null ? void 0 : _b.toLocaleString()) || 0)}</td><td class="p-4"><span class="${ssrRenderClass(gift.isApproved ? "badge-active" : "badge-pending")}">${ssrInterpolate(gift.isApproved ? "APPROVED" : "PENDING")}</span>`);
          if (gift.isFeatured) {
            _push(`<span class="badge-active ml-2 !bg-amber-50 !text-amber-800 !border-amber-200">Featured</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</td><td class="p-4 text-right"><button class="text-primary-600 hover:text-primary-800 font-medium text-sm border border-primary-200 px-3 py-1 rounded-lg hover:bg-primary-50 transition-colors"> Review </button></td></tr>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div></div>`);
      _push(ssrRenderComponent(FloatingDrawer, {
        modelValue: drawerOpen.value,
        "onUpdate:modelValue": ($event) => drawerOpen.value = $event,
        title: "Gift Review"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
          if (_push2) {
            if (selectedGift.value) {
              _push2(`<div class="space-y-6"${_scopeId}><div class="w-full h-56 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center relative group"${_scopeId}>`);
              if (selectedGift.value.images && selectedGift.value.images.length > 0) {
                _push2(`<img${ssrRenderAttr("src", selectedGift.value.images[0])} class="w-full h-full object-cover"${_scopeId}>`);
              } else {
                _push2(ssrRenderComponent(unref(Image), { class: "w-12 h-12 text-slate-400" }, null, _parent2, _scopeId));
              }
              if (((_a = selectedGift.value.images) == null ? void 0 : _a.length) > 1) {
                _push2(`<div class="absolute bottom-3 right-3 bg-slate-900/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm"${_scopeId}> +${ssrInterpolate(selectedGift.value.images.length - 1)} more </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><h4 class="text-xl font-bold text-slate-900"${_scopeId}>${ssrInterpolate(selectedGift.value.name)}</h4><p class="text-slate-500 text-sm mt-1 leading-relaxed"${_scopeId}>${ssrInterpolate(selectedGift.value.description || "No description provided")}</p></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div class="bg-slate-50 p-4 rounded-xl border border-slate-100"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Price</div><div class="font-bold text-slate-900 text-lg"${_scopeId}>\u20A6${ssrInterpolate(((_b = selectedGift.value.price) == null ? void 0 : _b.toLocaleString()) || 0)}</div></div><div class="bg-slate-50 p-4 rounded-xl border border-slate-100"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Stock Level</div><div class="${ssrRenderClass([selectedGift.value.stock > 0 ? "text-primary-700" : "text-danger-600", "font-bold text-slate-900 text-lg"])}"${_scopeId}>${ssrInterpolate(selectedGift.value.stock)} Units </div></div></div><div class="space-y-4"${_scopeId}><div${_scopeId}><div class="text-xs text-slate-500 font-bold mb-2 uppercase tracking-wider"${_scopeId}>Classification</div><div class="flex flex-wrap gap-2"${_scopeId}><span class="px-2.5 py-1 bg-primary-50 text-primary-700 border border-primary-100 rounded-full text-xs font-semibold uppercase"${_scopeId}>${ssrInterpolate(selectedGift.value.category)}</span><span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-semibold uppercase"${_scopeId}>${ssrInterpolate(selectedGift.value.budgetTier)} TIER</span></div></div>`);
              if ((_c = selectedGift.value.occasions) == null ? void 0 : _c.length) {
                _push2(`<div${_scopeId}><div class="text-xs text-slate-500 font-bold mb-2 uppercase tracking-wider"${_scopeId}>Occasions</div><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
                ssrRenderList(selectedGift.value.occasions, (occ) => {
                  _push2(`<span class="px-2.5 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-full text-xs font-medium capitalize"${_scopeId}>${ssrInterpolate(occ.replace("-", " "))}</span>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if ((_d = selectedGift.value.recipientTypes) == null ? void 0 : _d.length) {
                _push2(`<div${_scopeId}><div class="text-xs text-slate-500 font-bold mb-2 uppercase tracking-wider"${_scopeId}>Recipients</div><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
                ssrRenderList(selectedGift.value.recipientTypes, (rec) => {
                  _push2(`<span class="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-xs font-medium capitalize"${_scopeId}>${ssrInterpolate(rec)}</span>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="bg-slate-50 p-4 rounded-xl border border-slate-100"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-2 uppercase tracking-wider"${_scopeId}>Vendor Information</div><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600"${_scopeId}>${ssrInterpolate(((_f = (_e = selectedGift.value.vendorId) == null ? void 0 : _e.businessName) == null ? void 0 : _f.charAt(0)) || "V")}</div><div${_scopeId}><div class="font-bold text-slate-900"${_scopeId}>${ssrInterpolate(((_g = selectedGift.value.vendorId) == null ? void 0 : _g.businessName) || "Unknown Vendor")}</div><div class="text-xs text-slate-500"${_scopeId}>@${ssrInterpolate(((_h = selectedGift.value.vendorId) == null ? void 0 : _h.slug) || "slug-unavailable")}</div></div></div></div><div class="pt-4 border-t border-slate-100 space-y-3"${_scopeId}><h5 class="text-sm font-bold text-slate-900 mb-4"${_scopeId}>Gift Actions</h5>`);
              if (!selectedGift.value.isApproved) {
                _push2(`<button${ssrIncludeBooleanAttr(unref(actionLoading)) ? " disabled" : ""} class="w-full btn-primary py-3 flex justify-center items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle), { class: "w-5 h-5" }, null, _parent2, _scopeId));
                if (unref(actionLoading)) {
                  _push2(`<span${_scopeId}>Processing...</span>`);
                } else {
                  _push2(`<span${_scopeId}>Approve Gift</span>`);
                }
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button${ssrIncludeBooleanAttr(unref(actionLoading)) ? " disabled" : ""} class="w-full px-4 py-3 rounded-xl border border-amber-200 text-amber-700 bg-amber-50 font-medium hover:bg-amber-100 transition-colors flex justify-center items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Star), { class: "w-5 h-5" }, null, _parent2, _scopeId));
              if (unref(actionLoading)) {
                _push2(`<span${_scopeId}>Processing...</span>`);
              } else {
                _push2(`<span${_scopeId}>${ssrInterpolate(selectedGift.value.isFeatured ? "Remove Feature" : "Feature Gift")}</span>`);
              }
              _push2(`</button><button${ssrIncludeBooleanAttr(unref(actionLoading)) ? " disabled" : ""} class="w-full px-4 py-3 rounded-xl border border-slate-200 text-danger-600 font-medium hover:bg-danger-50 transition-colors flex justify-center items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "w-5 h-5" }, null, _parent2, _scopeId));
              if (unref(actionLoading)) {
                _push2(`<span${_scopeId}>Processing...</span>`);
              } else {
                _push2(`<span${_scopeId}>Delete Gift</span>`);
              }
              _push2(`</button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              selectedGift.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-6"
              }, [
                createVNode("div", { class: "w-full h-56 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center relative group" }, [
                  selectedGift.value.images && selectedGift.value.images.length > 0 ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: selectedGift.value.images[0],
                    class: "w-full h-full object-cover"
                  }, null, 8, ["src"])) : (openBlock(), createBlock(unref(Image), {
                    key: 1,
                    class: "w-12 h-12 text-slate-400"
                  })),
                  ((_i = selectedGift.value.images) == null ? void 0 : _i.length) > 1 ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "absolute bottom-3 right-3 bg-slate-900/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm"
                  }, " +" + toDisplayString(selectedGift.value.images.length - 1) + " more ", 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", null, [
                  createVNode("h4", { class: "text-xl font-bold text-slate-900" }, toDisplayString(selectedGift.value.name), 1),
                  createVNode("p", { class: "text-slate-500 text-sm mt-1 leading-relaxed" }, toDisplayString(selectedGift.value.description || "No description provided"), 1)
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100" }, [
                    createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Price"),
                    createVNode("div", { class: "font-bold text-slate-900 text-lg" }, "\u20A6" + toDisplayString(((_j = selectedGift.value.price) == null ? void 0 : _j.toLocaleString()) || 0), 1)
                  ]),
                  createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100" }, [
                    createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Stock Level"),
                    createVNode("div", {
                      class: ["font-bold text-slate-900 text-lg", selectedGift.value.stock > 0 ? "text-primary-700" : "text-danger-600"]
                    }, toDisplayString(selectedGift.value.stock) + " Units ", 3)
                  ])
                ]),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", null, [
                    createVNode("div", { class: "text-xs text-slate-500 font-bold mb-2 uppercase tracking-wider" }, "Classification"),
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      createVNode("span", { class: "px-2.5 py-1 bg-primary-50 text-primary-700 border border-primary-100 rounded-full text-xs font-semibold uppercase" }, toDisplayString(selectedGift.value.category), 1),
                      createVNode("span", { class: "px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-semibold uppercase" }, toDisplayString(selectedGift.value.budgetTier) + " TIER", 1)
                    ])
                  ]),
                  ((_k = selectedGift.value.occasions) == null ? void 0 : _k.length) ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("div", { class: "text-xs text-slate-500 font-bold mb-2 uppercase tracking-wider" }, "Occasions"),
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(selectedGift.value.occasions, (occ) => {
                        return openBlock(), createBlock("span", {
                          key: occ,
                          class: "px-2.5 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-full text-xs font-medium capitalize"
                        }, toDisplayString(occ.replace("-", " ")), 1);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true),
                  ((_l = selectedGift.value.recipientTypes) == null ? void 0 : _l.length) ? (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("div", { class: "text-xs text-slate-500 font-bold mb-2 uppercase tracking-wider" }, "Recipients"),
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(selectedGift.value.recipientTypes, (rec) => {
                        return openBlock(), createBlock("span", {
                          key: rec,
                          class: "px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-xs font-medium capitalize"
                        }, toDisplayString(rec), 1);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100" }, [
                  createVNode("div", { class: "text-xs text-slate-400 font-medium mb-2 uppercase tracking-wider" }, "Vendor Information"),
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("div", { class: "w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600" }, toDisplayString(((_n = (_m = selectedGift.value.vendorId) == null ? void 0 : _m.businessName) == null ? void 0 : _n.charAt(0)) || "V"), 1),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-bold text-slate-900" }, toDisplayString(((_o = selectedGift.value.vendorId) == null ? void 0 : _o.businessName) || "Unknown Vendor"), 1),
                      createVNode("div", { class: "text-xs text-slate-500" }, "@" + toDisplayString(((_p = selectedGift.value.vendorId) == null ? void 0 : _p.slug) || "slug-unavailable"), 1)
                    ])
                  ])
                ]),
                createVNode("div", { class: "pt-4 border-t border-slate-100 space-y-3" }, [
                  createVNode("h5", { class: "text-sm font-bold text-slate-900 mb-4" }, "Gift Actions"),
                  !selectedGift.value.isApproved ? (openBlock(), createBlock("button", {
                    key: 0,
                    onClick: ($event) => confirmApprove.value = true,
                    disabled: unref(actionLoading),
                    class: "w-full btn-primary py-3 flex justify-center items-center gap-2"
                  }, [
                    createVNode(unref(CheckCircle), { class: "w-5 h-5" }),
                    unref(actionLoading) ? (openBlock(), createBlock("span", { key: 0 }, "Processing...")) : (openBlock(), createBlock("span", { key: 1 }, "Approve Gift"))
                  ], 8, ["onClick", "disabled"])) : createCommentVNode("", true),
                  createVNode("button", {
                    onClick: handleFeature,
                    disabled: unref(actionLoading),
                    class: "w-full px-4 py-3 rounded-xl border border-amber-200 text-amber-700 bg-amber-50 font-medium hover:bg-amber-100 transition-colors flex justify-center items-center gap-2"
                  }, [
                    createVNode(unref(Star), { class: "w-5 h-5" }),
                    unref(actionLoading) ? (openBlock(), createBlock("span", { key: 0 }, "Processing...")) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(selectedGift.value.isFeatured ? "Remove Feature" : "Feature Gift"), 1))
                  ], 8, ["disabled"]),
                  createVNode("button", {
                    onClick: ($event) => confirmDelete.value = true,
                    disabled: unref(actionLoading),
                    class: "w-full px-4 py-3 rounded-xl border border-slate-200 text-danger-600 font-medium hover:bg-danger-50 transition-colors flex justify-center items-center gap-2"
                  }, [
                    createVNode(unref(Trash2), { class: "w-5 h-5" }),
                    unref(actionLoading) ? (openBlock(), createBlock("span", { key: 0 }, "Processing...")) : (openBlock(), createBlock("span", { key: 1 }, "Delete Gift"))
                  ], 8, ["onClick", "disabled"])
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        isOpen: confirmApprove.value,
        title: "Approve Gift",
        message: "Are you sure you want to approve this gift? It will become visible and available for purchase.",
        confirmText: "Approve",
        type: "info",
        loading: unref(actionLoading),
        onConfirm: executeApprove,
        onCancel: ($event) => confirmApprove.value = false
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        isOpen: confirmDelete.value,
        title: "Delete Gift",
        message: "Are you sure you want to completely delete this gift? This action cannot be undone.",
        confirmText: "Delete",
        type: "danger",
        loading: unref(actionLoading),
        onConfirm: executeDelete,
        onCancel: ($event) => confirmDelete.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/gifts/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-8YGtIsfr.mjs.map
