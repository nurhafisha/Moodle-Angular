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

  // Toast properties
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

  ngOnInit(): void {}

  login() {
    this.authService.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        //alert message
        this.showToast('success', 'Login réussie !');
        setTimeout(() => this.router.navigate(['/espace-admin']), 2000); // TODO : Tukar to contenue-Ue
      },
      error: (err) => {
        console.error('Login échoué', err);
        // Show user-friendly message
        this.errorMessage =
          err.error?.message ||
          'Échec de la connexion. Veuillez vérifier vos identifiants.';
        this.showToast('error', this.errorMessage);
      },
    });
  }

  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
