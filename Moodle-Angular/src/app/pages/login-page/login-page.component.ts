import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  email: string = '';
  password: string = '';


  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.email === '' || this.password === '') {
      alert('Veuillez remplir tous les champs');
      return;
    }
    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

    showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
