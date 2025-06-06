import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../backend_urls';

// Page handles authetication logic (perantara frontend & backend)
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerService(registerObj: any) {
    return this.http.post<any>(`${apiUrls.AuthService}register`, registerObj);
  }

  loginService(loginObj: any) {
    return this.http.post<any>(`${apiUrls.AuthService}login`, loginObj);
  }
}
