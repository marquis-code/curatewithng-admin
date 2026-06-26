import { ref, defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrInterpolate } from "vue/server-renderer";
import { Settings, Sparkles, Trash2, Loader2, Save } from "lucide-vue-next";
import { G as GATEWAY_ENDPOINT_WITH_AUTH } from "./axios.config-DHAaROs1.js";
import "/Users/marquis/curatewithng/admin/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-CyTADNBk.js";
import "axios";
import "./user-BM2pELKn.js";
import "./cookie-IdT47JXv.js";
import "/Users/marquis/curatewithng/admin/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/h3/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/destr/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/ohash/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/klona/dist/index.mjs";
import "../server.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/marquis/curatewithng/admin/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "/Users/marquis/curatewithng/admin/node_modules/defu/dist/defu.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/ufo/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/@unhead/vue/dist/index.mjs";
const useSettings = () => {
  const settings = ref(null);
  const loading = ref(false);
  const actionLoading = ref(false);
  const fetchSettings = async () => {
    loading.value = true;
    try {
      const res = await GATEWAY_ENDPOINT_WITH_AUTH.get("/settings");
      settings.value = res.data;
    } catch (err) {
      console.error("Failed to fetch settings", err);
    } finally {
      loading.value = false;
    }
  };
  const updateSettings = async (payload) => {
    actionLoading.value = true;
    try {
      const res = await GATEWAY_ENDPOINT_WITH_AUTH.put("/settings", payload);
      settings.value = res.data;
      return res.data;
    } catch (err) {
      console.error("Failed to update settings", err);
      throw err;
    } finally {
      actionLoading.value = false;
    }
  };
  return {
    settings,
    loading,
    actionLoading,
    fetchSettings,
    updateSettings
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Settings — Admin Portal" });
    const { loading, actionLoading } = useSettings();
    const form = ref({
      platformFeePercentage: 10,
      sourcingFeeTiers: []
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto" }, _attrs))}><div class="mb-8"><h1 class="text-3xl font-heading font-bold text-slate-900 tracking-tight">Platform Settings</h1><p class="text-slate-500 mt-1">Configure global application parameters.</p></div><div class="card overflow-hidden">`);
      if (unref(loading)) {
        _push(`<div class="p-8 text-center text-slate-500">Loading settings...</div>`);
      } else {
        _push(`<div class="p-6 md:p-8 space-y-10"><section><h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(Settings), { class: "w-5 h-5 text-slate-400" }, null, _parent));
        _push(` General Configuration </h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-slate-700 mb-2">Platform Fee (%)</label><input type="number"${ssrRenderAttr("value", form.value.platformFeePercentage)} class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white transition-colors"></div><div><label class="block text-sm font-medium text-slate-700 mb-2">Support Email</label><input type="email" value="hello@curatewithng.com" disabled class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"></div></div></section><section class="pt-6 border-t border-slate-100"><div class="flex justify-between items-center mb-6"><h2 class="text-lg font-semibold text-slate-900 flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(Sparkles), { class: "w-5 h-5 text-slate-400" }, null, _parent));
        _push(` Sourcing Fee Tiers </h2><button class="text-sm font-bold text-primary-600 hover:text-primary-800 transition-colors bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-200"> + Add Tier </button></div><div class="space-y-4"><!--[-->`);
        ssrRenderList(form.value.sourcingFeeTiers, (tier, index) => {
          _push(`<div class="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200"><div class="grid grid-cols-3 gap-4 flex-1"><div><label class="block text-xs font-semibold text-slate-500 mb-1">Min Amount (₦)</label><input type="number"${ssrRenderAttr("value", tier.minAmount)} class="input-field !py-2"></div><div><label class="block text-xs font-semibold text-slate-500 mb-1">Max Amount (₦) <span class="font-normal opacity-50">(optional)</span></label><input type="number"${ssrRenderAttr("value", tier.maxAmount)} class="input-field !py-2"></div><div><label class="block text-xs font-semibold text-slate-500 mb-1">Fee Percentage (%)</label><input type="number"${ssrRenderAttr("value", tier.percentage)} class="input-field !py-2"></div></div><button class="mt-6 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">`);
          _push(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent));
          _push(`</button></div>`);
        });
        _push(`<!--]--><p class="text-xs text-slate-500 mt-2">Tiers are evaluated from top to bottom. Make sure your fallback (e.g. Min 0, Max empty) is at the bottom.</p></div></section><div class="flex justify-end pt-6 border-t border-slate-100"><button${ssrIncludeBooleanAttr(unref(actionLoading)) ? " disabled" : ""} class="px-8 py-3 bg-primary-900 text-white font-medium rounded-xl hover:bg-primary-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">`);
        if (unref(actionLoading)) {
          _push(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 animate-spin" }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(Save), { class: "w-4 h-4" }, null, _parent));
        }
        _push(` ${ssrInterpolate(unref(actionLoading) ? "Saving..." : "Save Configuration")}</button></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-FQeSlV0d.js.map
