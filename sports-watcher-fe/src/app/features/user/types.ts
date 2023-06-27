export type UserCredentials = {
  email: string;
  password: string;
};

export enum UserRole {
  Basic = 'basic',
  Admin = 'admin',
}

export type User = {
  email: string;
  role: UserRole;
  token: string;
};
