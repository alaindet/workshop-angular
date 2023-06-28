import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { selectUserIsLogged } from '@app/features/user/store';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

export function isLoggedGuard() {

  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectUserIsLogged).pipe(tap(isLogged => {
    if (!isLogged) {
      router.navigate(['/signin']);
    }
  }));
}
