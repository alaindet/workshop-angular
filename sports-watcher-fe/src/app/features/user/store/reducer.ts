import { createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@app/common/types';
import { USER_FEATURE_INITIAL_STATE } from './state';
import { signInActions } from './actions';

export const userReducer = createReducer(USER_FEATURE_INITIAL_STATE,

  on(signInActions.signIn, state => {
    const status = LoadingStatus.Loading;
    return { ...state, status };
  }),

  on(
    signInActions.signInSuccess,
    signInActions.autoSignInSuccess,
    (state, { user }) => {
      const newState = { ...state };
      newState.status = LoadingStatus.Idle;
      newState.email = user.email;
      newState.role = user.role;
      newState.token = user.token;
      return newState;
    },
  ),

  on(signInActions.signInError, state => {
    const newState = { ...state };
    newState.status = LoadingStatus.Error;
    newState.email = null;
    newState.role = null;
    newState.token = null;
    return newState;
  }),

  on(signInActions.signOut, state => {
    const newState = { ...state };
    newState.status = LoadingStatus.Idle;
    newState.email = null;
    newState.role = null;
    newState.token = null;
    return newState;
  }),
);
