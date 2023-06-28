export type UserRole = 'basic' | 'admin';

export type User = {
  email: string;
  password: string;
  role: UserRole;
};
