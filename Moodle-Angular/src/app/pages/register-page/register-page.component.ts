import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'Enseignant';  // Default role - if 'etudiant' (!!pas d'accent)

   constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  register() {
    if (this.name === '' || this.email === '' || this.password === '' || this.role === '') {
      alert('Veuillez remplir tous les champs');
      return;
    }
    this.auth.register(this.name , this.email, this.password , this.role);
    this.email = '';
    this.password = '';
  }

    showPassword: boolean = false;
    togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
