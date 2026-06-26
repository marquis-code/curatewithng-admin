import { defineComponent, ref, computed, useId, mergeProps, unref, useSSRContext, withCtx, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { Eye, EyeOff, Check, Shield, Mail, Lock, Loader2, ArrowRight, KeyRound } from "lucide-vue-next";
import { G as GATEWAY_ENDPOINT_WITH_AUTH, a as GATEWAY_ENDPOINT } from "./axios.config-DHAaROs1.js";
import { u as useUser } from "./user-BM2pELKn.js";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-CyTADNBk.js";
import "axios";
import "./cookie-IdT47JXv.js";
import "/Users/marquis/curatewithng/admin/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/h3/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/destr/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/ohash/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/klona/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/marquis/curatewithng/admin/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "/Users/marquis/curatewithng/admin/node_modules/defu/dist/defu.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/ufo/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CustomInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    },
    minlength: {
      type: [String, Number],
      default: void 0
    }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const showPassword = ref(false);
    const inputType = computed(() => {
      if (props.type === "password") {
        return showPassword.value ? "text" : "password";
      }
      return props.type;
    });
    const id = useId();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-1.5" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label${ssrRenderAttr("for", unref(id))} class="text-sm font-semibold text-slate-700">${ssrInterpolate(__props.label)} `);
        if (__props.required) {
          _push(`<span class="text-red-500">*</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative">`);
      if (_ctx.$slots.icon) {
        _push(`<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">`);
        ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("id", unref(id))}${ssrRenderAttr("type", inputType.value)}${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.required) ? " required" : ""}${ssrRenderAttr("minlength", __props.minlength)}${ssrIncludeBooleanAttr(__props.readonly) ? " readonly" : ""} class="${ssrRenderClass([
        "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-slate-800 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500",
        _ctx.$slots.icon ? "pl-10" : "",
        __props.type === "password" ? "pr-12" : "",
        __props.error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-slate-200 hover:border-slate-300 focus:border-transparent",
        __props.readonly ? "bg-slate-50 text-slate-500 cursor-not-allowed" : ""
      ])}">`);
      if (__props.type === "password") {
        _push(`<button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors">`);
        if (!showPassword.value) {
          _push(ssrRenderComponent(unref(Eye), { class: "w-5 h-5" }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(EyeOff), { class: "w-5 h-5" }, null, _parent));
        }
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.error) {
        _push(`<span class="text-xs text-red-500">${ssrInterpolate(__props.error)}</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/CustomInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _imports_0 = "" + __buildAssetsURL("auth-bg.BAHkeY5e.png");
const auth_api = {
  login: (payload) => {
    return GATEWAY_ENDPOINT.post("/auth/login", payload);
  },
  verifyAdminOtp: (payload) => {
    return GATEWAY_ENDPOINT.post("/auth/verify-admin-otp", payload);
  },
  getProfile: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get("/users/me");
  }
};
const useAuth = () => {
  const { setUser } = useUser();
  const fetchProfile = async () => {
    const response = await auth_api.getProfile();
    const userData = response.data.data || response.data;
    setUser(userData);
    return userData;
  };
  const login2 = async (payload) => {
    const response = await auth_api.login(payload);
    const responseData = response.data.data || response.data;
    if (responseData.requiresOtp) {
      return responseData;
    }
    const user = responseData.user;
    if (!user || user.role !== "ADMIN") {
      throw { response: { data: { message: "Unauthorized. Admin access required." } } };
    }
    setUser(user);
    await fetchProfile();
    return responseData;
  };
  const verifyOtp = async (email, otp) => {
    const response = await auth_api.verifyAdminOtp({ email, otp });
    const responseData = response.data.data || response.data;
    const user = responseData.user;
    if (!user || user.role !== "ADMIN") {
      throw { response: { data: { message: "Unauthorized. Admin access required." } } };
    }
    setUser(user);
    await fetchProfile();
    return responseData;
  };
  return { login: login2, fetchProfile, verifyOtp };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Admin Login — CurateWithNG" });
    useAuth();
    const email = ref("usisangozi@gmail.com");
    const password = ref("");
    const otpDigits = ref(["", "", "", "", "", ""]);
    ref([]);
    computed(() => otpDigits.value.join(""));
    const loading = ref(false);
    const step = ref("credentials");
    const notification = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCustomInput = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen grid lg:grid-cols-2 bg-white" }, _attrs))} data-v-82d29285><div class="relative flex flex-col justify-center px-6 sm:px-16 lg:px-24 py-12" data-v-82d29285>`);
      if (notification.value) {
        _push(`<div class="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-emerald-50 px-6 py-3 rounded-full border border-emerald-200" data-v-82d29285><div class="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700" data-v-82d29285>`);
        _push(ssrRenderComponent(unref(Check), { class: "w-3.5 h-3.5" }, null, _parent));
        _push(`</div><p class="text-sm font-semibold text-emerald-800" data-v-82d29285>${ssrInterpolate(notification.value)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="max-w-md w-full mx-auto" data-v-82d29285><div class="flex items-center justify-center gap-3 mb-12" data-v-82d29285><div class="w-10 h-10 bg-slate-900 text-white flex items-center justify-center rounded-lg" data-v-82d29285>`);
      _push(ssrRenderComponent(unref(Shield), { class: "w-5 h-5" }, null, _parent));
      _push(`</div><div class="font-heading font-extrabold text-xl tracking-tight text-slate-900" data-v-82d29285> Curate<span class="text-accent-500" data-v-82d29285>With</span>NG <span class="text-slate-400 font-medium tracking-normal ml-1 border-l border-slate-200 pl-2" data-v-82d29285>Admin</span></div></div>`);
      if (step.value === "credentials") {
        _push(`<div data-v-82d29285><h1 class="text-2xl md:text-3xl text-center font-heading font-extrabold text-slate-900 mb-2" data-v-82d29285>Secure Login</h1><p class="text-slate-500 text-center text-base mb-10" data-v-82d29285>Enter your credentials to access the command center.</p><form class="space-y-6" data-v-82d29285>`);
        _push(ssrRenderComponent(_component_UiCustomInput, {
          modelValue: email.value,
          "onUpdate:modelValue": ($event) => email.value = $event,
          type: "email",
          label: "Email",
          placeholder: "admin@curatewithng.com",
          required: ""
        }, {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Mail), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Mail), { class: "w-4 h-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UiCustomInput, {
          modelValue: password.value,
          "onUpdate:modelValue": ($event) => password.value = $event,
          type: "password",
          label: "Password",
          placeholder: "••••••••",
          required: ""
        }, {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Lock), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Lock), { class: "w-4 h-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="w-full flex justify-center items-center gap-2 py-3.5 mt-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors" data-v-82d29285>`);
        if (loading.value) {
          _push(ssrRenderComponent(unref(Loader2), { class: "w-5 h-5 animate-spin" }, null, _parent));
        } else {
          _push(`<span data-v-82d29285>Continue securely</span>`);
        }
        if (!loading.value) {
          _push(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 ml-1" }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</button></form></div>`);
      } else if (step.value === "otp") {
        _push(`<div data-v-82d29285><div class="w-12 h-12 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center mb-6" data-v-82d29285>`);
        _push(ssrRenderComponent(unref(KeyRound), { class: "w-6 h-6" }, null, _parent));
        _push(`</div><h1 class="text-3xl font-heading font-extrabold text-slate-900 mb-2" data-v-82d29285>Two-Factor Auth</h1><p class="text-slate-500 text-base mb-10" data-v-82d29285>We&#39;ve sent a 6-digit code to <strong data-v-82d29285>${ssrInterpolate(email.value)}</strong></p><form class="space-y-6" data-v-82d29285><div data-v-82d29285><label class="text-sm font-semibold text-slate-700 mb-3 block" data-v-82d29285>Verification Code</label><div class="flex gap-3 justify-between" data-v-82d29285><!--[-->`);
        ssrRenderList(otpDigits.value, (digit, index) => {
          _push(`<input${ssrRenderAttr("value", otpDigits.value[index])} type="text" inputmode="numeric" maxlength="1" class="w-12 h-14 rounded-xl border border-slate-200 bg-white text-slate-900 text-center text-2xl font-semibold focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all" data-v-82d29285>`);
        });
        _push(`<!--]--></div></div><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="w-full flex justify-center items-center gap-2 py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors" data-v-82d29285>`);
        if (loading.value) {
          _push(ssrRenderComponent(unref(Loader2), { class: "w-5 h-5 animate-spin" }, null, _parent));
        } else {
          _push(`<span data-v-82d29285>Verify &amp; Login</span>`);
        }
        _push(`</button></form><div class="mt-8" data-v-82d29285><button type="button" class="text-sm text-slate-500 hover:text-slate-900 font-semibold transition-colors flex items-center gap-1" data-v-82d29285> ← Back to login </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="hidden lg:flex items-center justify-center p-6 bg-slate-50" data-v-82d29285><div class="relative w-full h-full overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-[0_0_40px_-10px_rgba(0,0,0,0.05)]" data-v-82d29285><img${ssrRenderAttr("src", _imports_0)} alt="Premium Admin Dashboard" class="absolute inset-0 w-full h-full object-cover opacity-80" data-v-82d29285><div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" data-v-82d29285></div><div class="absolute bottom-12 left-12 right-12 z-10" data-v-82d29285><h2 class="font-heading font-extrabold text-4xl leading-tight mb-4 text-white" data-v-82d29285> Command Central. </h2><p class="text-white/80 text-lg max-w-md" data-v-82d29285> Curate and manage the ecosystem with absolute precision. </p></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-82d29285"]]);
export {
  login as default
};
//# sourceMappingURL=login-CWKK0Rn7.js.map
