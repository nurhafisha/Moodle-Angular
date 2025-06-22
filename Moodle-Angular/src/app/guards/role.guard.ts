import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('authToken'); // verifier si utilisateur est authentifié
    const expectedRoles: string[] = route.data['expectedRoles']; // Obtenir les rôles attendus
    const userRole = localStorage.getItem('userRole'); // Récupérer le rôle de l'utilisateur

    // Si le token ou le rôle de l'utilisateur n'existe pas, rediriger vers la page Login
    if (!token || !userRole) {
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRoles.includes(userRole)) {
      return true;
    }

    // Si le rôle de l'utilisateur n'est pas autorisé, rediriger vers la page non autorisée
    this.router.navigate(['/unauthorised']);
    return false;
  }
}
