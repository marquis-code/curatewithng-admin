import { defineComponent, ref, computed, resolveComponent, unref, withCtx, openBlock, createBlock, createVNode, createTextVNode, toDisplayString, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Search, User, Brain, Sparkles } from "lucide-vue-next";
import { F as FloatingDrawer } from "./FloatingDrawer-CcGngjEx.js";
import { u as useFetchAiLogs } from "./useFetchAiLogs-BpiIypOi.js";
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
    useHead({ title: "AI Logs — Admin Portal" });
    const { logs, loading } = useFetchAiLogs();
    const searchQuery = ref("");
    const drawerOpen = ref(false);
    const selectedLog = ref(null);
    const filteredLogs = computed(() => {
      if (!searchQuery.value) return logs.value;
      const q = searchQuery.value.toLowerCase();
      return logs.value.filter(
        (l) => l.aiPrompt?.toLowerCase().includes(q) || l.recipientProfile?.name?.toLowerCase().includes(q) || l.recipientProfile?.relationship?.toLowerCase().includes(q)
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CustomSelect = resolveComponent("CustomSelect");
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"><div><h1 class="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-1">AI Curation Logs</h1><p class="text-slate-500">View generative AI requests and responses</p></div></div><div class="card overflow-hidden bg-white border border-slate-200 shadow-sm rounded-xl"><div class="p-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4 bg-slate-50"><div class="relative w-full sm:max-w-sm"><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Search prompts or recipients..." class="input-field !py-2 w-full pl-10 bg-white">`);
      _push(ssrRenderComponent(unref(Search), { class: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CustomSelect, {
        modelValue: _ctx.statusFilter,
        "onUpdate:modelValue": ($event) => _ctx.statusFilter = $event,
        options: [
          { label: "All Statuses", value: "all" },
          { label: "Converted", value: "converted" },
          { label: "Browsing", value: "browsing" }
        ],
        placeholder: "All Statuses",
        class: "w-full sm:w-48"
      }, null, _parent));
      _push(`</div><div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-slate-50 text-sm font-semibold text-slate-600 border-b border-slate-200"><th class="p-4 rounded-tl-xl">Recipient</th><th class="p-4">Occasion</th><th class="p-4">Prompt Snippet</th><th class="p-4">Status</th><th class="p-4">Time</th><th class="p-4 text-right rounded-tr-xl">Trace</th></tr></thead><tbody class="text-sm text-slate-600">`);
      if (unref(loading)) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<tr class="border-b border-slate-100"><td class="p-4"><div class="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-full animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div></td><td class="p-4"><div class="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div></td><td class="p-4 text-right"><div class="h-8 w-20 bg-slate-200 rounded ml-auto animate-pulse"></div></td></tr>`);
        });
        _push(`<!--]-->`);
      } else if (filteredLogs.value.length === 0) {
        _push(`<tr class="border-b border-slate-100"><td colspan="6" class="p-8 text-center text-slate-500">No logs found</td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(filteredLogs.value, (log) => {
          _push(`<tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors"><td class="p-4"><div class="flex flex-col"><span class="font-medium text-slate-900">${ssrInterpolate(log.recipientProfile?.name || "Anonymous")}</span><span class="text-xs text-slate-500 capitalize">${ssrInterpolate(log.recipientProfile?.relationship || "N/A")}</span></div></td><td class="p-4"><span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium capitalize border border-slate-200">${ssrInterpolate(log.recipientProfile?.occasion || "General")}</span></td><td class="p-4 max-w-xs truncate font-mono text-xs text-slate-500">${ssrInterpolate(log.aiPrompt)}</td><td class="p-4">`);
          if (log.isConverted) {
            _push(`<span class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium border border-emerald-200">Converted</span>`);
          } else {
            _push(`<span class="px-2 py-1 bg-slate-100 text-slate-500 rounded text-xs font-medium border border-slate-200">Browsing</span>`);
          }
          _push(`</td><td class="p-4 text-slate-500">${ssrInterpolate(new Date(log.createdAt).toLocaleString())}</td><td class="p-4 text-right"><button class="text-primary-600 hover:text-primary-700 font-medium px-3 py-1 rounded hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-100"> View Details </button></td></tr>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div></div>`);
      _push(ssrRenderComponent(FloatingDrawer, {
        modelValue: drawerOpen.value,
        "onUpdate:modelValue": ($event) => drawerOpen.value = $event,
        title: "AI Interaction Details"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (selectedLog.value) {
              _push2(`<div class="space-y-6"${_scopeId}><div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"${_scopeId}><div class="text-xs text-slate-500 font-bold uppercase tracking-widest mb-4 flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(User), { class: "w-4 h-4 text-primary-500" }, null, _parent2, _scopeId));
              _push2(` Recipient Profile </div><div class="grid grid-cols-2 gap-4 text-sm"${_scopeId}><div${_scopeId}><span class="block text-xs text-slate-400 font-medium uppercase mb-1"${_scopeId}>Relationship</span><span class="text-slate-900 font-medium capitalize"${_scopeId}>${ssrInterpolate(selectedLog.value.recipientProfile?.relationship || "N/A")}</span></div><div${_scopeId}><span class="block text-xs text-slate-400 font-medium uppercase mb-1"${_scopeId}>Demographics</span><span class="text-slate-900 font-medium capitalize"${_scopeId}>${ssrInterpolate(selectedLog.value.recipientProfile?.age)} yrs • ${ssrInterpolate(selectedLog.value.recipientProfile?.gender)}</span></div><div${_scopeId}><span class="block text-xs text-slate-400 font-medium uppercase mb-1"${_scopeId}>Budget Range</span><span class="text-slate-900 font-medium font-mono text-xs"${_scopeId}> ₦${ssrInterpolate((selectedLog.value.recipientProfile?.budgetMin || 0).toLocaleString())} - ₦${ssrInterpolate((selectedLog.value.recipientProfile?.budgetMax || 0).toLocaleString())}</span></div><div${_scopeId}><span class="block text-xs text-slate-400 font-medium uppercase mb-1"${_scopeId}>Occasion</span><span class="text-slate-900 font-medium capitalize"${_scopeId}>${ssrInterpolate(selectedLog.value.recipientProfile?.occasion)}</span></div><div class="col-span-2 mt-2"${_scopeId}><span class="block text-xs text-slate-400 font-medium uppercase mb-2"${_scopeId}>Interests</span><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(selectedLog.value.recipientProfile?.interests || [], (interest) => {
                _push2(`<span class="px-2 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-xs rounded"${_scopeId}>${ssrInterpolate(interest)}</span>`);
              });
              _push2(`<!--]--></div></div></div></div><div class="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-inner"${_scopeId}><div class="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3 flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Brain), { class: "w-4 h-4 text-slate-500" }, null, _parent2, _scopeId));
              _push2(` Prompt Provided to AI </div><div class="whitespace-pre-wrap leading-relaxed text-sm text-slate-700 font-mono text-xs overflow-x-auto"${_scopeId}>${ssrInterpolate(selectedLog.value.aiPrompt || "No prompt recorded")}</div></div><div class="bg-white p-5 rounded-xl border border-primary-100 shadow-sm"${_scopeId}><div class="text-xs text-primary-600 font-bold uppercase tracking-widest mb-4 flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Sparkles), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(` AI Recommendations </div>`);
              if (selectedLog.value.recommendations && selectedLog.value.recommendations.length > 0) {
                _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
                ssrRenderList(selectedLog.value.recommendations, (rec, idx) => {
                  _push2(`<div class="p-4 rounded-lg border border-slate-100 bg-slate-50 flex flex-col gap-2"${_scopeId}><div class="flex justify-between items-start"${_scopeId}><div${_scopeId}><div class="font-bold text-slate-900 flex items-center gap-2"${_scopeId}>${ssrInterpolate(rec.customName || "Catalog Gift")} `);
                  if (rec.isCustom) {
                    _push2(`<span class="px-2 py-0.5 bg-primary-100 text-primary-700 text-[10px] uppercase font-bold rounded"${_scopeId}>Custom Idea</span>`);
                  } else {
                    _push2(`<span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold rounded"${_scopeId}>In Catalog</span>`);
                  }
                  _push2(`</div>`);
                  if (rec.customDescription) {
                    _push2(`<div class="text-sm text-slate-500 mt-1"${_scopeId}>${ssrInterpolate(rec.customDescription)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><div class="flex flex-col items-end"${_scopeId}><div class="bg-white px-2 py-1 rounded shadow-sm border border-slate-200 text-xs font-bold font-mono"${_scopeId}> Score: <span class="${ssrRenderClass(rec.score >= 90 ? "text-emerald-600" : "text-slate-600")}"${_scopeId}>${ssrInterpolate(rec.score)}</span></div>`);
                  if (rec.estimatedPrice) {
                    _push2(`<div class="text-xs font-mono font-medium text-slate-400 mt-1"${_scopeId}>~₦${ssrInterpolate(rec.estimatedPrice.toLocaleString())}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div><div class="text-sm bg-white p-2 rounded border border-slate-100 text-slate-600 mt-1"${_scopeId}><span class="font-medium text-slate-800"${_scopeId}>Reasoning:</span> ${ssrInterpolate(rec.reasoning)}</div>`);
                  if (rec.giftId) {
                    _push2(`<div class="text-xs text-slate-400 font-mono mt-1"${_scopeId}>Gift ID: ${ssrInterpolate(rec.giftId)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="text-sm text-slate-500 italic p-4 text-center bg-slate-50 rounded-lg"${_scopeId}> No valid recommendations parsed. </div>`);
              }
              _push2(`</div><div class="grid grid-cols-2 gap-4"${_scopeId}><div class="bg-white p-4 rounded-xl border border-slate-200"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Conversion</div><div class="font-bold text-slate-900 text-sm flex items-center gap-2"${_scopeId}><div class="${ssrRenderClass([selectedLog.value.isConverted ? "bg-emerald-500" : "bg-slate-300", "w-2 h-2 rounded-full"])}"${_scopeId}></div> ${ssrInterpolate(selectedLog.value.isConverted ? "User Checked Out" : "No Action Taken")}</div></div><div class="bg-white p-4 rounded-xl border border-slate-200"${_scopeId}><div class="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"${_scopeId}>Timestamp</div><div class="font-bold text-slate-900 text-sm"${_scopeId}>${ssrInterpolate(new Date(selectedLog.value.createdAt).toLocaleString())}</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              selectedLog.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-6"
              }, [
                createVNode("div", { class: "bg-white p-5 rounded-xl border border-slate-200 shadow-sm" }, [
                  createVNode("div", { class: "text-xs text-slate-500 font-bold uppercase tracking-widest mb-4 flex items-center gap-2" }, [
                    createVNode(unref(User), { class: "w-4 h-4 text-primary-500" }),
                    createTextVNode(" Recipient Profile ")
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4 text-sm" }, [
                    createVNode("div", null, [
                      createVNode("span", { class: "block text-xs text-slate-400 font-medium uppercase mb-1" }, "Relationship"),
                      createVNode("span", { class: "text-slate-900 font-medium capitalize" }, toDisplayString(selectedLog.value.recipientProfile?.relationship || "N/A"), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "block text-xs text-slate-400 font-medium uppercase mb-1" }, "Demographics"),
                      createVNode("span", { class: "text-slate-900 font-medium capitalize" }, toDisplayString(selectedLog.value.recipientProfile?.age) + " yrs • " + toDisplayString(selectedLog.value.recipientProfile?.gender), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "block text-xs text-slate-400 font-medium uppercase mb-1" }, "Budget Range"),
                      createVNode("span", { class: "text-slate-900 font-medium font-mono text-xs" }, " ₦" + toDisplayString((selectedLog.value.recipientProfile?.budgetMin || 0).toLocaleString()) + " - ₦" + toDisplayString((selectedLog.value.recipientProfile?.budgetMax || 0).toLocaleString()), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "block text-xs text-slate-400 font-medium uppercase mb-1" }, "Occasion"),
                      createVNode("span", { class: "text-slate-900 font-medium capitalize" }, toDisplayString(selectedLog.value.recipientProfile?.occasion), 1)
                    ]),
                    createVNode("div", { class: "col-span-2 mt-2" }, [
                      createVNode("span", { class: "block text-xs text-slate-400 font-medium uppercase mb-2" }, "Interests"),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(selectedLog.value.recipientProfile?.interests || [], (interest) => {
                          return openBlock(), createBlock("span", {
                            key: interest,
                            class: "px-2 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-xs rounded"
                          }, toDisplayString(interest), 1);
                        }), 128))
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-inner" }, [
                  createVNode("div", { class: "text-xs text-slate-500 font-bold uppercase tracking-widest mb-3 flex items-center gap-2" }, [
                    createVNode(unref(Brain), { class: "w-4 h-4 text-slate-500" }),
                    createTextVNode(" Prompt Provided to AI ")
                  ]),
                  createVNode("div", { class: "whitespace-pre-wrap leading-relaxed text-sm text-slate-700 font-mono text-xs overflow-x-auto" }, toDisplayString(selectedLog.value.aiPrompt || "No prompt recorded"), 1)
                ]),
                createVNode("div", { class: "bg-white p-5 rounded-xl border border-primary-100 shadow-sm" }, [
                  createVNode("div", { class: "text-xs text-primary-600 font-bold uppercase tracking-widest mb-4 flex items-center gap-2" }, [
                    createVNode(unref(Sparkles), { class: "w-4 h-4" }),
                    createTextVNode(" AI Recommendations ")
                  ]),
                  selectedLog.value.recommendations && selectedLog.value.recommendations.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(selectedLog.value.recommendations, (rec, idx) => {
                      return openBlock(), createBlock("div", {
                        key: idx,
                        class: "p-4 rounded-lg border border-slate-100 bg-slate-50 flex flex-col gap-2"
                      }, [
                        createVNode("div", { class: "flex justify-between items-start" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "font-bold text-slate-900 flex items-center gap-2" }, [
                              createTextVNode(toDisplayString(rec.customName || "Catalog Gift") + " ", 1),
                              rec.isCustom ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "px-2 py-0.5 bg-primary-100 text-primary-700 text-[10px] uppercase font-bold rounded"
                              }, "Custom Idea")) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold rounded"
                              }, "In Catalog"))
                            ]),
                            rec.customDescription ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-sm text-slate-500 mt-1"
                            }, toDisplayString(rec.customDescription), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex flex-col items-end" }, [
                            createVNode("div", { class: "bg-white px-2 py-1 rounded shadow-sm border border-slate-200 text-xs font-bold font-mono" }, [
                              createTextVNode(" Score: "),
                              createVNode("span", {
                                class: rec.score >= 90 ? "text-emerald-600" : "text-slate-600"
                              }, toDisplayString(rec.score), 3)
                            ]),
                            rec.estimatedPrice ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-xs font-mono font-medium text-slate-400 mt-1"
                            }, "~₦" + toDisplayString(rec.estimatedPrice.toLocaleString()), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "text-sm bg-white p-2 rounded border border-slate-100 text-slate-600 mt-1" }, [
                          createVNode("span", { class: "font-medium text-slate-800" }, "Reasoning:"),
                          createTextVNode(" " + toDisplayString(rec.reasoning), 1)
                        ]),
                        rec.giftId ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-xs text-slate-400 font-mono mt-1"
                        }, "Gift ID: " + toDisplayString(rec.giftId), 1)) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-sm text-slate-500 italic p-4 text-center bg-slate-50 rounded-lg"
                  }, " No valid recommendations parsed. "))
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode("div", { class: "bg-white p-4 rounded-xl border border-slate-200" }, [
                    createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Conversion"),
                    createVNode("div", { class: "font-bold text-slate-900 text-sm flex items-center gap-2" }, [
                      createVNode("div", {
                        class: ["w-2 h-2 rounded-full", selectedLog.value.isConverted ? "bg-emerald-500" : "bg-slate-300"]
                      }, null, 2),
                      createTextVNode(" " + toDisplayString(selectedLog.value.isConverted ? "User Checked Out" : "No Action Taken"), 1)
                    ])
                  ]),
                  createVNode("div", { class: "bg-white p-4 rounded-xl border border-slate-200" }, [
                    createVNode("div", { class: "text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider" }, "Timestamp"),
                    createVNode("div", { class: "font-bold text-slate-900 text-sm" }, toDisplayString(new Date(selectedLog.value.createdAt).toLocaleString()), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ai-logs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DpXJJVCv.js.map
