import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User, UserCredentials } from '../types';
import { DataResponse } from '@app/common/types';
import { environment } from '@app/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private http = inject(HttpClient);
  private storageKey = 'sports_watcher.user';

  signIn(credentials: UserCredentials): Observable<DataResponse<User>> {
    const url = `${environment.apiUrl}/users/signin`;
    return this.http.post<DataResponse<User>>(url, credentials);
  }

  fetchFromStorage(): User | null {
    const serializedUser = window.localStorage.getItem(this.storageKey);
    return serializedUser ? JSON.parse(serializedUser) : null;
  }

  saveToStorage(user: User | null) {
    const serializedUser = user ? JSON.stringify(user) : '';
    window.localStorage.setItem(this.storageKey, serializedUser);
  }

  clearStorage() {
    window.localStorage.removeItem(this.storageKey);
  }
}
