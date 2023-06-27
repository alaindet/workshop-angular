import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { jwtInterceptor } from '@app/core/interceptors';
import { APP_ROUTES } from './app.routes';
import { NGRX_PROVIDERS } from './core/config/ngrx';

const CORE_PROVIDERS = [
  provideRouter(APP_ROUTES),
  provideHttpClient(
    withInterceptors([jwtInterceptor]),
  ),
];

export const appConfig: ApplicationConfig = {
  providers: [
    ...CORE_PROVIDERS,
    ...NGRX_PROVIDERS,
  ]
};
