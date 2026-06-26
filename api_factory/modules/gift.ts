import { GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const gift_api = {
  getGifts: () => GATEWAY_ENDPOINT_WITH_AUTH.get('/gifts'),
  approve: (id: string) => GATEWAY_ENDPOINT_WITH_AUTH.post(`/gifts/${id}/approve`),
  feature: (id: string) => GATEWAY_ENDPOINT_WITH_AUTH.post(`/gifts/${id}/feature`),
  delete: (id: string) => GATEWAY_ENDPOINT_WITH_AUTH.delete(`/gifts/${id}`),
};
