import { defineComponent, ref, computed, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Search, Power } from "lucide-vue-next";
import { F as FloatingDrawer } from "./FloatingDrawer-CcGngjEx.js";
import { u as useFetchUsers } from "./useFetchUsers-sMUlhppT.js";
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
    useHead({ title: "Users — Admin Portal" });
    const { users, loading, toggleUserStatus } = useFetchUsers();
    const searchQuery = ref("");
    const drawerOpen = ref(false);
    const selectedUser = ref(null);
    const filteredUsers = computed(() => {
      if (!searchQuery.value) return users.value;
      const q = searchQuery.value.toLowerCase();
      return users.value.filter(
        (u) => u.email?.toLowerCase().includes(q) || u.firstName?.toLowerCase().includes(q) || u.lastName?.toLowerCase().includes(q)
      );
    });
    const handleToggleStatus = async () => {
      if (selectedUser.value) {
        await toggleUserStatus(selectedUser.value._id);
        selectedUser.value.isActive = !selectedUser.value.isActive;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-8"><div><h1 class="text-3xl font-heading font-bold text-slate-900 mb-1">Users</h1><p class="text-slate-500">Manage platform users (buyers)</p></div></div><div class="card overflow-hidden"><div class="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50"><div class="relative w-full max-w-sm"><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Search users by email or name..." class="input-field !py-2 w-full pl-10">`);
      _push(ssrRenderComponent(unref(Search), { class: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }, null, _parent));
      _push(`</div></div><div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-white border-b border-slate-200 text-sm font-semibold text-slate-600"><th class="p-4">Name</th><th class="p-4">Email</th><th class="p-4">Status</th><th class="p-4">Joined</th><th class="p-4 text-right">Actions</th></tr></thead><tbody>`);
      if (unref(loading)) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<tr class="border-b border-slate-100 bg-white"><td class="p-4"><div class="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div></td><td class="p-4 text-right"><div class="h-6 w-6 bg-slate-200 rounded-full ml-auto animate-pulse"></div></td></tr>`);
        });
        _push(`<!--]-->`);
      } else if (filteredUsers.value.length === 0) {
        _push(`<tr class="border-b border-slate-100 bg-white"><td colspan="5" class="p-8 text-center text-slate-500">No users found</td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(filteredUsers.value, (user) => {
          _push(`<tr class="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors"><td class="p-4 font-medium text-slate-900 flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-primary-50 text-primary-800 flex items-center justify-center font-bold text-xs uppercase overflow-hidden">`);
          if (user.avatar) {
            _push(`<img${ssrRenderAttr("src", user.avatar)} alt="avatar" class="w-full h-full object-cover">`);
          } else {
            _push(`<span>${ssrInterpolate(user.firstName?.charAt(0) || user.email?.charAt(0))}</span>`);
          }
          _push(`</div> ${ssrInterpolate(user.firstName)} ${ssrInterpolate(user.lastName)}</td><td class="p-4 text-sm text-slate-600">${ssrInterpolate(user.email)}</td><td class="p-4"><span class="${ssrRenderClass(user.isActive ? "badge-active" : "badge-neutral")}">${ssrInterpolate(user.isActive ? "ACTIVE" : "INACTIVE")}</span></td><td class="p-4 text-sm text-slate-600">${ssrInterpolate(new Date(user.createdAt).toLocaleDateString())}</td><td class="p-4 text-right"><button class="text-primary-600 hover:text-primary-800 font-medium text-sm border border-primary-200 px-3 py-1 rounded-lg hover:bg-primary-50 transition-colors"> Manage </button></td></tr>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div></div>`);
      _push(ssrRenderComponent(FloatingDrawer, {
        modelValue: drawerOpen.value,
        "onUpdate:modelValue": ($event) => drawerOpen.value = $event,
        title: "User Details"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (selectedUser.value) {
              _push2(`<div class="space-y-6"${_scopeId}><div class="flex items-center gap-4 border-b border-slate-100 pb-6"${_scopeId}><div class="w-16 h-16 rounded-2xl bg-primary-50 text-primary-800 flex items-center justify-center text-2xl font-bold uppercase overflow-hidden"${_scopeId}>`);
              if (selectedUser.value.avatar) {
                _push2(`<img${ssrRenderAttr("src", selectedUser.value.avatar)} alt="avatar" class="w-full h-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<span${_scopeId}>${ssrInterpolate(selectedUser.value.firstName?.charAt(0) || selectedUser.value.email?.charAt(0))}</span>`);
              }
              _push2(`</div><div${_scopeId}><h4 class="text-lg font-bold text-slate-900"${_scopeId}>${ssrInterpolate(selectedUser.value.firstName)} ${ssrInterpolate(selectedUser.value.lastName)}</h4><p class="text-slate-500 text-sm"${_scopeId}>${ssrInterpolate(selectedUser.value.email)}</p>`);
              if (selectedUser.value.phone) {
                _push2(`<p class="text-slate-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(selectedUser.value.phone)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div class="bg-slate-50 p-4 rounded-xl border border-slate-100"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Role</div><div class="font-medium text-slate-900"${_scopeId}>${ssrInterpolate(selectedUser.value.role || "USER")}</div></div><div class="bg-slate-50 p-4 rounded-xl border border-slate-100"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Joined</div><div class="font-medium text-slate-900"${_scopeId}>${ssrInterpolate(new Date(selectedUser.value.createdAt).toLocaleDateString())}</div></div><div class="bg-slate-50 p-4 rounded-xl border border-slate-100"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Verified</div><div class="font-medium text-slate-900"${_scopeId}>${ssrInterpolate(selectedUser.value.isVerified ? "Yes" : "No")}</div></div><div class="bg-slate-50 p-4 rounded-xl border border-slate-100"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Saved Gifts</div><div class="font-medium text-slate-900"${_scopeId}>${ssrInterpolate(selectedUser.value.savedGifts?.length || 0)} items</div></div></div><div class="pt-4 border-t border-slate-100"${_scopeId}><h5 class="text-sm font-bold text-slate-900 mb-3"${_scopeId}>Shopping Preferences</h5><div class="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3 text-sm text-slate-600"${_scopeId}>`);
              if (selectedUser.value.preferences?.budgetRange) {
                _push2(`<div class="flex justify-between items-center"${_scopeId}><span class="font-medium"${_scopeId}>Budget Range:</span><span class="font-bold text-slate-900"${_scopeId}>₦${ssrInterpolate(selectedUser.value.preferences.budgetRange.min?.toLocaleString() || 0)} - ₦${ssrInterpolate(selectedUser.value.preferences.budgetRange.max?.toLocaleString() || 0)}</span></div>`);
              } else {
                _push2(`<div class="text-slate-400 italic"${_scopeId}>No budget preference set</div>`);
              }
              _push2(`</div></div><div class="pt-4 border-t border-slate-100"${_scopeId}><h5 class="text-sm font-bold text-slate-900 mb-3"${_scopeId}>Recipients (${ssrInterpolate(selectedUser.value.recipients?.length || 0)})</h5>`);
              if (selectedUser.value.recipients?.length > 0) {
                _push2(`<div class="space-y-3 max-h-48 overflow-y-auto"${_scopeId}><!--[-->`);
                ssrRenderList(selectedUser.value.recipients, (rec, idx) => {
                  _push2(`<div class="bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm"${_scopeId}><div class="flex justify-between items-start mb-1"${_scopeId}><span class="font-bold text-slate-900"${_scopeId}>${ssrInterpolate(rec.name)}</span><span class="text-xs font-semibold text-primary-600 uppercase tracking-wider bg-primary-50 px-2 py-0.5 rounded"${_scopeId}>${ssrInterpolate(rec.relationship)}</span></div>`);
                  if (rec.notes) {
                    _push2(`<p class="text-xs text-slate-500 mt-1 italic"${_scopeId}>&quot;${ssrInterpolate(rec.notes)}&quot;</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="text-slate-400 text-sm italic py-2 text-center bg-slate-50 rounded-xl border border-slate-100"${_scopeId}> No recipients added yet. </div>`);
              }
              _push2(`</div><div class="pt-4 border-t border-slate-100"${_scopeId}><h5 class="text-sm font-bold text-slate-900 mb-4"${_scopeId}>Quick Actions</h5><button class="w-full flex justify-between items-center p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="${ssrRenderClass([selectedUser.value.isActive ? "bg-amber-50 text-amber-600" : "bg-success-50 text-success-600", "w-10 h-10 rounded-full flex items-center justify-center"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Power), { class: "w-5 h-5" }, null, _parent2, _scopeId));
              _push2(`</div><div class="text-left"${_scopeId}><div class="font-medium text-slate-900"${_scopeId}>${ssrInterpolate(selectedUser.value.isActive ? "Deactivate Account" : "Activate Account")}</div><div class="text-xs text-slate-500"${_scopeId}>Change user access status</div></div></div></button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              selectedUser.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-6"
              }, [
                createVNode("div", { class: "flex items-center gap-4 border-b border-slate-100 pb-6" }, [
                  createVNode("div", { class: "w-16 h-16 rounded-2xl bg-primary-50 text-primary-800 flex items-center justify-center text-2xl font-bold uppercase overflow-hidden" }, [
                    selectedUser.value.avatar ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: selectedUser.value.avatar,
                      alt: "avatar",
                      class: "w-full h-full object-cover"
                    }, null, 8, ["src"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(selectedUser.value.firstName?.charAt(0) || selectedUser.value.email?.charAt(0)), 1))
                  ]),
                  createVNode("div", null, [
                    createVNode("h4", { class: "text-lg font-bold text-slate-900" }, toDisplayString(selectedUser.value.firstName) + " " + toDisplayString(selectedUser.value.lastName), 1),
                    createVNode("p", { class: "text-slate-500 text-sm" }, toDisplayString(selectedUser.value.email), 1),
                    selectedUser.value.phone ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-slate-500 text-xs mt-1"
                    }, toDisplayString(selectedUser.value.phone), 1)) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100" }, [
                    createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Role"),
                    createVNode("div", { class: "font-medium text-slate-900" }, toDisplayString(selectedUser.value.role || "USER"), 1)
                  ]),
                  createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100" }, [
                    createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Joined"),
                    createVNode("div", { class: "font-medium text-slate-900" }, toDisplayString(new Date(selectedUser.value.createdAt).toLocaleDateString()), 1)
                  ]),
                  createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100" }, [
                    createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Verified"),
                    createVNode("div", { class: "font-medium text-slate-900" }, toDisplayString(selectedUser.value.isVerified ? "Yes" : "No"), 1)
                  ]),
                  createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100" }, [
                    createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Saved Gifts"),
                    createVNode("div", { class: "font-medium text-slate-900" }, toDisplayString(selectedUser.value.savedGifts?.length || 0) + " items", 1)
                  ])
                ]),
                createVNode("div", { class: "pt-4 border-t border-slate-100" }, [
                  createVNode("h5", { class: "text-sm font-bold text-slate-900 mb-3" }, "Shopping Preferences"),
                  createVNode("div", { class: "bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3 text-sm text-slate-600" }, [
                    selectedUser.value.preferences?.budgetRange ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-between items-center"
                    }, [
                      createVNode("span", { class: "font-medium" }, "Budget Range:"),
                      createVNode("span", { class: "font-bold text-slate-900" }, "₦" + toDisplayString(selectedUser.value.preferences.budgetRange.min?.toLocaleString() || 0) + " - ₦" + toDisplayString(selectedUser.value.preferences.budgetRange.max?.toLocaleString() || 0), 1)
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-slate-400 italic"
                    }, "No budget preference set"))
                  ])
                ]),
                createVNode("div", { class: "pt-4 border-t border-slate-100" }, [
                  createVNode("h5", { class: "text-sm font-bold text-slate-900 mb-3" }, "Recipients (" + toDisplayString(selectedUser.value.recipients?.length || 0) + ")", 1),
                  selectedUser.value.recipients?.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-3 max-h-48 overflow-y-auto"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(selectedUser.value.recipients, (rec, idx) => {
                      return openBlock(), createBlock("div", {
                        key: idx,
                        class: "bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm"
                      }, [
                        createVNode("div", { class: "flex justify-between items-start mb-1" }, [
                          createVNode("span", { class: "font-bold text-slate-900" }, toDisplayString(rec.name), 1),
                          createVNode("span", { class: "text-xs font-semibold text-primary-600 uppercase tracking-wider bg-primary-50 px-2 py-0.5 rounded" }, toDisplayString(rec.relationship), 1)
                        ]),
                        rec.notes ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-slate-500 mt-1 italic"
                        }, '"' + toDisplayString(rec.notes) + '"', 1)) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-slate-400 text-sm italic py-2 text-center bg-slate-50 rounded-xl border border-slate-100"
                  }, " No recipients added yet. "))
                ]),
                createVNode("div", { class: "pt-4 border-t border-slate-100" }, [
                  createVNode("h5", { class: "text-sm font-bold text-slate-900 mb-4" }, "Quick Actions"),
                  createVNode("button", {
                    onClick: handleToggleStatus,
                    class: "w-full flex justify-between items-center p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                  }, [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("div", {
                        class: [selectedUser.value.isActive ? "bg-amber-50 text-amber-600" : "bg-success-50 text-success-600", "w-10 h-10 rounded-full flex items-center justify-center"]
                      }, [
                        createVNode(unref(Power), { class: "w-5 h-5" })
                      ], 2),
                      createVNode("div", { class: "text-left" }, [
                        createVNode("div", { class: "font-medium text-slate-900" }, toDisplayString(selectedUser.value.isActive ? "Deactivate Account" : "Activate Account"), 1),
                        createVNode("div", { class: "text-xs text-slate-500" }, "Change user access status")
                      ])
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-Do9V0u9i.js.map
