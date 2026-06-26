import { _ as __nuxt_component_0 } from './nuxt-link-D9wemAsM.mjs';
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, createTextVNode, toDisplayString, computed, toValue, reactive, getCurrentInstance, onServerPrefetch, shallowRef, nextTick, toRef, useSSRContext } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderSlot } from 'file:///Users/marquis/curatewithng/admin/node_modules/vue/server-renderer/index.mjs';
import { u as useUser } from './user-BM2pELKn.mjs';
import { io } from 'file:///Users/marquis/curatewithng/admin/node_modules/socket.io-client/build/esm-debug/index.js';
import { u as useCustomToast, f as fetchDefaults, a as useRuntimeConfig, b as useNuxtApp, c as asyncDataDefaults, g as useRequestFetch, e as createError } from './server.mjs';
import { hash } from 'file:///Users/marquis/curatewithng/admin/node_modules/ohash/dist/index.mjs';
import { isPlainObject } from 'file:///Users/marquis/curatewithng/admin/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import { debounce } from 'file:///Users/marquis/curatewithng/admin/node_modules/perfect-debounce/dist/index.mjs';
import { X, LayoutDashboard, Users, Store, Gift, Package, CreditCard, Brain, Settings, LogOut, Menu, Bell } from 'file:///Users/marquis/curatewithng/admin/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';
import 'file:///Users/marquis/curatewithng/admin/node_modules/ufo/dist/index.mjs';
import './cookie-IdT47JXv.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/h3/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/destr/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/klona/dist/index.mjs';
import 'file:///Users/marquis/curatewithng/admin/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
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

