import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UI_FEATURE_NAME, UiFeatureState } from './state';

const selectUiFeature = createFeatureSelector<UiFeatureState>(UI_FEATURE_NAME);

export const selectUiNotification = createSelector(
  selectUiFeature,
  state => state.notification,
);

export const selectUiNotificationTimeout = createSelector(
  selectUiFeature,
  state => state.notificationTimeout,
);

export const selectUiIsLoading = createSelector(
  selectUiFeature,
  state => state.loading,
);

export const selectUiTitle = createSelector(
  selectUiFeature,
  state => state.title,
);
