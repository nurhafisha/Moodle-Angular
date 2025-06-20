import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-unauthorized',
  templateUrl: './page-unauthorized.component.html',
  styleUrls: ['./page-unauthorized.component.css'],
})
export class PageUnauthorizedComponent implements OnInit {
  role: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('userRole');
  }

  goHome() {
    if (this.role === 'Admin') {
      this.router.navigate(['/espace-admin']);
    } else if (this.role === 'Enseignant') {
      this.router.navigate(['/mes-cours']);
    } else if (this.role === 'Etudiant') {
      this.router.navigate(['/mes-cours']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
