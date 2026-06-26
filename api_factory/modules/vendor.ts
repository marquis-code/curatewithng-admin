import { GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const vendor_api = {
  getVendors: () => GATEWAY_ENDPOINT_WITH_AUTH.get('/vendors'),
  getStats: () => GATEWAY_ENDPOINT_WITH_AUTH.get('/vendors/stats'),
  approve: (id: string) => GATEWAY_ENDPOINT_WITH_AUTH.post(`/vendors/${id}/approve`),
  reject: (id: string) => GATEWAY_ENDPOINT_WITH_AUTH.post(`/vendors/${id}/reject`),
  updateStatus: (id: string, payload: any) => GATEWAY_ENDPOINT_WITH_AUTH.patch(`/vendors/${id}/status`, payload),
};