const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e, _f, _g;
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
  (_a = options.server) != null ? _a : options.server = true;
  (_b = options.default) != null ? _b : options.default = getDefault;
  (_c = options.getCachedData) != null ? _c : options.getCachedData = getDefaultCachedData;
  (_d = options.lazy) != null ? _d : options.lazy = false;
  (_e = options.immediate) != null ? _e : options.immediate = true;
  (_f = options.deep) != null ? _f : options.deep = asyncDataDefaults.deep;
  (_g = options.dedupe) != null ? _g : options.dedupe = "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    var _a2;
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!((_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2._init)) {
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
    data: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.data;
    }),
    pending: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.pending;
    }),
    status: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.status;
    }),
    error: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.error;
    }),
    refresh: (...args2) => {
      var _a2;
      if (!((_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2._init)) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry = nuxtApp._asyncData[key.value];
      if (entry == null ? void 0 : entry._abortController) {
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
      var _a;
      return (_a = getter()) == null ? void 0 : _a.value;
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
  var _a, _b, _c;
  (_b = (_a = nuxtApp.payload._errors)[key]) != null ? _b : _a[key] = asyncDataDefaults.errorValue;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = !((_c = nuxtApp.ssrContext) == null ? void 0 : _c["~sharedPrerenderCache"]) ? _handler : (nuxtApp2, options2) => {
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
      var _a2, _b2;
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if (isDefer((_a2 = opts.dedupe) != null ? _a2 : options.dedupe)) {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      if (opts.cause === "initial" || nuxtApp.isHydrating) {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: (_b2 = opts.cause) != null ? _b2 : "refresh:manual" });
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
          var _a3, _b3;
          try {
            const timeout = (_a3 = opts.timeout) != null ? _a3 : options.timeout;
            const mergedSignal = mergeAbortSignals([(_b3 = asyncData._abortController) == null ? void 0 : _b3.signal, opts == null ? void 0 : opts.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason != null ? reason : "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason != null ? reason : "Aborted"), "AbortError"));
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
        var _a3;
        if (nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if ((_a3 = asyncData._abortController) == null ? void 0 : _a3.signal.aborted) {
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
      var _a2;
      unsubRefreshAsyncData();
      if ((_a2 = nuxtApp._asyncData[key]) == null ? void 0 : _a2._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          var _a3;
          if (!((_a3 = nuxtApp._asyncData[key]) == null ? void 0 : _a3._init)) {
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
  var _a, _b, _c;
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = (_a = AbortSignal.timeout) == null ? void 0 : _a.call(AbortSignal, timeout);
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
      const reason = (_b = sig.reason) != null ? _b : new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    var _a2;
    const abortedSignal = list.find((s) => s.aborted);
    const reason = (_a2 = abortedSignal == null ? void 0 : abortedSignal.reason) != null ? _a2 : new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    (_c = sig.addEventListener) == null ? void 0 : _c.call(sig, "abort", onAbort, { once: true, signal: cleanupSignal });
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
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
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
  const fetchUnreadCount = async () => {
    if (!token.value) return;
    try {
      const { data } = await useFetch(
        `${config.public.apiBase}/notifications/unread-count`,
        {
          headers: { Authorization: `Bearer ${token.value}` }
        },
        "$s4ikwoBm60"
        /* nuxt-injected */
      );
      if (data.value) {
        unreadCount.value = data.value.count;
      }
    } catch (e) {
      console.error(e);
    }
  };
  return {
    socket,
    unreadCount,
    notifications,
    connectSocket,
    disconnectSocket,
    fetchUnreadCount
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useUser();
    const { unreadCount, connectSocket, disconnectSocket, fetchUnreadCount } = useNotifications();
    const sidebarOpen = ref(false);
    const showSignOutModal = ref(false);
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
      var _a, _b, _c, _d;
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
      _push(`<!--]--></nav></div><div class="p-4 border-t border-primary-800"><div class="flex items-center gap-3 mb-4"><div class="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center font-bold text-white">${ssrInterpolate(((_b = (_a = unref(user)) == null ? void 0 : _a.firstName) == null ? void 0 : _b.charAt(0)) || "A")}</div><div class="flex-1 overflow-hidden"><div class="text-sm font-medium truncate">${ssrInterpolate((_c = unref(user)) == null ? void 0 : _c.firstName)} ${ssrInterpolate((_d = unref(user)) == null ? void 0 : _d.lastName)}</div><div class="text-xs text-primary-300 truncate">Administrator</div></div></div><button class="w-full py-2 px-3 rounded-lg text-sm font-medium text-danger-300 hover:bg-danger-500/10 hover:text-danger-200 transition-colors flex items-center justify-center gap-2">`);
      _push(ssrRenderComponent(unref(LogOut), { class: "w-4 h-4" }, null, _parent));
      _push(` Sign Out </button></div></aside><main class="flex-1 md:ml-64 flex flex-col min-h-screen"><header class="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10"><div class="flex items-center gap-3"><button class="md:hidden text-slate-600 hover:text-slate-900">`);
      _push(ssrRenderComponent(unref(Menu), { class: "w-6 h-6" }, null, _parent));
      _push(`</button><div class="text-slate-600 font-medium hidden sm:block">Platform Administration</div></div><div class="flex items-center gap-4"><button class="relative w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">`);
      _push(ssrRenderComponent(unref(Bell), { class: "w-4 h-4" }, null, _parent));
      if (unref(unreadCount) > 0) {
        _push(`<span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">${ssrInterpolate(unref(unreadCount))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></header><div class="flex-1 p-4 md:p-8 overflow-x-hidden">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main>`);
      if (unref(showSignOutModal)) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"><div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div><div class="bg-white rounded-2xl w-full max-w-sm relative z-10 p-6 text-center border border-slate-100"><div class="w-12 h-12 rounded-full bg-danger-50 text-danger-600 flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(LogOut), { class: "w-6 h-6" }, null, _parent));
        _push(`</div><h3 class="text-lg font-bold text-slate-900 mb-2">Sign Out</h3><p class="text-slate-500 text-sm mb-6">Are you sure you want to end your session?</p><div class="flex gap-3"><button class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"> Cancel </button><button class="flex-1 px-4 py-2.5 rounded-xl bg-danger-600 text-white font-medium hover:bg-danger-700 transition-colors"> Yes, Sign out </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
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

export { _sfc_main as default };
//# sourceMappingURL=default-BeiLE4GY.mjs.map
