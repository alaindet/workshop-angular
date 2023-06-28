import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';

import { selectTeams, selectTeamsIsLoaded, teamCreateActions, teamsFetchActions } from '../../store';
import { selectUserIsAdmin } from '@app/features/user/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { uiSetPageTitle } from '@app/core/store/ui';

const imports = [
  NgIf,
  NgFor,
  RouterLink,
  ReactiveFormsModule,
];

@Component({
  selector: 'app-teams-page',
  standalone: true,
  imports,
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsPageComponent implements OnInit {

  private store = inject(Store);
  private formBuilder = inject(FormBuilder);

  loaded = this.store.selectSignal(selectTeamsIsLoaded);
  teams = this.store.selectSignal(selectTeams);
  isAdmin = this.store.selectSignal(selectUserIsAdmin);

  teamForm!: FormGroup;

  ngOnInit() {
    this.store.dispatch(teamsFetchActions.fetchTeams());
    this.store.dispatch(uiSetPageTitle({ title: 'Teams - Sports Watcher' }));
    this.initForm();
  }

  onCreateTeam() {

    if (this.teamForm.invalid) {
      return;
    }

    const { id, name } = this.teamForm.value;
    const team = { id, name };
    this.store.dispatch(teamCreateActions.createTeam({ team }));
  }

  private initForm(): void {
    const { required, minLength, maxLength } = Validators;
    this.teamForm = this.formBuilder.group({
      id: ['', [required, minLength(5), maxLength(25)]],
      name: ['', [required, minLength(5), maxLength(25)]],
    });
  }
}
