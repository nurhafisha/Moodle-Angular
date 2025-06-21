import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

// Fonctionnalité : Intercepteur HTTP pour ajouter un jeton d'authentification aux requêtes sortantes

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  // méthode est appelée automatiquement à chaque requête HTTP sortante
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');  // Recuperer le jeton de localStorage

    if (token) {
      // Cloner la requête pour ajouter le nouvel en-tête
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    } else {
      // Si aucun jeton, continuer sans modifier la requête
      return next.handle(request);
    }
  }
}
