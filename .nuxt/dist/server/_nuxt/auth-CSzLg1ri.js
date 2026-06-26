import { d as defineNuxtRouteMiddleware, n as navigateTo } from "../server.mjs";
import { u as useCookie } from "./cookie-IdT47JXv.js";
import "vue";
import "/Users/marquis/curatewithng/admin/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/marquis/curatewithng/admin/node_modules/hookable/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/unctx/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/marquis/curatewithng/admin/node_modules/defu/dist/defu.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/ufo/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/klona/dist/index.mjs";
import "vue/server-renderer";
import "lucide-vue-next";
import "/Users/marquis/curatewithng/admin/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/destr/dist/index.mjs";
import "/Users/marquis/curatewithng/admin/node_modules/ohash/dist/index.mjs";
const auth = defineNuxtRouteMiddleware((to) => {
  const user = useCookie("admin_user_data");
  if (!user.value && to.path !== "/auth/login") {
    return navigateTo("/auth/login");
  }
});
export {
  auth as default
};
//# sourceMappingURL=auth-CSzLg1ri.js.map
