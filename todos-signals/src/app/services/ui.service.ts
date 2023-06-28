import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {

  notification = signal<string | null>(null);
  #timer?: ReturnType<typeof setTimeout>;

  addNotification(notif: string) {
    if (this.#timer) clearTimeout(this.#timer);
    this.notification.set(notif);
    this.#timer = setTimeout(() => this.clearNotification(), 3000);
  }

  clearNotification() {
    this.notification.set(null);
  }
}
