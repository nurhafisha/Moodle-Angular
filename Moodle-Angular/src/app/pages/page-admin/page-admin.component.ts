import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
declare var bootstrap: any; // pour utiliser bootstrap.Modal

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css'],
})
export class PageadminComponent implements OnInit {
  users: any[] = []; // Liste des utilisateurs
  ues: any[] = []; // Liste des UEs
  newUe = { _id: '', titre_ue: '', image_ue: '' }; // Modèle pour une nouvelle UE
  newUser = { nom: '', prenom: '', email: '', password: '', role: 'Etudiant' }; // Modèle pour un nouvel utilisateur
  roles = ['Admin', 'Enseignant', 'Etudiant']; // Rôles disponibles

  selectedUeImage: File | null = null; // Image sélectionnée pour une UE
  selectedUser: any = null; // Utilisateur sélectionné pour modification
  userForm!: FormGroup; // Formulaire de modification utilisateur

  @ViewChild('editUserModal') editUserModal!: ElementRef; // Référence au modal d'édition utilisateur

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit() {
    // Initialisation du formulaire utilisateur avec validation
    this.userForm = this.fb.group({
      nom: [''],
      prenom: [''],
      password: [
        '',
        [
          Validators.minLength(10),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/
          ),
        ],
      ],
      role: [''],
    });
    this.loadUsers(); // Charger les utilisateurs au démarrage
    this.loadUes(); // Charger les UEs au démarrage
  }

  // Récupérer tous les utilisateurs
  loadUsers() {
    this.adminService.getUsers().subscribe((response) => {
      this.users = response.data; // Met à jour la liste des utilisateurs
    });
  }

  // Récupérer toutes les UEs
  loadUes() {
    this.adminService.getUes().subscribe((response) => {
      this.ues = response.data; // Met à jour la liste des UEs
    });
  }

  // Créer une UE
  onAddUe() {
    const formData = new FormData();
    formData.append('_id', this.newUe._id);
    formData.append('titre_ue', this.newUe.titre_ue);
    if (this.selectedUeImage) {
      formData.append('image_ue', this.selectedUeImage); // Ajoute l'image si sélectionnée
    }

    this.adminService.addUe(formData).subscribe(() => {
      this.loadUes(); // Rafraîchit la liste des UEs
      this.newUe = { _id: '', titre_ue: '', image_ue: '' }; // Réinitialise le formulaire
      this.selectedUeImage = null;
      // Ferme le modal d'ajout d'UE
      (window as any).bootstrap.Modal.getOrCreateInstance(
        document.getElementById('addUeModal')
      ).hide();
    });
  }

  // Gestion de la sélection d'image pour une UE
  onUeImageSelected(event: any) {
    const file = event.target.files[0];
    this.selectedUeImage = file ? file : null;
  }

  // Créer un utilisateur
  onAddUser() {
    this.adminService.addUser(this.newUser).subscribe(() => {
      this.loadUsers(); // Rafraîchit la liste des utilisateurs
      this.newUser = {
        nom: '',
        prenom: '',
        email: '',
        password: '',
        role: 'Etudiant',
      }; // Réinitialise le formulaire
      console.log('Utilisateur créé :', this.newUser.prenom);
      // Ferme le modal d'ajout d'utilisateur
      (window as any).bootstrap.Modal.getOrCreateInstance(
        document.getElementById('addUserModal')
      ).hide();
    });
  }

  // Charge les données d'un utilisateur dans le formulaire pour modification
  loadUser(user: any) {
    this.selectedUser = user;
    this.userForm.patchValue({
      nom: user.nom,
      prenom: user.prenom,
      role: user.role,
    });
    const modal = new bootstrap.Modal(this.editUserModal.nativeElement);
    modal.show(); // Affiche le modal d'édition
  }

  // Modifier un utilisateur
  updateUser() {
    if (!this.selectedUser || this.userForm.invalid) return;

    const data = this.userForm.value;

    // Si le mot de passe est vide, ne pas l’envoyer
    if (!data.password || data.password.trim() === '') {
      delete data.password;
    }

    this.adminService.updateUser(this.selectedUser._id, data).subscribe({
      next: () => {
        this.loadUsers(); // Rafraîchit la liste des utilisateurs
        const modal = bootstrap.Modal.getInstance(
          this.editUserModal.nativeElement
        );
        modal.hide(); // Ferme le modal d'édition
        this.userForm.reset();
      },
      error: (err) => {
        console.error('Erreur de mise à jour', err);
      },
    });
  }

  // Modifier une UE
  updateUe(ue: any) {
    const formData = new FormData();
    formData.append('titre_ue', ue.titre_ue);
    if (ue.imageFile) {
      formData.append('image_ue', ue.imageFile); // Ajoute la nouvelle image si présente
    }
    if (ue.image_ue === null) {
      formData.append('image_ue', ''); // Gère le cas où l'image est supprimée
    }
    this.adminService.updateUe(ue._id, formData).subscribe(() => {
      this.loadUes(); // Rafraîchit la liste des UEs
      (window as any).bootstrap.Modal.getOrCreateInstance(
        document.getElementById('ue-modify')
      ).hide(); // Ferme le modal de modification
    });
  }

  // Supprimer un utilisateur
  deleteUser(userId: string) {
    this.adminService.deleteUser(userId).subscribe({
      next: () => {
        this.loadUsers(); // Rafraîchit la liste après suppression
      },
    });
  }

  // Supprimer une UE
  deleteUe(codeUe: string) {
    this.adminService.deleteUe(codeUe).subscribe(() => {
      console.log('UE supprimé!');
      this.loadUes(); // Rafraîchit la liste après suppression
    });
  }

  // Validation du domaine email : prenom-nom@utbm.fr
  get email() {
    return this.newUser?.email || '';
  }

  get isEmailValid() {
    // Vérifie le format prenom-nom@utbm.fr
    const regex = /^[a-zA-Z]+-[a-zA-Z]+@utbm\.fr$/;
    return regex.test(this.email);
  }

  // Validation du mot de passe
  get password() {
    return this.newUser?.password || '';
  }
  get isPasswordLongEnough() {
    return this.password.length >= 10;
  }
  get hasUppercase() {
    return /[A-Z]/.test(this.password);
  }
  get hasLowercase() {
    return /[a-z]/.test(this.password);
  }
  get hasNumber() {
    return /\d/.test(this.password);
  }
  get hasSpecialChar() {
    return /[^\w\s]/.test(this.password);
  }
}
