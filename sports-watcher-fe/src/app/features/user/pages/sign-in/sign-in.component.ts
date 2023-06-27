import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';

import { signInActions } from '../../store';
import { uiSetPageTitle } from '@app/core/store/ui';

const imports = [
  NgIf,
  ReactiveFormsModule,
];

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInPageComponent implements OnInit {

  private store = inject(Store);
  private formBuilder = inject(FormBuilder);

  loginForm!: FormGroup;

  ngOnInit() {
    this.store.dispatch(uiSetPageTitle({ title: 'Sign In - Sports Watcher' }));
    this.initForm();
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    const credentials = { email, password };
    this.store.dispatch(signInActions.signIn({ credentials }));
  }

  onSignInAsBasic() {
    const credentials = { email: 'basic@example.com', password: 'basic@example.com' };
    this.store.dispatch(signInActions.signIn({ credentials }));
  }

  onSignInAsAdmin() {
    const credentials = { email: 'admin@example.com', password: 'admin@example.com' };
    this.store.dispatch(signInActions.signIn({ credentials }));
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
