import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { uiSetPageTitle } from '@app/core/store/ui';
import { matchesFetchActions, selectMatchesIsLoaded, selectMatchesRankings } from '@app/features/matches/store';
import { teamsFetchActions } from '@app/features/teams/store';

const imports = [
  NgIf,
  NgFor,
];

@Component({
  selector: 'app-rankings-page',
  standalone: true,
  imports,
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss'],
})
export class RankingsPageComponent implements OnInit {

  private store = inject(Store);

  loaded = this.store.selectSignal(selectMatchesIsLoaded);
  rankings = this.store.selectSignal(selectMatchesRankings);

  ngOnInit() {
    this.store.dispatch(teamsFetchActions.fetchTeams());
    this.store.dispatch(matchesFetchActions.fetchMatches());
    this.store.dispatch(uiSetPageTitle({ title: 'Rankings - Sports Watcher' }));
  }
}
