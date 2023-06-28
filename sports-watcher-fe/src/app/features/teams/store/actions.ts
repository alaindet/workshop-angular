import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Team } from '../types';

export const teamsFetchActions = createActionGroup({
  source: 'Teams',
  events: {
    'Fetch teams': emptyProps(),
    'Fetch teams cached': emptyProps(),
    'Force fetch teams': emptyProps(),
    'Fetch teams success': props<{ teams: Team[], message: string }>(),
    'Fetch teams error': props<{ message: string }>(),
  },
});

export const teamCreateActions = createActionGroup({
  source: 'Teams',
  events: {
    'Create team': props<{ team: Team }>(),
    'Create team success': props<{ team: Team, message: string }>(),
    'Create team error': props<{ message: string }>(),
  },
});

export const teamDeleteActions = createActionGroup({
  source: 'Teams',
  events: {
    'Delete team': props<{ team: Team }>(),
    'Delete team success': props<{ team: Team, message: string }>(),
    'Delete team error': props<{ message: string }>(),
  },
});
