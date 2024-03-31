import {CreateUserProps, UpdateUserProps} from '../../models/user';
import {api} from '../api';

export async function createUser(data: CreateUserProps) {
  const payload = {
    ...data,
  };
  return await api.post('user', {...payload});
}

export async function findManyUsers() {
  return api.get('user');
}

export async function updateUser(id: string, data: UpdateUserProps) {
  const payload = {
    ...data,
  };
  return await api.patch(`user/${id}`, {...payload});
}

export async function deleteUser(id: string) {
  return api.delete(`user/${id}`);
}
