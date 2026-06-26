import { GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const user_api = {
  getUsers: () => GATEWAY_ENDPOINT_WITH_AUTH.get('/users'),
  getStats: () => GATEWAY_ENDPOINT_WITH_AUTH.get('/users/stats'),
  toggleActive: (id: string) => GATEWAY_ENDPOINT_WITH_AUTH.patch(`/users/${id}/toggle-active`),
};
