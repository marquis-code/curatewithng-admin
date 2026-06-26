import { GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const order_api = {
  getOrders: () => GATEWAY_ENDPOINT_WITH_AUTH.get('/orders'),
  getStats: () => GATEWAY_ENDPOINT_WITH_AUTH.get('/orders/stats'),
  updateStatus: (id: string, payload: any) => GATEWAY_ENDPOINT_WITH_AUTH.patch(`/orders/${id}/status`, payload),
};
