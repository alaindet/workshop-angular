import { createReducer, on } from '@ngrx/store';

import { TEAMS_FEATURE_INITIAL_STATE } from './state';
import { teamsFetchActions } from './actions';
import { LoadingStatus } from '@app/common/types';

export const teamsReducer = createReducer(TEAMS_FEATURE_INITIAL_STATE,

  on(
    teamsFetchActions.fetchTeams,
    teamsFetchActions.forceFetchTeams,
    state => {
      const status = LoadingStatus.Loading;
      return { ...state, status };
    },
  ),

  on(teamsFetchActions.fetchTeamsCached, state => {
    const status = LoadingStatus.Idle;
    return { ...state, status };
  }),

  on(teamsFetchActions.fetchTeamsSuccess, (state, { teams }) => {
    const status = LoadingStatus.Idle;
    const lastUpdated = Date.now();
    return { ...state, status, teams, lastUpdated };
  }),

  on(teamsFetchActions.fetchTeamsError, (state, message) => {
    const status = LoadingStatus.Error;
    return { ...state, status };
  }),
);
