import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  role: string | null = null;

  // Toast properties
  @ViewChild('liveToast', { static: false }) liveToast!: ElementRef;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  showToast(type: 'success' | 'error', message: string) {
    this.toastType = type;
    this.toastMessage = message;

    const toastBootstrap = new bootstrap.Toast(this.liveToast.nativeElement);
    toastBootstrap.show();
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  }

  login() {
    this.authService.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        //JWT Token :
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('userRole', res.data.role);
        localStorage.setItem('userId', res.data._id);

        this.role = localStorage.getItem('userRole');

        this.showToast('success', 'Login réussie !');

        // Utiliser le token pour recuperer le profil d'utilisateur
      this.authService.fetchUserProfile().subscribe({
        next: (profileRes) => {
          this.authService.setUser(profileRes.data); 

          setTimeout(() => {
            if (this.role === 'Admin') {
              this.router.navigate(['/espace-admin']);
            } else {
              this.router.navigate(['/mes-cours']);
            }
          }, 2000);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du profil', err);
          this.showToast('error', 'Erreur lors de la récupération du profil.');
        }
      });
    },
    error: (err) => {
      console.error('Login échoué', err);
      this.errorMessage =
        err.error?.message ||
        'Échec de la connexion. Veuillez vérifier vos identifiants.';
      this.showToast('error', this.errorMessage);
    },
  });
}

  // fonction montrer/cacher mot de passe
  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
