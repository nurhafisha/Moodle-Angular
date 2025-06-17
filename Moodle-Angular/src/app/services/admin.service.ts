import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from '../backend_urls';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  //Definition des variables pour le route venant de "backend_urls.ts"
  private urlUser = apiUrls.user;
  private urlUe = apiUrls.ue;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.urlUser);
  }

  getUes(): Observable<any> {
    return this.http.get<any>(this.urlUe);
  }

  addUe(ue: any): Observable<any> {
    return this.http.post<any>(this.urlUe, ue);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.urlUser, user);
  }

  updateUe(codeUe: string, ue: any = {}): Observable<any> {
    return this.http.patch<any>(`${this.urlUe}${codeUe}`, ue);
  }

  updateUser(userId: string, user: any = {}): Observable<any> {
    return this.http.patch<any>(`${this.urlUser}${userId}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.urlUser}${userId}`);
  }

  deleteUe(codeUe: string): Observable<any> {
    return this.http.delete<any>(`${this.urlUe}${codeUe}`);
  }
}
