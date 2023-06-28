import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectUserToken } from '@app/features/user/store';

export function jwtInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {

  const store = inject(Store);

  return store.select(selectUserToken).pipe(switchMap(token => {

    if (!token) {
      return next(request);
    }

    const requestWithJwt = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(requestWithJwt);
  }));
}
