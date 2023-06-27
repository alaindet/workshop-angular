import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Title } from '@angular/platform-browser';
import { filter, map, switchMap, tap, timer, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectUiNotification, selectUiNotificationTimeout } from './selectors';
import { uiNotificationsActions, uiSetPageTitle } from './actions';

@Injectable()
export class UiNotificationsEffects {

  private store = inject(Store);
  private actions = inject(Actions);
  private title = inject(Title);

  notificationAutoDismiss$ = createEffect(() => this.actions.pipe(
    ofType(
      uiNotificationsActions.addSuccess,
      uiNotificationsActions.addError,
      uiNotificationsActions.dismiss,
    ),
    withLatestFrom(this.store.select(selectUiNotification)),
    filter(([action, exists]) => !!exists),
    withLatestFrom(this.store.select(selectUiNotificationTimeout)),
    switchMap(([[action, exists], timeout]) => timer(timeout)), // <-- Wait here
    withLatestFrom(this.store.select(selectUiNotification)),
    filter(([action, exists]) => !!exists),
    map(() => uiNotificationsActions.dismiss()),
  ));

  pageTitle$ = createEffect(() => this.actions.pipe(
    ofType(uiSetPageTitle),
    tap(action => this.title.setTitle(action.title)),
  ), { dispatch: false });
}

export const UI_FEATURE_EFFECTS = [
  UiNotificationsEffects,
];
