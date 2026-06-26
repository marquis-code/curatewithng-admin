import { defineComponent, ref, computed, resolveComponent, unref, withCtx, openBlock, createBlock, createVNode, createCommentVNode, toDisplayString, createTextVNode, Fragment, renderList, withDirectives, vModelText, useSSRContext } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/server-renderer/index.mjs';
import { Search } from 'file:///Users/marquis/curatewithng/admin/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';
import { F as FloatingDrawer } from './FloatingDrawer-CcGngjEx.mjs';
import { G as GATEWAY_ENDPOINT_WITH_AUTH } from './axios.config-DHAaROs1.mjs';
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

const useFetchSourcingRequests = () => {
  const requests = ref([]);
  const trending = ref([]);
  const loading = ref(false);
  const actionLoading = ref(false);
  const total = ref(0);
  const fetchRequests = async (page = 1, limit = 50) => {
    var _a, _b;
    loading.value = true;
    try {
      const res = await GATEWAY_ENDPOINT_WITH_AUTH.get(`/sourcing-requests?page=${page}&limit=${limit}`);
      requests.value = ((_a = res.data) == null ? void 0 : _a.data) || res.data || [];
      total.value = ((_b = res.data) == null ? void 0 : _b.total) || 0;
    } catch (err) {
      console.error("Failed to fetch sourcing requests", err);
    } finally {
      loading.value = false;
    }
  };
  const fetchTrending = async () => {
    try {
      const res = await GATEWAY_ENDPOINT_WITH_AUTH.get("/sourcing-requests/trending");
      trending.value = res.data || [];
    } catch (err) {
      console.error("Failed to fetch trending ideas", err);
    }
  };
  const updateRequest = async (id, payload) => {
    actionLoading.value = true;
    try {
      const res = await GATEWAY_ENDPOINT_WITH_AUTH.patch(`/sourcing-requests/${id}`, payload);
      const idx = requests.value.findIndex((r) => r._id === id);
      if (idx !== -1) {
        requests.value[idx] = res.data;
      }
      return res.data;
    } catch (err) {
      console.error("Failed to update sourcing request", err);
      throw err;
    } finally {
      actionLoading.value = false;
    }
  };
  const setQuote = async (id, amount) => {
    actionLoading.value = true;
    try {
      const res = await GATEWAY_ENDPOINT_WITH_AUTH.post(`/sourcing-requests/${id}/quote`, { amount });
      const idx = requests.value.findIndex((r) => r._id === id);
      if (idx !== -1) {
        requests.value[idx] = res.data;
      }
      return res.data;
    } catch (err) {
      console.error("Failed to set quote", err);
      throw err;
    } finally {
      actionLoading.value = false;
    }
  };
  return {
    requests,
    trending,
    loading,
    actionLoading,
    total,
    fetchRequests,
    fetchTrending,
    updateRequest,
    setQuote
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Sourcing Requests \u2014 Admin Portal" });
    const { requests, trending, loading, actionLoading, updateRequest, setQuote } = useFetchSourcingRequests();
    const searchQuery = ref("");
    const statusFilter = ref("");
    const drawerOpen = ref(false);
    const selectedRequest = ref(null);
    const inputQuoteAmount = ref("");
    const conciergeNote = ref("");
    const filteredRequests = computed(() => {
      let result = requests.value;
      if (statusFilter.value) {
        result = result.filter((r) => r.status === statusFilter.value);
      }
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(
          (r) => {
            var _a, _b;
            return ((_a = r.giftIdea) == null ? void 0 : _a.toLowerCase().includes(q)) || ((_b = r.contactName) == null ? void 0 : _b.toLowerCase().includes(q));
          }
        );
      }
      return result;
    });
    const getStatusBadge = (status) => {
      switch (status) {
        case "PENDING":
          return "badge-pending";
        case "QUOTED":
          return "bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold";
        case "PAYMENT_RECEIVED":
          return "badge-active";
        // green
        case "SOURCING":
          return "bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full text-xs font-bold";
        case "FULFILLED":
          return "bg-slate-800 text-white px-2.5 py-0.5 rounded-full text-xs font-bold";
        case "CANCELLED":
          return "badge-neutral";
        default:
          return "badge-neutral";
      }
    };
    const handleSetQuote = async () => {
      if (!selectedRequest.value || !inputQuoteAmount.value) return;
      if (conciergeNote.value) {
        await updateRequest(selectedRequest.value._id, { conciergeNote: conciergeNote.value });
      }
      const updated = await setQuote(selectedRequest.value._id, Number(inputQuoteAmount.value));
      selectedRequest.value = updated;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CustomSelect = resolveComponent("CustomSelect");
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"><div><h1 class="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-1">Sourcing Requests</h1><p class="text-slate-500">Manage bespoke gift requests and send quotes</p></div></div>`);
      if (unref(trending).length > 0) {
        _push(`<div class="mb-8"><h3 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><span class="text-xl">\u{1F525}</span> Trending Ideas </h3><div class="flex gap-4 overflow-x-auto pb-4"><!--[-->`);
        ssrRenderList(unref(trending), (idea) => {
          _push(`<div class="card min-w-[250px] p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-orange-100 flex-shrink-0 relative">`);
          if (idea.isTrending) {
            _push(`<div class="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">TRENDING</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex justify-between items-start mb-2"><h4 class="font-bold text-slate-900 line-clamp-2"${ssrRenderAttr("title", idea.giftIdea)}>${ssrInterpolate(idea.giftIdea)}</h4><div class="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md text-xs font-bold">${ssrInterpolate(idea.requestCount)} requests</div></div><div class="text-xs text-slate-500">Last requested: ${ssrInterpolate(new Date(idea.latestRequestAt).toLocaleDateString())}</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="card overflow-hidden"><div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50"><div class="relative w-full max-w-sm"><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Search by idea or contact name..." class="input-field !py-2 w-full pl-10">`);
      _push(ssrRenderComponent(unref(Search), { class: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CustomSelect, {
        modelValue: statusFilter.value,
        "onUpdate:modelValue": ($event) => statusFilter.value = $event,
        options: [
          { label: "All Statuses", value: "" },
          { label: "Pending", value: "PENDING" },
          { label: "Quoted", value: "QUOTED" },
          { label: "Payment Received", value: "PAYMENT_RECEIVED" },
          { label: "Sourcing", value: "SOURCING" },
          { label: "Fulfilled", value: "FULFILLED" },
          { label: "Cancelled", value: "CANCELLED" }
        ],
        placeholder: "All Statuses",
        class: "w-full sm:w-48"
      }, null, _parent));
      _push(`</div><div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-white border-b border-slate-200 text-sm font-semibold text-slate-600"><th class="p-4">Gift Idea</th><th class="p-4">Contact</th><th class="p-4">Ideal Budget</th><th class="p-4">Status</th><th class="p-4">Date</th><th class="p-4 text-right">Actions</th></tr></thead><tbody>`);
      if (unref(loading)) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<tr class="border-b border-slate-100 bg-white"><td class="p-4"><div class="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div></td><td class="p-4 text-right"><div class="h-8 w-20 bg-slate-200 rounded ml-auto animate-pulse"></div></td></tr>`);
        });
        _push(`<!--]-->`);
      } else if (filteredRequests.value.length === 0) {
        _push(`<tr class="border-b border-slate-100 bg-white"><td colspan="6" class="p-8 text-center text-slate-500">No sourcing requests found</td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(filteredRequests.value, (req) => {
          var _a, _b, _c, _d;
          _push(`<tr class="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors"><td class="p-4"><div class="font-medium text-slate-900 flex items-center gap-2">${ssrInterpolate(req.giftIdea)} `);
          if (req.requestCount > 1) {
            _push(`<span class="bg-primary-50 border border-primary-200 text-primary-700 text-[10px] px-1.5 py-0.5 rounded font-bold">${ssrInterpolate(req.requestCount)} requests</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="text-xs text-slate-500 capitalize">${ssrInterpolate(req.occasion || "Unspecified")} \u2022 ${ssrInterpolate(req.timeline)}</div></td><td class="p-4"><div class="text-sm font-medium text-slate-700">${ssrInterpolate(req.contactName)}</div><div class="text-xs text-slate-500">${ssrInterpolate(req.contactEmail)}</div></td><td class="p-4 text-sm font-medium text-slate-700">`);
          if ((_a = req.budgetSignal) == null ? void 0 : _a.ideal) {
            _push(`<span>\u20A6${ssrInterpolate(req.budgetSignal.ideal.toLocaleString())}</span>`);
          } else {
            _push(`<span>N/A</span>`);
          }
          _push(`<div class="flex items-center gap-2 mt-0.5"><span class="text-xs text-slate-400 font-normal capitalize">${ssrInterpolate((_d = (_c = (_b = req.budgetSignal) == null ? void 0 : _b.flexibility) == null ? void 0 : _c.replace("_", " ")) == null ? void 0 : _d.toLowerCase())}</span>`);
          if (req.isAboveUserBudget) {
            _push(`<span class="text-[9px] bg-amber-50 text-amber-600 px-1 py-0.5 rounded border border-amber-200 font-bold" title="Above user&#39;s stored budget">ABOVE</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></td><td class="p-4"><span class="${ssrRenderClass(getStatusBadge(req.status))}">${ssrInterpolate(req.status)}</span></td><td class="p-4 text-sm text-slate-600">${ssrInterpolate(new Date(req.createdAt).toLocaleDateString())}</td><td class="p-4 text-right"><button class="text-primary-600 hover:text-primary-800 font-medium text-sm border border-primary-200 px-3 py-1 rounded-lg hover:bg-primary-50 transition-colors"> Review </button></td></tr>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div></div>`);
      _push(ssrRenderComponent(FloatingDrawer, {
        modelValue: drawerOpen.value,
        "onUpdate:modelValue": ($event) => drawerOpen.value = $event,
        title: "Sourcing Request Details"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H;
          if (_push2) {
            if (selectedRequest.value) {
              _push2(`<div class="space-y-6"${_scopeId}><div class="bg-slate-50 p-4 rounded-xl border border-slate-100 relative"${_scopeId}>`);
              if (selectedRequest.value.isTrending) {
                _push2(`<div class="absolute top-4 right-4 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm"${_scopeId}>TRENDING</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Gift Idea</div><div class="font-bold text-lg text-slate-900 mb-2"${_scopeId}>${ssrInterpolate(selectedRequest.value.giftIdea)}</div><span class="${ssrRenderClass(getStatusBadge(selectedRequest.value.status))}"${_scopeId}>${ssrInterpolate(selectedRequest.value.status)}</span></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}><div class="bg-slate-50 p-4 rounded-xl border border-slate-100"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Recipient Profile</div><div class="font-bold text-slate-900 capitalize"${_scopeId}>${ssrInterpolate(((_a = selectedRequest.value.recipientProfile) == null ? void 0 : _a.relationship) || "Unknown")} `);
              if ((_b = selectedRequest.value.recipientProfile) == null ? void 0 : _b.age) {
                _push2(`<span class="text-slate-500 font-normal ml-1"${_scopeId}>(${ssrInterpolate((_c = selectedRequest.value.recipientProfile) == null ? void 0 : _c.age)}, ${ssrInterpolate((_d = selectedRequest.value.recipientProfile) == null ? void 0 : _d.gender)})</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if ((_f = (_e = selectedRequest.value.recipientProfile) == null ? void 0 : _e.interests) == null ? void 0 : _f.length) {
                _push2(`<div class="flex flex-wrap gap-1 mt-2"${_scopeId}><!--[-->`);
                ssrRenderList(selectedRequest.value.recipientProfile.interests, (int) => {
                  _push2(`<span class="bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] font-medium text-slate-600"${_scopeId}>${ssrInterpolate(int)}</span>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="space-y-4"${_scopeId}><div class="bg-slate-50 p-4 rounded-xl border border-slate-100"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Ideal Budget</div>`);
              if ((_g = selectedRequest.value.budgetSignal) == null ? void 0 : _g.ideal) {
                _push2(`<div class="font-bold text-slate-900"${_scopeId}>\u20A6${ssrInterpolate(selectedRequest.value.budgetSignal.ideal.toLocaleString())}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="text-xs text-slate-500 mt-1 capitalize"${_scopeId}>${ssrInterpolate((_j = (_i = (_h = selectedRequest.value.budgetSignal) == null ? void 0 : _h.flexibility) == null ? void 0 : _i.replace("_", " ")) == null ? void 0 : _j.toLowerCase())}</div>`);
              if (selectedRequest.value.isAboveUserBudget) {
                _push2(`<div class="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded mt-2 inline-block"${_scopeId}>ABOVE BUDGET</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div><div class="bg-slate-50 p-4 rounded-xl border border-slate-100"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Timeline &amp; Occasion</div><div class="font-bold text-slate-900 capitalize"${_scopeId}>${ssrInterpolate(selectedRequest.value.occasion || "Unspecified")} <span class="text-slate-500 font-normal ml-2"${_scopeId}>(${ssrInterpolate(selectedRequest.value.timeline)})</span></div></div><div${_scopeId}><h5 class="text-sm font-bold text-slate-900 mb-2"${_scopeId}>Contact Details</h5><div class="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2"${_scopeId}><div${_scopeId}><span class="font-medium text-slate-900"${_scopeId}>Name:</span> ${ssrInterpolate(selectedRequest.value.contactName)}</div><div${_scopeId}><span class="font-medium text-slate-900"${_scopeId}>Email:</span> ${ssrInterpolate(selectedRequest.value.contactEmail)}</div><div${_scopeId}><span class="font-medium text-slate-900"${_scopeId}>Phone:</span> ${ssrInterpolate(selectedRequest.value.contactPhone)}</div>`);
              if (selectedRequest.value.additionalNotes) {
                _push2(`<div class="pt-3 mt-3 border-t border-slate-200 text-slate-700 italic"${_scopeId}> &quot;${ssrInterpolate(selectedRequest.value.additionalNotes)}&quot; </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="border-t border-slate-200 pt-6"${_scopeId}><h5 class="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"${_scopeId}><span class="w-2 h-2 rounded-full bg-primary-500"${_scopeId}></span> Send Quote to User </h5>`);
              if (selectedRequest.value.status === "PENDING") {
                _push2(`<div class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-xs font-semibold text-slate-700 mb-1"${_scopeId}>Cost of Gift (\u20A6)</label><input type="number"${ssrRenderAttr("value", inputQuoteAmount.value)} class="input-field" placeholder="e.g. 75000"${_scopeId}></div><div${_scopeId}><label class="block text-xs font-semibold text-slate-700 mb-1"${_scopeId}>Concierge Note (Internal)</label><textarea rows="2" class="input-field" placeholder="Found a vendor in Lekki..."${_scopeId}>${ssrInterpolate(conciergeNote.value)}</textarea></div><button${ssrIncludeBooleanAttr(unref(actionLoading) || !inputQuoteAmount.value) ? " disabled" : ""} class="btn-primary w-full py-3"${_scopeId}>${ssrInterpolate(unref(actionLoading) ? "Processing..." : "Calculate Fee & Send Quote")}</button><p class="text-xs text-slate-500 text-center"${_scopeId}>This will calculate the tiered sourcing fee and trigger an email to the user.</p></div>`);
              } else {
                _push2(`<div class="bg-primary-50 p-4 rounded-xl border border-primary-100"${_scopeId}><div class="flex justify-between items-center mb-2"${_scopeId}><span class="text-sm text-primary-800 font-medium"${_scopeId}>Cost of Gift:</span><span class="font-bold text-primary-900"${_scopeId}>\u20A6${ssrInterpolate(((_l = (_k = selectedRequest.value.quote) == null ? void 0 : _k.amount) == null ? void 0 : _l.toLocaleString()) || 0)}</span></div><div class="flex justify-between items-center mb-3"${_scopeId}><span class="text-sm text-primary-800 font-medium"${_scopeId}>Sourcing Fee:</span><span class="font-bold text-primary-900"${_scopeId}>\u20A6${ssrInterpolate(((_n = (_m = selectedRequest.value.quote) == null ? void 0 : _m.sourcingFee) == null ? void 0 : _n.toLocaleString()) || 0)}</span></div><div class="flex justify-between items-center pt-3 border-t border-primary-200"${_scopeId}><span class="text-sm font-bold text-primary-900"${_scopeId}>Total Quote:</span><span class="text-xl font-black text-primary-900"${_scopeId}>\u20A6${ssrInterpolate(((_p = (_o = selectedRequest.value.quote) == null ? void 0 : _o.total) == null ? void 0 : _p.toLocaleString()) || 0)}</span></div><div class="mt-4 text-xs text-center text-primary-700"${_scopeId}> Sent at: ${ssrInterpolate(new Date((_q = selectedRequest.value.quote) == null ? void 0 : _q.sentAt).toLocaleString())}</div></div>`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              selectedRequest.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-6"
              }, [
                createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100 relative" }, [
                  selectedRequest.value.isTrending ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "absolute top-4 right-4 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm"
                  }, "TRENDING")) : createCommentVNode("", true),
                  createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Gift Idea"),
                  createVNode("div", { class: "font-bold text-lg text-slate-900 mb-2" }, toDisplayString(selectedRequest.value.giftIdea), 1),
                  createVNode("span", {
                    class: getStatusBadge(selectedRequest.value.status)
                  }, toDisplayString(selectedRequest.value.status), 3)
                ]),
                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                  createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100" }, [
                    createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Recipient Profile"),
                    createVNode("div", { class: "font-bold text-slate-900 capitalize" }, [
                      createTextVNode(toDisplayString(((_r = selectedRequest.value.recipientProfile) == null ? void 0 : _r.relationship) || "Unknown") + " ", 1),
                      ((_s = selectedRequest.value.recipientProfile) == null ? void 0 : _s.age) ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "text-slate-500 font-normal ml-1"
                      }, "(" + toDisplayString((_t = selectedRequest.value.recipientProfile) == null ? void 0 : _t.age) + ", " + toDisplayString((_u = selectedRequest.value.recipientProfile) == null ? void 0 : _u.gender) + ")", 1)) : createCommentVNode("", true)
                    ]),
                    ((_w = (_v = selectedRequest.value.recipientProfile) == null ? void 0 : _v.interests) == null ? void 0 : _w.length) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-wrap gap-1 mt-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(selectedRequest.value.recipientProfile.interests, (int) => {
                        return openBlock(), createBlock("span", {
                          key: int,
                          class: "bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] font-medium text-slate-600"
                        }, toDisplayString(int), 1);
                      }), 128))
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100" }, [
                      createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Ideal Budget"),
                      ((_x = selectedRequest.value.budgetSignal) == null ? void 0 : _x.ideal) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "font-bold text-slate-900"
                      }, "\u20A6" + toDisplayString(selectedRequest.value.budgetSignal.ideal.toLocaleString()), 1)) : createCommentVNode("", true),
                      createVNode("div", { class: "text-xs text-slate-500 mt-1 capitalize" }, toDisplayString((_A = (_z = (_y = selectedRequest.value.budgetSignal) == null ? void 0 : _y.flexibility) == null ? void 0 : _z.replace("_", " ")) == null ? void 0 : _A.toLowerCase()), 1),
                      selectedRequest.value.isAboveUserBudget ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded mt-2 inline-block"
                      }, "ABOVE BUDGET")) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100" }, [
                  createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Timeline & Occasion"),
                  createVNode("div", { class: "font-bold text-slate-900 capitalize" }, [
                    createTextVNode(toDisplayString(selectedRequest.value.occasion || "Unspecified") + " ", 1),
                    createVNode("span", { class: "text-slate-500 font-normal ml-2" }, "(" + toDisplayString(selectedRequest.value.timeline) + ")", 1)
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("h5", { class: "text-sm font-bold text-slate-900 mb-2" }, "Contact Details"),
                  createVNode("div", { class: "text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2" }, [
                    createVNode("div", null, [
                      createVNode("span", { class: "font-medium text-slate-900" }, "Name:"),
                      createTextVNode(" " + toDisplayString(selectedRequest.value.contactName), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "font-medium text-slate-900" }, "Email:"),
                      createTextVNode(" " + toDisplayString(selectedRequest.value.contactEmail), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "font-medium text-slate-900" }, "Phone:"),
                      createTextVNode(" " + toDisplayString(selectedRequest.value.contactPhone), 1)
                    ]),
                    selectedRequest.value.additionalNotes ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "pt-3 mt-3 border-t border-slate-200 text-slate-700 italic"
                    }, ' "' + toDisplayString(selectedRequest.value.additionalNotes) + '" ', 1)) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", { class: "border-t border-slate-200 pt-6" }, [
                  createVNode("h5", { class: "text-sm font-bold text-slate-900 mb-4 flex items-center gap-2" }, [
                    createVNode("span", { class: "w-2 h-2 rounded-full bg-primary-500" }),
                    createTextVNode(" Send Quote to User ")
                  ]),
                  selectedRequest.value.status === "PENDING" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-semibold text-slate-700 mb-1" }, "Cost of Gift (\u20A6)"),
                      withDirectives(createVNode("input", {
                        type: "number",
                        "onUpdate:modelValue": ($event) => inputQuoteAmount.value = $event,
                        class: "input-field",
                        placeholder: "e.g. 75000"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, inputQuoteAmount.value]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-semibold text-slate-700 mb-1" }, "Concierge Note (Internal)"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => conciergeNote.value = $event,
                        rows: "2",
                        class: "input-field",
                        placeholder: "Found a vendor in Lekki..."
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, conciergeNote.value]
                      ])
                    ]),
                    createVNode("button", {
                      onClick: handleSetQuote,
                      disabled: unref(actionLoading) || !inputQuoteAmount.value,
                      class: "btn-primary w-full py-3"
                    }, toDisplayString(unref(actionLoading) ? "Processing..." : "Calculate Fee & Send Quote"), 9, ["disabled"]),
                    createVNode("p", { class: "text-xs text-slate-500 text-center" }, "This will calculate the tiered sourcing fee and trigger an email to the user.")
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "bg-primary-50 p-4 rounded-xl border border-primary-100"
                  }, [
                    createVNode("div", { class: "flex justify-between items-center mb-2" }, [
                      createVNode("span", { class: "text-sm text-primary-800 font-medium" }, "Cost of Gift:"),
                      createVNode("span", { class: "font-bold text-primary-900" }, "\u20A6" + toDisplayString(((_C = (_B = selectedRequest.value.quote) == null ? void 0 : _B.amount) == null ? void 0 : _C.toLocaleString()) || 0), 1)
                    ]),
                    createVNode("div", { class: "flex justify-between items-center mb-3" }, [
                      createVNode("span", { class: "text-sm text-primary-800 font-medium" }, "Sourcing Fee:"),
                      createVNode("span", { class: "font-bold text-primary-900" }, "\u20A6" + toDisplayString(((_E = (_D = selectedRequest.value.quote) == null ? void 0 : _D.sourcingFee) == null ? void 0 : _E.toLocaleString()) || 0), 1)
                    ]),
                    createVNode("div", { class: "flex justify-between items-center pt-3 border-t border-primary-200" }, [
                      createVNode("span", { class: "text-sm font-bold text-primary-900" }, "Total Quote:"),
                      createVNode("span", { class: "text-xl font-black text-primary-900" }, "\u20A6" + toDisplayString(((_G = (_F = selectedRequest.value.quote) == null ? void 0 : _F.total) == null ? void 0 : _G.toLocaleString()) || 0), 1)
                    ]),
                    createVNode("div", { class: "mt-4 text-xs text-center text-primary-700" }, " Sent at: " + toDisplayString(new Date((_H = selectedRequest.value.quote) == null ? void 0 : _H.sentAt).toLocaleString()), 1)
                  ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sourcing-requests/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DFBwl-lA.mjs.map
