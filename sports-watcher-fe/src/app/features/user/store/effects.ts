import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

import { createUiController } from '@app/core/store/ui';
import { UserService } from '../services';
import { signInActions } from './actions';

@Injectable()
export class UserEffects {

  private actions = inject(Actions);
  private router = inject(Router);
  private userService = inject(UserService);
  private ui = createUiController(this.actions);

  autoSignIn$ = createEffect(() => this.actions.pipe(
    ofType(signInActions.autoSignIn),
    switchMap(() => {
      const user = this.userService.fetchFromStorage();
      if (!user) return EMPTY;
      return of(signInActions.autoSignInSuccess({ user: user! }));
    }),
  ));

  signIn$ = createEffect(() => this.actions.pipe(
    ofType(signInActions.signIn),
    switchMap(({ credentials }) => this.userService.signIn(credentials).pipe(
      map(({ data: user, message }) => {

        // TODO: Remove
        console.log('Trying to sign in...');

        return signInActions.signInSuccess({ user, message });
      }),
      catchError(err => {
        return of(signInActions.signInError({ message: err.error.message }));
      })),
    )),
  );

  onSignIn$ = createEffect(() => this.actions.pipe(
    ofType(signInActions.signInSuccess),
    tap(({ user }) => this.userService.saveToStorage(user)),
    tap(() => this.router.navigate(['/'])),
  ), { dispatch: false });

  onSignOut$ = createEffect(() => this.actions.pipe(
    ofType(signInActions.signOut),
    tap(() => this.userService.clearStorage()),
    tap(() => this.router.navigate(['/signin'])),
  ), { dispatch: false });

  startLoader$ = this.ui.startLoaderOn(
    signInActions.signIn,
  );

  stopLoader$ = this.ui.stopLoaderOn(
    signInActions.signInSuccess,
    signInActions.signInError,
  );

  showSuccess$ = this.ui.showSuccessOn(
    signInActions.signInSuccess,
  );

  showError$ = this.ui.showErrorOn(
    signInActions.signInError,
  );
}

export const USER_FEATURE_EFFECTS = [
  UserEffects,
];
