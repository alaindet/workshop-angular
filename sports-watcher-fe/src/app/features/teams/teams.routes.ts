import { Routes } from '@angular/router';

import { TeamsPageComponent, TeamPageComponent } from './pages';

export const TEAMS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TeamsPageComponent,
    // providers: [
    //   provideState(TEAMS_FEATURE_NAME, teamsReducer),
    //   provideEffects(...TEAMS_FEATURE_EFFECTS),
    // ],
  },
  {
    path: ':id',
    component: TeamPageComponent,
  },
];
