import { sign } from 'jsonwebtoken';

import { loadDatabaseTable } from '../../common/utils';
import { User } from '../../types';

export class UsersService {

  static #instance: UsersService;
  #users!: User[]; // The "database"

  constructor() {
    this.#users = loadDatabaseTable<User>('users');
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new UsersService();
      // TODO: Prevent constructor?
    }
    return this.#instance;
  }

  signIn(email: string, password: string) {

    const user = this.#users.find(u => u.email === email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // TODO: Add hashing please?
    if (user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const jwt = this.#generateAccessToken(user.email, user.role);

    return { jwt, user };
  }

  #generateAccessToken(email: string, role: string) {
    const payload = { email, role };
    const secret = process.env.SPORTS_WATCHER_JWT_SECRET ?? 'the-secret';
    const options = { expiresIn: '86400s' };
    return sign(payload, secret, options);
  }
}
