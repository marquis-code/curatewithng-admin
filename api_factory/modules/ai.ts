import { GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const ai_api = {
  getSessions: () => GATEWAY_ENDPOINT_WITH_AUTH.get('/ai-curator/sessions/all'),
  getStats: () => GATEWAY_ENDPOINT_WITH_AUTH.get('/ai-curator/stats'),
};
