import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TEAMS_FEATURE_NAME, TeamsFeatureState } from './state';
import { LoadingStatus } from '@app/common/types';
import { CACHE_MAX_AGE } from '@app/core/constants';
import { ascendingByKey } from '@app/common/utils';
import { Team } from '../types';

export const selectTeamsFeature = createFeatureSelector<TeamsFeatureState>(
  TEAMS_FEATURE_NAME,
);

export const selectTeamsStatus = createSelector(
  selectTeamsFeature,
  state => state.status,
);

export const selectTeamsIsLoading = createSelector(
  selectTeamsFeature,
  state => state.status === LoadingStatus.Loading,
);

export const selectTeamsIsLoaded = createSelector(
  selectTeamsFeature,
  state => state.status === LoadingStatus.Idle,
);

export const selectTeamsInErrorStatus = createSelector(
  selectTeamsFeature,
  state => state.status === LoadingStatus.Error,
);

export const selectTeamsShouldFetch = createSelector(
  selectTeamsFeature,
  state => {

    if (state.status === LoadingStatus.Pristine) {
      return true;
    }

    if (state.lastUpdated === null) {
      return true;
    }

    if (Date.now() - state.lastUpdated > CACHE_MAX_AGE) {
      return true;
    }

    if (!state.teams) {
      return true;
    }

    if (!state.teams.length) {
      return true;
    }

    return false;
  },
);

export const selectTeams = createSelector(
  selectTeamsFeature,
  state => [...state.teams ?? []].sort(ascendingByKey('name')),
);

export const selectTeam = (teamId: string) => createSelector(
  selectTeamsFeature,
  state => state.teams!.find(t => t.id === teamId)!,
);

export const selectTeamsMap = createSelector(
  selectTeamsFeature,
  state => {
    if (!state.teams) return null;
    const teams = [...state.teams ?? []];
    const teamsMap: { [teamId: Team['id']]: Team } = {};
    teams.forEach(t => teamsMap[t.id] = t);
    return teamsMap;
  },
);
