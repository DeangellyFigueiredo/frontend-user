import axios from 'axios';
import Cookies from 'universal-cookie';

export const api = axios.create({
  baseURL: import.meta.env.VITE_PORT_PROJECT_BACKEND,
});

export async function validation() {
  const cookie = new Cookies();
  const Token = await cookie.get('@frontend-user');
  api.defaults.headers.common['Authorization'] = `Bearer ${Token}`;
}
