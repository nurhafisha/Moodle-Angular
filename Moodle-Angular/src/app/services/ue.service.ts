import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from '../backend_urls';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UeService {
  constructor(private http: HttpClient) {}

  getUeData(ueId: string | null): Observable<any> {
    return this.http
      .get<any>(apiUrls.ue + `${ueId}`, { withCredentials: true })
      .pipe(
        map((res) => res.data),
        catchError((err) => {
          console.error('Failed to fetch UE data:', err);
          return of(null);
        })
      );
  }

  getUserData(): Observable<Map<string, string>> {
    return this.http.get<any>(apiUrls.user, { withCredentials: true }).pipe(
      map((res) => {
        const usersMap = new Map<string, string>();
        for (const user of res.data) {
          const id = user._id?.$oid || user._id;
          usersMap.set(id, `${user.prenom} ${user.nom}`);
        }
        return usersMap;
      }),
      catchError((err) => {
        console.error('Erreur lors du chargement des utilisateurs :', err);
        throw err;
      })
    );
  }

  getAllUes(): Observable<any[]> {
    return this.http.get<any>(apiUrls.ue, { withCredentials: true }).pipe(
      map((res) => res.data),
      catchError((err) => {
        console.error('Failed to fetch UEs:', err);
        return of([]);
      })
    );
  }

  createUe(ue: any): Observable<any> {
    return this.http.post(apiUrls.ue, ue, { withCredentials: true }).pipe(
      map((res: any) => res.data),
      catchError((err) => {
        console.error('Failed to create UE:', err);
        return of(null);
      })
    );
  }
  getUeWithParticipants(ueId: string): Observable<any> {
    return this.http
      .get<any>(apiUrls.ue + `with-participants/${ueId}`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => res.data),
        catchError((err) => {
          console.error('Failed to fetch UE with participants:', err);
          return of(null);
        })
      );
  }
  assignParticipants(ueId: string, participantIds: string[]): Observable<any> {
    return this.http.post(apiUrls.ue + 'assign-participants', {
      ueId,
      participantIds
    });
  }
  getUesByRole(): Observable<any> {
    return this.http.get<any>(apiUrls.ue + 'by-role', {
      withCredentials: true
    }).pipe(map(res => res.data));
  }

}
