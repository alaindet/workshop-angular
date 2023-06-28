import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { DataResponse } from '@app/common/types';
import { environment } from '@app/environment';
import { Team } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {

  private http = inject(HttpClient);

  getAllTeams(): Observable<DataResponse<Team[]>> {
    const url = `${environment.apiUrl}/teams`;
    return this.http.get<DataResponse<Team[]>>(url);
  }

  createTeam(team: Team): Observable<DataResponse<Team>> {
    const url = `${environment.apiUrl}/teams`;
    return this.http.post<DataResponse<Team>>(url, team);
  }

  deleteTeam(teamId: Team['id']): Observable<{ message: string }> {
    const url = `${environment.apiUrl}/teams/${teamId}`;
    return this.http.delete<{ message: string }>(url);
  }
}
