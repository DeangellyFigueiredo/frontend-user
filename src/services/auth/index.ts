import {Login} from '../../models/login';
import {api} from '../api';

export async function authToken(token: string) {
  const payload = {
    token: `${token}`,
  };
  return await api.post('auth/verify/token', payload);
}

export async function login(payload: Login) {
  return await api.post('auth/login', payload);
}
