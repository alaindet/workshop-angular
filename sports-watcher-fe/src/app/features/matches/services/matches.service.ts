import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { DataResponse } from '@app/common/types';
import { environment } from '@app/environment';
import { CreateMatchDto, Match } from '../types';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {

  private http = inject(HttpClient);

  getAllMatches(): Observable<DataResponse<Match[]>> {
    const url = `${environment.apiUrl}/matches`;
    return this.http.get<DataResponse<Match[]>>(url);
  }

  createMatch(dto: CreateMatchDto): Observable<DataResponse<Match>> {
    const url = `${environment.apiUrl}/matches`;
    return this.http.post<DataResponse<Match>>(url, dto);
  }

  deleteMatch(matchId: Match['id']): Observable<{ message: string }> {
    const url = `${environment.apiUrl}/matches/${matchId}`;
    return this.http.delete<{ message: string }>(url);
  }
}
