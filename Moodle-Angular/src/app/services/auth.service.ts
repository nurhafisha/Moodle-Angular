import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { apiUrls } from '../backend_urls';

// Fonctionalité : Pour communiquer avec l'API d'authentification backend

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null); // sauve l'utilisateur connecté
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}


  registerService(registerObj: any) {
    return this.http.post<any>(`${apiUrls.AuthService}register`, registerObj);
  }


  loginService(loginObj: any) {
    return this.http.post<any>(`${apiUrls.AuthService}login`, loginObj);
  }

  // Stocker profile :
  setUser(user: any) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.getValue();
  }

  clearUser() {
    this.userSubject.next(null);
  }

fetchUserProfile() {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return {
      subscribe: () => {
        console.warn('Token manquant, profil non chargé.');
      }
    };
  }

  return this.http.get<any>(`${apiUrls.user}profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

  logout(): void {
  localStorage.removeItem('authToken');      
  localStorage.removeItem('userRole');    
  this.clearUser();                      
}


}
