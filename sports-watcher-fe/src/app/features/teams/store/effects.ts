import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { createUiController } from '@app/core/store/ui';
import { TeamsService } from '../services';
import { teamCreateActions, teamDeleteActions, teamsFetchActions } from './actions';
import { selectTeamsShouldFetch } from './selectors';
import { matchesFetchActions } from '@app/features/matches/store';

@Injectable()
export class TeamsEffects {

  private actions = inject(Actions);
  private store = inject(Store);
  private teamsService = inject(TeamsService);
  private ui = createUiController(this.actions);

  fetchTeams$ = createEffect(() => this.actions.pipe(
    ofType(teamsFetchActions.fetchTeams),
    withLatestFrom(this.store.select(selectTeamsShouldFetch)),
    switchMap(([_, shouldFetch]) => {

      if (!shouldFetch) {
        return of(teamsFetchActions.fetchTeamsCached());
      }

      return this.teamsService.getAllTeams().pipe(
        map(({ data: teams, message }) => {
          return teamsFetchActions.fetchTeamsSuccess({ teams, message });
        }),
        catchError(({ message }) => {
          return of(teamsFetchActions.fetchTeamsError({ message }));
        }),
      );
    }),
  ));

  forceFetchTeams$ = createEffect(() => this.actions.pipe(
    ofType(teamsFetchActions.forceFetchTeams),
    switchMap(() => this.teamsService.getAllTeams().pipe(
      map(({ data: teams, message }) => {
        return teamsFetchActions.fetchTeamsSuccess({ teams, message });
      }),
      catchError(({ message }) => {
        return of(teamsFetchActions.fetchTeamsError({ message }));
      }),
    )),
  ));

  autoFetchTeamsAfterWrite$ = createEffect(() => this.actions.pipe(
    ofType(
      teamCreateActions.createTeamSuccess,
      teamDeleteActions.deleteTeamSuccess,
    ),
    switchMap(() => of(teamsFetchActions.forceFetchTeams())),
  ));

  autoFetchMatchesAfterWrite$ = createEffect(() => this.actions.pipe(
    ofType(
      teamCreateActions.createTeamSuccess,
      teamDeleteActions.deleteTeamSuccess,
    ),
    switchMap(() => of(matchesFetchActions.forceFetchMatches())),
  ));

  createTeam$ = createEffect(() => this.actions.pipe(
    ofType(teamCreateActions.createTeam),
    switchMap(({ team }) => this.teamsService.createTeam(team).pipe(
      map(({ data: team, message }) => {
        return teamCreateActions.createTeamSuccess({ team, message });
      }),
      catchError(({ message }) => of(teamCreateActions.createTeamError({ message }))),
    )),
  ));

  deleteTeam$ = createEffect(() => this.actions.pipe(
    ofType(teamDeleteActions.deleteTeam),
    switchMap(({ team }) => this.teamsService.deleteTeam(team.id).pipe(
      map(({ message }) => {
        return teamDeleteActions.deleteTeamSuccess({ team, message });
      }),
      catchError(({ message }) => {
        return of(teamDeleteActions.deleteTeamError({ message }));
      }),
    )),
  ));

  startLoader$ = this.ui.startLoaderOn(
    teamsFetchActions.fetchTeams,
    teamsFetchActions.forceFetchTeams,
    teamCreateActions.createTeam,
    teamDeleteActions.deleteTeam,
  );

  stopLoader$ = this.ui.stopLoaderOn(
    teamsFetchActions.fetchTeamsSuccess,
    teamsFetchActions.fetchTeamsCached,
    teamsFetchActions.fetchTeamsError,
    teamCreateActions.createTeamSuccess,
    teamCreateActions.createTeamError,
    teamDeleteActions.deleteTeamSuccess,
    teamDeleteActions.deleteTeamError,
  );

  showSuccess$ = this.ui.showSuccessOn(
    teamCreateActions.createTeamSuccess,
    teamDeleteActions.deleteTeamSuccess,
  );

  showError$ = this.ui.showErrorOn(
    teamsFetchActions.fetchTeamsError,
    teamCreateActions.createTeamError,
    teamDeleteActions.deleteTeamError,
  );
}

export const TEAMS_FEATURE_EFFECTS = [
  TeamsEffects,
];
