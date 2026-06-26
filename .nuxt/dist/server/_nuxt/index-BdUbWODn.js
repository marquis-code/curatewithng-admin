import { defineComponent, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import "/Users/marquis/curatewithng/admin/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/marquis/curatewithng/admin/node_modules/unctx/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/marquis/curatewithng/admin/node_modules/defu/dist/defu.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/ufo/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/klona/dist/index.mjs";
import "lucide-vue-next";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>Redirecting to Dashboard...</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-BdUbWODn.js.map
