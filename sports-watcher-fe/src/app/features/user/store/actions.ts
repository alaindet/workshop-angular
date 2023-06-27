import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User, UserCredentials } from '../types';

export const signInActions = createActionGroup({
  source: 'User',
  events: {
    'Auto sign in': emptyProps(),
    'Auto sign in success': props<{ user: User }>(),
    'Sign in': props<{ credentials: UserCredentials }>(),
    'Sign in success': props<{ user: User, message: string }>(),
    'Sign in error': props<{ message: string }>(),
    'Sign out': props<{ message: string }>(),
  },
});

export const storageActions = createActionGroup({
  source: 'User',
  events: {
    'Store user': props<{ user: User }>(),
    'Fetch user': emptyProps(),
  },
});
