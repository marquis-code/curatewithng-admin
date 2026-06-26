import axios from 'file:///Users/marquis/curatewithng/admin/node_modules/axios/index.js';
import { u as useUser } from './user-BM2pELKn.mjs';
import { a as useRuntimeConfig, u as useCustomToast } from './server.mjs';

const getBaseUrl = () => {
  try {
    const config = useRuntimeConfig();
    return config.public.apiBase;
  } catch {
    return "http://localhost:4000";
  }
};
const cleanBaseUrl = getBaseUrl().replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");
const $GATEWAY_ENDPOINT = `${cleanBaseUrl}`;
const GATEWAY_ENDPOINT = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
  withCredentials: true
});
const GATEWAY_ENDPOINT_WITH_AUTH = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
  withCredentials: true
});
const instanceArray = [
  GATEWAY_ENDPOINT,
  GATEWAY_ENDPOINT_WITH_AUTH
];
let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};
instanceArray.forEach((instance) => {
  instance.interceptors.request.use((config) => {
    return config;
  });
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      let showToast = (opts) => {
      };
      let logOut = () => {
      };
      try {
        const customToast = useCustomToast();
        showToast = (opts) => {
          try {
            customToast.showToast(opts);
          } catch (e) {
            if (false) ;
          }
        };
      } catch (e) {
      }
      try {
        const user = useUser();
        logOut = user.logOut;
      } catch (e) {
      }
      if (typeof err.response === "undefined") {
        showToast({
          title: "Error",
          message: "Kindly check your network connection",
          toastType: "error",
          duration: 3e3
        });
        return Promise.reject({
          type: "ERROR",
          ...err
        });
      }
      const originalRequest = err.config;
      if (err.response.status === 401 && !originalRequest._retry) {
        if (originalRequest.url.includes("/auth/login") || originalRequest.url.includes("/auth/refresh")) {
          logOut();
          showToast({
            title: "Error",
            message: ((_b = (_a = err == null ? void 0 : err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || ((_d = (_c = err == null ? void 0 : err.response) == null ? void 0 : _c.data) == null ? void 0 : _d.error) || "Session expired",
            toastType: "error",
            duration: 3e3
          });
          return Promise.reject({ type: "ERROR", ...err.response });
        }
        if (!isRefreshing) {
          isRefreshing = true;
          GATEWAY_ENDPOINT.post("/auth/refresh").then(() => {
            processQueue(null, "refreshed");
          }).catch((refreshError) => {
            processQueue(refreshError, null);
            logOut();
            showToast({
              title: "Error",
              message: "Session expired, please log in again.",
              toastType: "error",
              duration: 3e3
            });
          }).finally(() => {
            isRefreshing = false;
          });
        }
        originalRequest._retry = true;
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(instance(originalRequest)),
            reject: (err2) => reject(err2)
          });
        });
      } else if (statusCodeStartsWith(err.response.status, 4) || err.response.status === 500) {
        if (((_e = err.response.data) == null ? void 0 : _e.message) || ((_f = err.response.data) == null ? void 0 : _f.error)) {
          showToast({
            title: "Error",
            message: ((_h = (_g = err == null ? void 0 : err.response) == null ? void 0 : _g.data) == null ? void 0 : _h.message) || ((_j = (_i = err == null ? void 0 : err.response) == null ? void 0 : _i.data) == null ? void 0 : _j.error) || "An error occurred",
            toastType: "error",
            duration: 3e3
          });
        }
        return Promise.reject({
          type: "ERROR",
          ...err.response
        });
      }
      return Promise.reject(err);
    }
  );
});
const statusCodeStartsWith = (statusCode, startNumber) => {
  return statusCode.toString().startsWith(startNumber.toString());
};

export { GATEWAY_ENDPOINT_WITH_AUTH as G, GATEWAY_ENDPOINT as a };
//# sourceMappingURL=axios.config-DHAaROs1.mjs.map
