import api from '../../api/asi-agent';
import { runApi } from './adapter';
export const handler = (event: { httpMethod: string; body: string | null }) => runApi(api, event);
