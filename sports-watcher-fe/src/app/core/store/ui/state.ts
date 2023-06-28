import { Notification } from '@app/common/types';

export type UiFeatureState = {
  notification: Notification | null,
  notificationTimeout: number;
  loading: boolean;
  title: string;
};

export const UI_FEATURE_NAME = 'ui';

export const UI_FEATURE_INITIAL_STATE: UiFeatureState = {
  notification: null,
  notificationTimeout: 5000,
  loading: false,
  title: 'Sports Watcher App',
};
