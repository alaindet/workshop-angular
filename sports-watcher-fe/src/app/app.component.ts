import { Component, OnInit, computed, inject } from '@angular/core';
import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectUiIsLoading, selectUiNotification, uiNotificationsActions } from '@app/core/store/ui';
import { LinearSpinnerComponent } from '@app/common/components';
import { NotificationType } from '@app/common/types';
import { signInActions } from '@app/features/user/store';

const imports = [
  NgIf,
  NgClass,
  RouterOutlet,
  JsonPipe,
  LinearSpinnerComponent,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  private store = inject(Store);
  notification = this.store.selectSignal(selectUiNotification);
  notificationCssClass = computed(() => {
    switch (this.notification()?.type) {
      case NotificationType.Success: return 'alert-success';
      case NotificationType.Error: return 'alert-danger';
      default: return '';
    }
  });
  loading = false;

  ngOnInit() {
    this.store.dispatch(signInActions.autoSignIn());
    this.listenToLoadingState();
  }

  onDismissAlert() {
    this.store.dispatch(uiNotificationsActions.dismiss());
  }

  private listenToLoadingState(): void {
    // This guarantees no NG0100 error happens
    // "Expression has changed after it was checked"
    this.store.select(selectUiIsLoading).subscribe(loading => {
      queueMicrotask(() => this.loading = loading)
    });
  }
}
