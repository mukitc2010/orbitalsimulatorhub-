import api from '../../api/astrobot/chat';
import { runApi } from '../adapter';
export const handler = (event: { httpMethod: string; body: string | null }) => {
  if (!process.env.ASTROBOT_PROVIDER && !process.env.OPENAI_API_KEY) process.env.ASTROBOT_PROVIDER = 'fallback';
  return runApi(api, event);
};

