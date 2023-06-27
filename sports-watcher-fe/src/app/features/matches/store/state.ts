import { LoadingStatus } from '@app/common/types';
import { Match } from '../types';

export type MatchesFeatureState = {
  matches: Match[] | null;
  status: LoadingStatus;
  lastUpdated: number | null;
};

export const MATCHES_FEATURE_NAME = 'matches';

export const MATCHES_FEATURE_INITIAL_STATE: MatchesFeatureState = {
  matches: null,
  status: LoadingStatus.Pristine,
  lastUpdated: null,
};
