import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) {}

  // Login method
  login(email: string, password: string) {
    return this.fireauth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.setItem('token', 'true'); // Set a flag
        this.router.navigate(['/espace-admin']);
      })
      .catch((error) => {
        alert(error.message);
        this.router.navigate(['/login']);
      });
  }

  // Register method
  register(name: string, email: string, password: string, role: string) {
    return this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const uid = res.user?.uid;
        if (uid) {
          //enregistrer sur RealTime database
          this.db.object('users/' + uid).set({
            name: name,
            email: email,
            role: role,
          });
        }
        alert('Inscription réussie !');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        alert(error.message);
        this.router.navigate(['/register']);
      });
  }

  // Logout method
  logout() {
    return this.fireauth
      .signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  registerPage() {
    this.router.navigate(['/register']);
  }
}
