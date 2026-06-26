import { defineComponent, mergeProps, unref, useSSRContext } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderSlot } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/server-renderer/index.mjs';
import { X } from 'file:///Users/marquis/curatewithng/admin/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FloatingDrawer",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    title: {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.modelValue) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex justify-end transition-opacity" }, _attrs))} data-v-2e6edde6><div class="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" data-v-2e6edde6></div><div class="relative w-full max-w-lg m-4 bg-white rounded-[2rem] border border-slate-200 overflow-hidden flex flex-col animate-slide-in-right" data-v-2e6edde6><div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50" data-v-2e6edde6><h3 class="text-xl font-heading font-bold text-slate-900" data-v-2e6edde6>${ssrInterpolate(__props.title)}</h3><button class="text-slate-400 hover:text-slate-900 transition-colors bg-white w-8 h-8 rounded-full flex items-center justify-center border border-slate-200" data-v-2e6edde6>`);
        _push(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent));
        _push(`</button></div><div class="flex-1 overflow-y-auto p-6" data-v-2e6edde6>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
        if (_ctx.$slots.footer) {
          _push(`<div class="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3" data-v-2e6edde6>`);
          ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/FloatingDrawer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FloatingDrawer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2e6edde6"]]);

export { FloatingDrawer as F };
//# sourceMappingURL=FloatingDrawer-CcGngjEx.mjs.map
