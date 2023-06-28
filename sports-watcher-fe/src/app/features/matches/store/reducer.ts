import { createReducer, on } from '@ngrx/store';

import { MATCHES_FEATURE_INITIAL_STATE } from './state';
import { matchesFetchActions } from './actions';
import { LoadingStatus } from '@app/common/types';

export const matchesReducer = createReducer(MATCHES_FEATURE_INITIAL_STATE,

  on(
    matchesFetchActions.fetchMatches,
    matchesFetchActions.forceFetchMatches,
    state => {
      const status = LoadingStatus.Loading;
      return { ...state, status };
    },
  ),

  on(matchesFetchActions.fetchMatchesCached, state => {
    const status = LoadingStatus.Idle;
    return { ...state, status };
  }),

  on(matchesFetchActions.fetchMatchesSuccess, (state, { matches }) => {
    const status = LoadingStatus.Idle;
    const lastUpdated = Date.now();
    return { ...state, status, matches, lastUpdated };
  }),

  on(matchesFetchActions.fetchMatchesError, (state, message) => {
    const status = LoadingStatus.Error;
    return { ...state, status };
  }),
);
