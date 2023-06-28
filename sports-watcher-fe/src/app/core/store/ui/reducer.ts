import { createReducer, on } from '@ngrx/store';

import { NotificationType } from '@app/common/types';
import { UI_FEATURE_INITIAL_STATE } from './state';
import { uiNotificationsActions, uiLoaderActions, uiSetPageTitle } from './actions';

export const uiReducer = createReducer(
  UI_FEATURE_INITIAL_STATE,

  on(uiNotificationsActions.addSuccess, (state, { message }) => {
    const id = Date.now() + Math.random();
    const notification = { id, type: NotificationType.Success, message };
    return { ...state, notification };
  }),

  on(uiNotificationsActions.addError, (state, { message }) => {
    const id = Date.now() + Math.random();
    const notification = { id, type: NotificationType.Error, message };
    return { ...state, notification };
  }),

  on(uiNotificationsActions.dismiss, state => {
    return { ...state, notification: null };
  }),

  on(uiLoaderActions.start, state => {
    return { ...state, loading: true };
  }),

  on(uiLoaderActions.stop, state => {
    return { ...state, loading: false };
  }),

  on(uiSetPageTitle, (state, { title }) => {
    return { ...state, title: title };
  }),
);
