import { Component, OnInit , ElementRef , ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from 'src/app/backend_urls';

declare var bootstrap: any;

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  profileForm!: FormGroup;
  submitted = false;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  role = localStorage.getItem('userRole');

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

  constructor(private fb: FormBuilder, private http: HttpClient) {}
  
  ngOnInit(): void {
    
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    // Initialiser le groupe de formulaires avec des contrôles
    this.profileForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [{ value: '', disabled: true }],
      password: ['', [Validators.minLength(6)]],
      role: [{ value: '', disabled: true }],
      profilePicture: ['']  
    });
    
    // Récupérer les informations de profil depuis le backend et remplir le formulaire
    this.http.get<any>(`${apiUrls.user}profile`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
    next: (response) => {
        const user = response.data; 

      this.profileForm.patchValue({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        password: '', 
        role: user.role, 
        profilePicture: user.profilePicture
      });
      this.imagePreview = user.profilePicture;
    },
      error: (err) => console.error('Échec de la récupération du profil', err)
    });
  }

  // Appelé lorsqu'une image est sélectionnée dans le fichier d'entrée
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Appelé lorsque l'utilisateur soumet le formulaire
  onSubmit() {
  this.submitted = true;

  if (this.profileForm.invalid) {return;}

  const token = localStorage.getItem('authToken');
  const formData = new FormData();

  // Ajouter des champs de formulaire (ignorer le mot de passe s'il est vide)
  for (const key in this.profileForm.value) {
    if (key === 'password' && !this.profileForm.value[key]) continue;
    formData.append(key, this.profileForm.value[key]);
  }

  // Ajouter le fichier si sélectionné
  if (this.selectedFile) {
    formData.append('profilePictureFile', this.selectedFile);
  }

  // Envoyer une requête PUT pour mettre à jour le profil
  const userId = localStorage.getItem('userId');
  this.http.put(`${apiUrls.user}${userId}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  }).subscribe({
    next: () => this.showToast('success' , ' Profil mis à jour'),
    error: () => this.showToast ('error','Erreur lors de la mise à jour du profil')

  });
}
}