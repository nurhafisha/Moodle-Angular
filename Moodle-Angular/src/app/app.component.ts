import { Component , OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
// This page will be the first to load : so we need to fetch user info 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Moodle-Angular';

  constructor(private authService:AuthService){}
  ngOnInit(): void {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.authService.fetchUserProfile().subscribe({
          next: (res) => {
            this.authService.setUser(res.data);  // ✅ Repopulate user in memory
          },
          error: () => {
            console.warn('Token invalide ou expiré');
            this.authService.clearUser();  // optional cleanup
          }
        });
      }
    }
  }

