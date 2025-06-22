import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  role: string | null = null;
  nom: string | null = null;
  prenom: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Load role initially
    this.role = localStorage.getItem('userRole');

    // Re-check role on every navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.role = localStorage.getItem('userRole');
      }
    });

    this.authService.user$.subscribe((user) => {
      if (user) {
        this.nom = `${user.nom}`;
        this.prenom = `${user.prenom}`;
      } else {
        this.nom = null;
        this.prenom = null;
      }
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // or wherever you want
  }
}
