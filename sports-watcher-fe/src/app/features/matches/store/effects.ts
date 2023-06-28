import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { createUiController } from '@app/core/store/ui';
import { MatchesService } from '../services';
import { matchCreateActions, matchDeleteActions, matchesFetchActions } from './actions';
import { selectMatchesShouldFetch } from './selectors';

@Injectable()
export class MatchesEffects {

  private actions = inject(Actions);
  private store = inject(Store);
  private matchesService = inject(MatchesService);
  private ui = createUiController(this.actions);

  fetchMatches$ = createEffect(() => this.actions.pipe(
    ofType(matchesFetchActions.fetchMatches),
    withLatestFrom(this.store.select(selectMatchesShouldFetch)),
    switchMap(([_, shouldFetch]) => {

      if (!shouldFetch) {
        return of(matchesFetchActions.fetchMatchesCached());
      }

      return this.matchesService.getAllMatches().pipe(
        map(({ data: matches, message}) => {
          return matchesFetchActions.fetchMatchesSuccess({ matches, message });
        }),
        catchError(({ message }) => {
          return of(matchesFetchActions.fetchMatchesError({ message }));
        }),
      );
    }),
  ));

  forceFetchMatches$ = createEffect(() => this.actions.pipe(
    ofType(matchesFetchActions.forceFetchMatches),
    switchMap(() => this.matchesService.getAllMatches().pipe(
      map(({ data: matches, message }) => {
        return matchesFetchActions.fetchMatchesSuccess({ matches, message });
      }),
      catchError(({ message }) => {
        return of(matchesFetchActions.fetchMatchesError({ message }));
      }),
    )),
  ));

  autoFetchMatchesAfterWrite$ = createEffect(() => this.actions.pipe(
    ofType(
      matchCreateActions.createMatchSuccess,
      matchDeleteActions.deleteMatchSuccess,
    ),
    switchMap(() => of(matchesFetchActions.forceFetchMatches())),
  ));

  createMatch$ = createEffect(() => this.actions.pipe(
    ofType(matchCreateActions.createMatch),
    switchMap(({ dto }) => this.matchesService.createMatch(dto).pipe(
      map(({ data: match, message }) => {
        return matchCreateActions.createMatchSuccess({ match, message });
      }),
      catchError(({ message }) => {
        return of(matchCreateActions.createMatchError({ message }));
      }),
    )),
  ));

  deleteMatch$ = createEffect(() => this.actions.pipe(
    ofType(matchDeleteActions.deleteMatch),
    switchMap(({ match }) => this.matchesService.deleteMatch(match.id).pipe(
      map(({ message }) => {
        return matchDeleteActions.deleteMatchSuccess({ match, message });
      }),
      catchError(({ message }) => {
        return of(matchDeleteActions.deleteMatchError({ message }));
      }),
    )),
  ));

  startLoader$ = this.ui.startLoaderOn(
    matchesFetchActions.fetchMatches,
    matchesFetchActions.forceFetchMatches,
    matchCreateActions.createMatch,
    matchDeleteActions.deleteMatch,
  );

  stopLoader$ = this.ui.stopLoaderOn(
    matchesFetchActions.fetchMatchesSuccess,
    matchesFetchActions.fetchMatchesCached,
    matchesFetchActions.fetchMatchesError,
    matchCreateActions.createMatchSuccess,
    matchCreateActions.createMatchError,
    matchDeleteActions.deleteMatchSuccess,
    matchDeleteActions.deleteMatchError,
  );

  showSuccess$ = this.ui.showSuccessOn(
    matchCreateActions.createMatchSuccess,
    matchDeleteActions.deleteMatchSuccess,
  );

  showError$ = this.ui.showErrorOn(
    matchesFetchActions.fetchMatchesError,
    matchCreateActions.createMatchError,
    matchDeleteActions.deleteMatchError,
  );
}

export const MATCHES_FEATURE_EFFECTS = [
  MatchesEffects,
];
