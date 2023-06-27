import { createFeatureSelector, createSelector } from '@ngrx/store';

import { USER_FEATURE_NAME, UserFeatureState } from './state';
import { LoadingStatus } from '@app/common/types';
import { UserRole } from '../types';

const selectUserFeature = createFeatureSelector<UserFeatureState>(
  USER_FEATURE_NAME,
);

export const selectUser = createSelector(
  selectUserFeature,
  state => {
    const { email, role } = state;
    if (!email || !role) return null;
    return { email, role };
  },
);

export const selectUserIsLogged = createSelector(
  selectUserFeature,
  state => (
    state.email !== null &&
    state.role !== null &&
    state.token !== null &&
    state.status === LoadingStatus.Idle
  ),
);

export const selectUserToken = createSelector(
  selectUserFeature,
  state => state.token,
);

export const selectUserRole = createSelector(
  selectUserFeature,
  state => state.role ?? null,
);

export const selectUserIsBasic = createSelector(
  selectUserFeature,
  state => state.role === UserRole.Basic,
);

export const selectUserIsAdmin = createSelector(
  selectUserFeature,
  state => state.role === UserRole.Admin,
);
