import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  role: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Load role initially
    this.role = localStorage.getItem('userRole');

    // Re-check role on every navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.role = localStorage.getItem('userRole');
      }
    });
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    this.role = null; // Immediately clear role
    this.router.navigate(['/login']);
  }
}