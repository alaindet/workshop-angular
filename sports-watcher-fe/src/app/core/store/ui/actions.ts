import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';

import { Notification } from '@app/common/types';

export const uiNotificationsActions = createActionGroup({
  source: 'UI/Notifications',
  events: {
    'Add success': props<{ message: Notification['message'] }>(),
    'Add error': props<{ message: Notification['message'] }>(),
    'Dismiss': emptyProps(),
  },
});

export const uiLoaderActions = createActionGroup({
  source: 'UI/Loader',
  events: {
    'Start': emptyProps(),
    'Stop': emptyProps(),
  },
});

export const uiSetPageTitle = createAction(
  '[UI] Set page title',
  props<{ title: string }>(),
);
