import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from '../backend_urls';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private urlUser = apiUrls.user;
  private urlUe = apiUrls.ue;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.urlUser);
  }

  getUes(): Observable<any> {
    return this.http.get<any>(this.urlUe);
  }
}
