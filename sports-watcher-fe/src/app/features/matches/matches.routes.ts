import { Routes } from '@angular/router';

import { MatchesPageComponent } from './pages';

export const MATCHES_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MatchesPageComponent,
    // providers: [
    //   provideState(MATCHES_FEATURE_NAME, teamsReducer),
    //   provideEffects(...MATCHES_FEATURE_EFFECTS),
    // ],
  },
];
