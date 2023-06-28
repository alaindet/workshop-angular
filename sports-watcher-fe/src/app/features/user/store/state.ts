import { LoadingStatus } from '@app/common/types';
import { UserRole } from '../types';

export type UserFeatureState = {
  email: string | null;
  role: UserRole | null;
  token: string | null;
  status: LoadingStatus;
};

export const USER_FEATURE_NAME = 'user';

export const USER_FEATURE_INITIAL_STATE: UserFeatureState = {
  email: null,
  role: null,
  token: null,
  status: LoadingStatus.Pristine,
};
