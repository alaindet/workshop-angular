import { Routes } from '@angular/router';

import { LoggedLayoutComponent } from '@app/core/layouts';
import { isLoggedGuard } from '@app/core/guards';
import { SignInPageComponent } from './features/user/pages/sign-in/sign-in.component';

const DEFAULT_ROUTE = '/teams';

let routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: DEFAULT_ROUTE,
  },
  {
    path: '',
    component: LoggedLayoutComponent,
    canActivate: [isLoggedGuard],
    children: [
      {
        path: 'matches',
        loadChildren: () => import('@app/features/matches'),
      },
      {
        path: 'rankings',
        loadComponent: () => import('@app/features/rankings'),
      },
      {
        path: 'teams',
        loadChildren: () => import('@app/features/teams'),
      },
    ],
  },
  {
    path: 'signin',
    component: SignInPageComponent,
  },
  {
    path: '**',
    redirectTo: DEFAULT_ROUTE,
  },
];

export const APP_ROUTES = routes;
