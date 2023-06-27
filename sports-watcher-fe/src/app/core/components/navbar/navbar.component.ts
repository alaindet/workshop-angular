import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';

import { signInActions } from '@app/features/user/store';

const imports = [
  NgIf,
  RouterLink,
  RouterLinkActive,
];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  private store = inject(Store);

  onSignOut() {
    const message = 'You signed out';
    this.store.dispatch(signInActions.signOut({ message }));
  }
}
