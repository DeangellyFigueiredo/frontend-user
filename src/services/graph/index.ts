import {api} from '../api';

export async function getGraphData() {
  return await api.get('user/graph');
}
