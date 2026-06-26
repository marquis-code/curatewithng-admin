import axios, { type AxiosResponse } from "axios";
import { useUser } from "~/composables/modules/auth/user";
import { useCustomToast } from '~/composables/core/useCustomToast';
import { useRuntimeConfig } from '#imports';

const getBaseUrl = () => {
  try {
    const config = useRuntimeConfig();
    return config.public.apiBase;
  } catch {
    return import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
  }
}

const cleanBaseUrl = getBaseUrl().replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');
const $GATEWAY_ENDPOINT = `${cleanBaseUrl}`;

export const GATEWAY_ENDPOINT = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
  withCredentials: true,
});

export const GATEWAY_ENDPOINT_WITH_AUTH = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
  withCredentials: true,
});

export interface CustomAxiosResponse extends AxiosResponse {
  value?: any;
  type?: string;
}

const instanceArray = [
  GATEWAY_ENDPOINT,
  GATEWAY_ENDPOINT_WITH_AUTH,
];

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

instanceArray.forEach((instance) => {
  instance.interceptors.request.use((config: any) => {
    return config;
  });

  instance.interceptors.response.use(
    (response: CustomAxiosResponse) => {
      return response;
    },
    (err: any) => {
      let showToast = (opts: any) => {
        if (import.meta.client) alert(opts.message || "An error occurred");
      };
      let logOut = () => {
        if (import.meta.client) {
          document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = '/auth/login';
        }
      };

      try {
        const customToast = useCustomToast();
        showToast = (opts: any) => {
          try {
            customToast.showToast(opts);
          } catch (e) {
            if (import.meta.client) alert(opts.message || "An error occurred");
          }
        };
      } catch (e) {}

      try {
        const user = useUser();
        logOut = user.logOut;
      } catch (e) {}

      if (typeof err.response === "undefined") {
        showToast({
          title: "Error",
          message: "Kindly check your network connection",
          toastType: "error",
          duration: 3000
        });
        return Promise.reject({
          type: "ERROR",
          ...err
        });
      }
      
      const originalRequest = err.config;

      if (err.response.status === 401 && !originalRequest._retry) {
        if (originalRequest.url.includes('/auth/login') || originalRequest.url.includes('/auth/refresh')) {
          logOut();
          showToast({
            title: "Error",
            message: err?.response?.data?.message || err?.response?.data?.error || "Session expired",
            toastType: "error",
            duration: 3000
          });
          return Promise.reject({ type: "ERROR", ...err.response });
        }

        if (!isRefreshing) {
          isRefreshing = true;
          
          // Use the base GATEWAY_ENDPOINT to avoid infinite 401 loops
          GATEWAY_ENDPOINT.post('/auth/refresh')
            .then(() => {
              processQueue(null, 'refreshed');
            })
            .catch((refreshError) => {
              processQueue(refreshError, null);
              logOut();
              showToast({
                title: "Error",
                message: "Session expired, please log in again.",
                toastType: "error",
                duration: 3000
              });
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        originalRequest._retry = true;
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(instance(originalRequest)),
            reject: (err: any) => reject(err)
          });
        });
      } else if (statusCodeStartsWith(err.response.status, 4) || err.response.status === 500) {
        if (err.response.data?.message || err.response.data?.error) {
          showToast({
            title: "Error",
            message: err?.response?.data?.message || err?.response?.data?.error || "An error occurred",
            toastType: "error",
            duration: 3000
          });
        }
        return Promise.reject({
          type: "ERROR",
          ...err.response,
        });
      }
      return Promise.reject(err);
    }
  );
});

const statusCodeStartsWith = (
  statusCode: number,
  startNumber: number
): boolean => {
  return statusCode.toString().startsWith(startNumber.toString());
};
