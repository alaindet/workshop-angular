import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CreateMatchDto, Match } from '../types';

export const matchesFetchActions = createActionGroup({
  source: 'Matches',
  events: {
    'Fetch matches': emptyProps(),
    'Fetch matches cached': emptyProps(),
    'Force fetch matches': emptyProps(),
    'Fetch matches success': props<{ matches: Match[], message: string }>(),
    'Fetch matches error': props<{ message: string }>(),
  },
});

export const matchCreateActions = createActionGroup({
  source: 'Matches',
  events: {
    'Create match': props<{ dto: CreateMatchDto }>(),
    'Create match success': props<{ match: Match, message: string }>(),
    'Create match error': props<{ message: string }>(),
  },
});

export const matchDeleteActions = createActionGroup({
  source: 'Matches',
  events: {
    'Delete match': props<{ match: Match }>(),
    'Delete match success': props<{ match: Match, message: string }>(),
    'Delete match error': props<{ message: string }>(),
  },
});
