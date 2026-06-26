import { GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const auth_api = {
  login: (payload: any) => {
    return GATEWAY_ENDPOINT.post('/auth/login', payload);
  },

  verifyAdminOtp: (payload: { email: string, otp: string }) => {
    return GATEWAY_ENDPOINT.post('/auth/verify-admin-otp', payload);
  },

  getProfile: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/users/me');
  },
};
