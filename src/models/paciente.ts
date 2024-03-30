export interface UserProps {
  id: string;
  name: string;
  surname: string;
  email: string;
  accessLevel: string;
}

export interface CreateUserProps {
  name: string;
  surname: string;
  email: string;
  accessLevel: EAccessLevel;
  password: string;
}

export interface UpdateUserProps {
  name: string;
  surname: string;
  email: string;
  accessLevel: EAccessLevel;
  isActive: boolean;
}

enum EAccessLevel {
  ADMIN = 1,
  COMMON = 2,
  GUEST = 3,
}
