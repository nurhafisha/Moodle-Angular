import { Component, OnInit , ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {

  submitted = false; //  Initialiser bouton s'inscrire
  registerForm: FormGroup; // reactive form instance
  roles: string[] = ['Etudiant', 'Enseignant', 'Admin']; 

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
    private authService: AuthService, // Service d'authentification pour gérer les appels d'API
    private router : Router, // Aller au autre page
    
  ) {

    // Initialiser le formulaire d'inscription avec les validateurs

    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Etudiant', Validators.required] // Default role
    });
  }

  ngOnInit(): void {}


  // Appelé lorsque l'utilisateur soumet le formulaire d'inscription:
  register() {
  this.submitted = true;

  // Si le formulaire n'est pas valide, enregistrez les erreurs et arrêtez
  if (this.registerForm.invalid) {
    console.log('Erreurs de formulaire :', this.registerForm.errors);
    return;
  }

  // Extraire les valeurs du formulaire dans un objet de charge utile propre
  const payload = {
    nom: this.registerForm.value.nom,
    prenom: this.registerForm.value.prenom,
    email: this.registerForm.value.email,
    password: this.registerForm.value.password,
    role: this.registerForm.value.role
  };

  // console.log('Sending payload:', payload); // -> DEBUG 

  // Appelez le service d'enregistrement pour envoyer les données au backend
  this.authService.registerService(payload).subscribe({
    next: (res) => {
      //console.log('Full response:', res);  // -> DEBUG 
      //alert('Registration successful!');
      
      this.showToast('success', 'Inscription réussie !');
      this.registerForm.reset({ role: 'Etudiant' }); // Réinitialiser le formulaire avec le rôle par défaut
      this.submitted = false;
      setTimeout(() => this.router.navigate(['/login']), 2000); // small delay
    },
    error: (err) => {
      // console.error('Complete error:', err);
      // console.error('Error response body:', err.error);
      
      // Déterminer le message d'erreur à afficher à l'utilisateur
      let errorMessage = 'Inscription échouée';
      if (err.error?.message) {
        errorMessage = err.error.message;
      } else if (err.error?.error?.message) {
        errorMessage = err.error.error.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      this.showToast('error', errorMessage);

     }
    });
  }
}
