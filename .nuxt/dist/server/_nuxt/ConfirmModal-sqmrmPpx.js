import { defineComponent, mergeProps, unref, useSSRContext, withCtx, createVNode, openBlock, createBlock, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderSlot, ssrIncludeBooleanAttr, ssrRenderClass } from "vue/server-renderer";
import { X, AlertTriangle, AlertCircle, Info, Loader2 } from "lucide-vue-next";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    closeOnBackdrop: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center p-4" }, _attrs))} data-v-b9d85562><div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" data-v-b9d85562></div><div class="bg-white rounded-2xl w-full max-w-lg z-10 overflow-hidden transform transition-all border border-slate-100" role="dialog" aria-modal="true" data-v-b9d85562><div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between" data-v-b9d85562><h3 class="text-lg font-heading font-bold text-slate-900" data-v-b9d85562>${ssrInterpolate(__props.title)}</h3><button class="text-slate-400 hover:text-slate-600 transition-colors p-1" data-v-b9d85562>`);
        _push(ssrRenderComponent(unref(X), { class: "w-5 h-5" }, null, _parent));
        _push(`</button></div><div class="px-6 py-5 text-slate-600 text-sm" data-v-b9d85562>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
        if (_ctx.$slots.footer) {
          _push(`<div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3" data-v-b9d85562>`);
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Modal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b9d85562"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ConfirmModal",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    confirmText: { type: String, default: "Confirm" },
    type: { type: String, default: "info" },
    // 'info', 'warning', 'danger'
    loading: { type: Boolean, default: false }
  },
  emits: ["confirm", "cancel"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(Modal, mergeProps({
        isOpen: __props.isOpen,
        title: __props.title,
        onClose: ($event) => _ctx.$emit("cancel")
      }, _attrs), {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button${ssrIncludeBooleanAttr(__props.loading) ? " disabled" : ""} class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"${_scopeId}> Cancel </button><button class="${ssrRenderClass([[
              __props.type === "danger" ? "bg-red-600 hover:bg-red-700" : __props.type === "warning" ? "bg-amber-600 hover:bg-amber-700" : "bg-primary-600 hover:bg-primary-700"
            ], "px-4 py-2 text-sm font-medium text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-colors min-w-[100px]"])}"${ssrIncludeBooleanAttr(__props.loading) ? " disabled" : ""}${_scopeId}>`);
            if (__props.loading) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 animate-spin" }, null, _parent2, _scopeId));
            } else {
              _push2(`<span${_scopeId}>${ssrInterpolate(__props.confirmText)}</span>`);
            }
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", {
                onClick: ($event) => _ctx.$emit("cancel"),
                disabled: __props.loading,
                class: "px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
              }, " Cancel ", 8, ["onClick", "disabled"]),
              createVNode("button", {
                onClick: ($event) => _ctx.$emit("confirm"),
                class: ["px-4 py-2 text-sm font-medium text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-colors min-w-[100px]", [
                  __props.type === "danger" ? "bg-red-600 hover:bg-red-700" : __props.type === "warning" ? "bg-amber-600 hover:bg-amber-700" : "bg-primary-600 hover:bg-primary-700"
                ]],
                disabled: __props.loading
              }, [
                __props.loading ? (openBlock(), createBlock(unref(Loader2), {
                  key: 0,
                  class: "w-4 h-4 animate-spin"
                })) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(__props.confirmText), 1))
              ], 10, ["onClick", "disabled"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start gap-4"${_scopeId}>`);
            if (__props.type === "danger") {
              _push2(`<div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(AlertTriangle), { class: "w-5 h-5 text-red-500" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (__props.type === "warning") {
              _push2(`<div class="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(AlertCircle), { class: "w-5 h-5 text-amber-500" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Info), { class: "w-5 h-5 text-blue-500" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`<div class="pt-1 text-slate-600 text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(__props.message)}</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-start gap-4" }, [
                __props.type === "danger" ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"
                }, [
                  createVNode(unref(AlertTriangle), { class: "w-5 h-5 text-red-500" })
                ])) : __props.type === "warning" ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0"
                }, [
                  createVNode(unref(AlertCircle), { class: "w-5 h-5 text-amber-500" })
                ])) : (openBlock(), createBlock("div", {
                  key: 2,
                  class: "w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0"
                }, [
                  createVNode(unref(Info), { class: "w-5 h-5 text-blue-500" })
                ])),
                createVNode("div", { class: "pt-1 text-slate-600 text-sm leading-relaxed" }, toDisplayString(__props.message), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ConfirmModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=ConfirmModal-sqmrmPpx.js.map
