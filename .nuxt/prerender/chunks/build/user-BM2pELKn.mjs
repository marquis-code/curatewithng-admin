import { u as useCookie } from './cookie-IdT47JXv.mjs';

const useUser = () => {
  const user = useCookie("admin_user_data", { default: () => null });
  const token = useCookie("admin_token", { default: () => null });
  const logOut = () => {
    user.value = null;
    token.value = null;
  };
  const setUser = (userData, userToken) => {
    user.value = userData;
    if (userToken) {
      token.value = userToken;
    }
  };
  return { user, token, logOut, setUser };
};

export { useUser as u };
//# sourceMappingURL=user-BM2pELKn.mjs.map
