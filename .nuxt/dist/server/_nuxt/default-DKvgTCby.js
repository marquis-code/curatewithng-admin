import { _ as __nuxt_component_0 } from "./nuxt-link-D9wemAsM.js";
import { computed, toValue, getCurrentInstance, onServerPrefetch, ref, shallowRef, nextTick, unref, toRef, reactive, watch, defineComponent, mergeProps, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, createTextVNode, toDisplayString, isRef, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { u as useUser } from "./user-BM2pELKn.js";
import { io } from "socket.io-client";
import { b as useNuxtApp, c as asyncDataDefaults, e as createError, f as fetchDefaults, g as useRequestFetch, a as useRuntimeConfig, u as useCustomToast } from "../server.mjs";
import { hash } from "/Users/marquis/curatewithng/admin/node_modules/ohash/dist/index.mjs";
import { isPlainObject } from "@vue/shared";
import { debounce } from "/Users/marquis/curatewithng/admin/node_modules/perfect-debounce/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/marquis/curatewithng/admin/node_modules/defu/dist/defu.mjs";
import { X, LayoutDashboard, Users, Store, Gift, Package, CreditCard, Brain, Settings, LogOut, Menu, Bell } from "lucide-vue-next";
import { F as FloatingDrawer } from "./FloatingDrawer-CcGngjEx.js";
import "/Users/marquis/curatewithng/admin/node_modules/ufo/dist/index.mjs";
import "./cookie-IdT47JXv.js";
import "/Users/marquis/curatewithng/admin/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/h3/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/destr/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/hookable/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/ofetch/dist/node.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/unctx/dist/index.mjs";
import "vue-router";
const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  options.server ??= true;
  options.default ??= getDefault;
  options.getCachedData ??= getDefaultCachedData;
  options.lazy ??= false;
  options.immediate ??= true;
  options.deep ??= asyncDataDefaults.deep;
  options.dedupe ??= "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!nuxtApp._asyncData[key.value]?._init) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
    pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
    status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
    error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
    refresh: (...args2) => {
      if (!nuxtApp._asyncData[key.value]?._init) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry = nuxtApp._asyncData[key.value];
      if (entry?._abortController) {
        try {
          entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  Object.defineProperties(asyncDataPromise, {
    then: { enumerable: true, value: asyncDataPromise.then.bind(asyncDataPromise) },
    catch: { enumerable: true, value: asyncDataPromise.catch.bind(asyncDataPromise) },
    finally: { enumerable: true, value: asyncDataPromise.finally.bind(asyncDataPromise) }
  });
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    {
      nuxtApp._asyncData[key].pending.value = false;
    }
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= asyncDataDefaults.errorValue;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = !import.meta.prerender || !nuxtApp.ssrContext?.["~sharedPrerenderCache"] ? _handler : (nuxtApp2, options2) => {
    const value = nuxtApp2.ssrContext["~sharedPrerenderCache"].get(key);
    if (value) {
      return value;
    }
    const promise = Promise.resolve().then(() => nuxtApp2.runWithContext(() => _handler(nuxtApp2, options2)));
    nuxtApp2.ssrContext["~sharedPrerenderCache"].set(key, promise);
    return promise;
  };
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData != null;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: shallowRef(!hasCachedData),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if (isDefer(opts.dedupe ?? options.dedupe)) {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      if (opts.cause === "initial" || nuxtApp.isHydrating) {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData != null) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = asyncDataDefaults.errorValue;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      {
        asyncData.pending.value = true;
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const cleanupController = new AbortController();
      const promise = new Promise(
        (resolve, reject) => {
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
            }, { once: true, signal: cleanupController.signal });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        if (nuxtApp._asyncDataPromises[key] !== promise) {
          return;
        }
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = asyncDataDefaults.errorValue;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (asyncData._abortController?.signal.aborted) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        cleanupController.abort();
        if (nuxtApp._asyncDataPromises[key] === promise) {
          {
            asyncData.pending.value = false;
          }
          delete nuxtApp._asyncDataPromises[key];
        }
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
            asyncData.data.value = asyncDataDefaults.value;
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => asyncDataDefaults.value;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true, signal: cleanupSignal });
  }
  return controller.signal;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  if (!immediate) {
    let setImmediate = function() {
      _asyncDataOptions.immediate = true;
    };
    watch(key, setImmediate, { flush: "sync", once: true });
    watch([...watchSources || [], _fetchOptions], setImmediate, { flush: "sync", once: true });
  }
  const asyncData = useAsyncData(watchSources === false ? key.value : key, (_, { signal }) => {
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  const segments = [
    toValue(opts.method)?.toUpperCase() || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.query || opts.params]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const entries = [];
      for (const entry of value.entries()) {
        const [key, val] = entry;
        entries.push([key, val instanceof File ? `${val.name}:${val.size}:${val.lastModified}` : val]);
      }
      segments.push(hash(entries));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const useNotifications = () => {
  const { token } = useUser();
  const config = useRuntimeConfig();
  const { showToast } = useCustomToast();
  const socket = ref(null);
  const unreadCount = ref(0);
  const notifications = ref([]);
  const loading = ref(false);
  const connectSocket = () => {
    if (!token.value) return;
    socket.value = io(config.public.apiBase, {
      auth: { token: token.value }
    });
    socket.value.on("connect", () => {
      console.log("Admin connected to realtime notifications");
    });
    socket.value.on("new_notification", (data) => {
      unreadCount.value++;
      notifications.value.unshift(data);
      showToast({
        title: data.title,
        message: data.body,
        type: "info"
      });
    });
  };
  const disconnectSocket = () => {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  };
  const fetchNotifications = async () => {
    if (!token.value) return;
    loading.value = true;
    try {
      const { data } = await useFetch(
        `${config.public.apiBase}/notifications?limit=50`,
        {
          headers: { Authorization: `Bearer ${token.value}` }
        },
        "$s4ikwoBm60"
        /* nuxt-injected */
      );
      if (data.value && data.value.data) {
        notifications.value = data.value.data;
      }
    } catch (e) {
      console.error("Failed to fetch notifications", e);
    } finally {
      loading.value = false;
    }
  };
  const fetchUnreadCount = async () => {
    if (!token.value) return;
    try {
      const { data } = await useFetch(
        `${config.public.apiBase}/notifications/unread-count`,
        {
          headers: { Authorization: `Bearer ${token.value}` }
        },
        "$hDEZZt5Pet"
        /* nuxt-injected */
      );
      if (data.value) {
        unreadCount.value = data.value.count;
      }
    } catch (e) {
      console.error(e);
    }
  };
  const markAsRead = async (id) => {
    if (!token.value) return;
    try {
      await useFetch(
        `${config.public.apiBase}/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token.value}` }
        },
        "$m4vVGeglu-"
        /* nuxt-injected */
      );
      const index = notifications.value.findIndex((n) => n._id === id);
      if (index !== -1 && !notifications.value[index].isRead) {
        notifications.value[index].isRead = true;
        unreadCount.value = Math.max(0, unreadCount.value - 1);
      }
    } catch (e) {
      console.error("Failed to mark read", e);
    }
  };
  const markAllAsRead = async () => {
    if (!token.value) return;
    try {
      await useFetch(
        `${config.public.apiBase}/notifications/read-all`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token.value}` }
        },
        "$iKpz_NZkXr"
        /* nuxt-injected */
      );
      notifications.value.forEach((n) => n.isRead = true);
      unreadCount.value = 0;
    } catch (e) {
      console.error("Failed to mark all read", e);
    }
  };
  return {
    socket,
    unreadCount,
    notifications,
    loading,
    connectSocket,
    disconnectSocket,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useUser();
    const { unreadCount, notifications, loading, connectSocket, disconnectSocket, fetchUnreadCount, markAsRead, markAllAsRead } = useNotifications();
    const sidebarOpen = ref(false);
    const showSignOutModal = ref(false);
    const notificationsOpen = ref(false);
    watch(() => user.value, (newVal) => {
      if (newVal) {
        connectSocket();
        fetchUnreadCount();
      } else {
        disconnectSocket();
      }
    });
    const navLinks = [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Users", path: "/users", icon: Users },
      { name: "Vendors", path: "/vendors", icon: Store },
      { name: "Gifts", path: "/gifts", icon: Gift },
      { name: "Sourcing Requests", path: "/sourcing-requests", icon: Package },
      { name: "Orders", path: "/orders", icon: Package },
      { name: "Payouts", path: "/payouts", icon: CreditCard },
      { name: "AI Logs", path: "/ai-logs", icon: Brain },
      { name: "Settings", path: "/settings", icon: Settings }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50 flex" }, _attrs))}>`);
      if (unref(sidebarOpen)) {
        _push(`<div class="fixed inset-0 bg-slate-900/50 z-20 md:hidden transition-opacity"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([
        "w-64 bg-primary-900 text-white flex flex-col fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out md:translate-x-0",
        unref(sidebarOpen) ? "translate-x-0" : "-translate-x-full"
      ])}"><div class="p-6 flex justify-between items-center"><div><div class="font-heading font-extrabold text-2xl tracking-tight"> Curate<span class="text-accent-400">With</span>NG </div><div class="text-primary-300 text-xs mt-1 font-medium tracking-wider uppercase">Platform Admin</div></div><button class="md:hidden text-primary-200 hover:text-white">`);
      _push(ssrRenderComponent(unref(X), { class: "w-6 h-6" }, null, _parent));
      _push(`</button></div><div class="flex-1 overflow-y-auto py-4"><nav class="space-y-1 px-3"><!--[-->`);
      ssrRenderList(navLinks, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.path,
          to: link.path,
          onClick: ($event) => sidebarOpen.value = false,
          class: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-primary-200 hover:bg-primary-800/50 hover:text-white",
          "active-class": "bg-primary-800 text-white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(link.icon), { class: "w-5 h-5" }, null), _parent2, _scopeId);
              _push2(` ${ssrInterpolate(link.name)}`);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(link.icon), { class: "w-5 h-5" })),
                createTextVNode(" " + toDisplayString(link.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav></div><div class="p-4 border-t border-primary-800"><div class="flex items-center gap-3 mb-4"><div class="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center font-bold text-white">${ssrInterpolate(unref(user)?.firstName?.charAt(0) || "A")}</div><div class="flex-1 overflow-hidden"><div class="text-sm font-medium truncate">${ssrInterpolate(unref(user)?.firstName)} ${ssrInterpolate(unref(user)?.lastName)}</div><div class="text-xs text-primary-300 truncate">Administrator</div></div></div><button class="w-full py-2 px-3 rounded-lg text-sm font-medium text-danger-300 hover:bg-danger-500/10 hover:text-danger-200 transition-colors flex items-center justify-center gap-2">`);
      _push(ssrRenderComponent(unref(LogOut), { class: "w-4 h-4" }, null, _parent));
      _push(` Sign Out </button></div></aside><main class="flex-1 md:ml-64 flex flex-col min-h-screen min-w-0"><header class="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-3 md:px-6 sticky top-0 z-10"><div class="flex items-center gap-3"><button class="md:hidden text-slate-600 hover:text-slate-900">`);
      _push(ssrRenderComponent(unref(Menu), { class: "w-6 h-6" }, null, _parent));
      _push(`</button><div class="text-slate-600 font-medium hidden sm:block">Platform Administration</div></div><div class="flex items-center gap-4"><button class="relative w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">`);
      _push(ssrRenderComponent(unref(Bell), { class: "w-4 h-4" }, null, _parent));
      if (unref(unreadCount) > 0) {
        _push(`<span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">${ssrInterpolate(unref(unreadCount))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></header><div class="flex-1 p-2 md:p-6 overflow-x-hidden w-full">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main>`);
      if (unref(showSignOutModal)) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"><div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div><div class="bg-white rounded-2xl w-full max-w-sm relative z-10 p-6 text-center border border-slate-100"><div class="w-12 h-12 rounded-full bg-danger-50 text-danger-600 flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(LogOut), { class: "w-6 h-6" }, null, _parent));
        _push(`</div><h3 class="text-lg font-bold text-slate-900 mb-2">Sign Out</h3><p class="text-slate-500 text-sm mb-6">Are you sure you want to end your session?</p><div class="flex gap-3"><button class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"> Cancel </button><button class="flex-1 px-4 py-2.5 rounded-xl bg-danger-600 text-white font-medium hover:bg-danger-700 transition-colors"> Yes, Sign out </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(FloatingDrawer, {
        modelValue: unref(notificationsOpen),
        "onUpdate:modelValue": ($event) => isRef(notificationsOpen) ? notificationsOpen.value = $event : null,
        title: "Notifications"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-2"${_scopeId}><h3 class="font-bold text-slate-900"${_scopeId}>Recent Alerts</h3>`);
            if (unref(unreadCount) > 0) {
              _push2(`<button class="text-xs text-primary-600 font-medium hover:text-primary-700"${_scopeId}> Mark all as read </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(loading)) {
              _push2(`<div class="space-y-4 py-4"${_scopeId}><!--[-->`);
              ssrRenderList(3, (i) => {
                _push2(`<div class="animate-pulse flex gap-3"${_scopeId}><div class="w-10 h-10 bg-slate-200 rounded-full"${_scopeId}></div><div class="flex-1 space-y-2 py-1"${_scopeId}><div class="h-4 bg-slate-200 rounded w-3/4"${_scopeId}></div><div class="h-3 bg-slate-200 rounded w-5/6"${_scopeId}></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else if (unref(notifications).length === 0) {
              _push2(`<div class="text-center py-10 text-slate-500"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Bell), { class: "w-10 h-10 mx-auto text-slate-300 mb-2" }, null, _parent2, _scopeId));
              _push2(`<p class="text-sm"${_scopeId}>You have no notifications yet.</p></div>`);
            } else {
              _push2(`<div class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(unref(notifications), (notif) => {
                _push2(`<div class="${ssrRenderClass([notif.isRead ? "bg-white border-slate-100 shadow-sm" : "bg-primary-50 border-primary-100 shadow-sm", "p-4 rounded-xl border transition-colors cursor-pointer"])}"${_scopeId}><div class="flex justify-between items-start mb-1"${_scopeId}><div class="font-bold text-sm text-slate-900 flex items-center gap-2"${_scopeId}>`);
                if (!notif.isRead) {
                  _push2(`<span class="w-2 h-2 rounded-full bg-primary-500"${_scopeId}></span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(` ${ssrInterpolate(notif.title)}</div><span class="text-[10px] text-slate-400 font-mono"${_scopeId}>${ssrInterpolate(new Date(notif.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))}</span></div><p class="text-xs text-slate-600 ml-4"${_scopeId}>${ssrInterpolate(notif.body)}</p></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center mb-4 border-b border-slate-100 pb-2" }, [
                createVNode("h3", { class: "font-bold text-slate-900" }, "Recent Alerts"),
                unref(unreadCount) > 0 ? (openBlock(), createBlock("button", {
                  key: 0,
                  onClick: unref(markAllAsRead),
                  class: "text-xs text-primary-600 font-medium hover:text-primary-700"
                }, " Mark all as read ", 8, ["onClick"])) : createCommentVNode("", true)
              ]),
              unref(loading) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-4 py-4"
              }, [
                (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                  return createVNode("div", {
                    key: i,
                    class: "animate-pulse flex gap-3"
                  }, [
                    createVNode("div", { class: "w-10 h-10 bg-slate-200 rounded-full" }),
                    createVNode("div", { class: "flex-1 space-y-2 py-1" }, [
                      createVNode("div", { class: "h-4 bg-slate-200 rounded w-3/4" }),
                      createVNode("div", { class: "h-3 bg-slate-200 rounded w-5/6" })
                    ])
                  ]);
                }), 64))
              ])) : unref(notifications).length === 0 ? (openBlock(), createBlock("div", {
                key: 1,
                class: "text-center py-10 text-slate-500"
              }, [
                createVNode(unref(Bell), { class: "w-10 h-10 mx-auto text-slate-300 mb-2" }),
                createVNode("p", { class: "text-sm" }, "You have no notifications yet.")
              ])) : (openBlock(), createBlock("div", {
                key: 2,
                class: "space-y-3"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(notifications), (notif) => {
                  return openBlock(), createBlock("div", {
                    key: notif._id,
                    class: ["p-4 rounded-xl border transition-colors cursor-pointer", notif.isRead ? "bg-white border-slate-100 shadow-sm" : "bg-primary-50 border-primary-100 shadow-sm"],
                    onClick: ($event) => unref(markAsRead)(notif._id)
                  }, [
                    createVNode("div", { class: "flex justify-between items-start mb-1" }, [
                      createVNode("div", { class: "font-bold text-sm text-slate-900 flex items-center gap-2" }, [
                        !notif.isRead ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "w-2 h-2 rounded-full bg-primary-500"
                        })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(notif.title), 1)
                      ]),
                      createVNode("span", { class: "text-[10px] text-slate-400 font-mono" }, toDisplayString(new Date(notif.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })), 1)
                    ]),
                    createVNode("p", { class: "text-xs text-slate-600 ml-4" }, toDisplayString(notif.body), 1)
                  ], 10, ["onClick"]);
                }), 128))
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-DKvgTCby.js.map
