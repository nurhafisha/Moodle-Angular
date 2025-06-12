import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css'],
})
export class PageadminComponent implements OnInit {
  users: any[] = [];
  ues: any[] = [];
  newUe = { _id: '', titre_ue: '', image_ue: '' };
  newUser = { nom: '', prenom: '', email: '', password: '', role: 'Etudiant' };

  selectedUeImage: File | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
    this.loadUes();
  }

  // Recuperer tous les utilisateurs
  loadUsers() {
    this.adminService.getUsers().subscribe((response) => {
      this.users = response.data; // récupère bien le tableau
    });
  }

  // Recuperer tous les UEs
  loadUes() {
    this.adminService.getUes().subscribe((response) => {
      this.ues = response.data; // récupère bien le tableau
    });
  }

  // Creer une UE
  onAddUe() {
    const formData = new FormData();
    formData.append('_id', this.newUe._id);
    formData.append('titre_ue', this.newUe.titre_ue);
    if (this.selectedUeImage) {
      formData.append('image_ue', this.selectedUeImage);
    }

    this.adminService.addUe(formData).subscribe(() => {
      this.loadUes();
      this.newUe = { _id: '', titre_ue: '', image_ue: '' };
      this.selectedUeImage = null;
      (window as any).bootstrap.Modal.getOrCreateInstance(
        document.getElementById('addUeModal')
      ).hide();
    });
  }

  onUeImageSelected(event: any) {
    const file = event.target.files[0];
    this.selectedUeImage = file ? file : null;
  }

  // Creer un utilisateur
  onAddUser() {
    this.adminService.addUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.newUser = {
        nom: '',
        prenom: '',
        email: '',
        password: '',
        role: 'Etudiant',
      };
      console.log('Utilisateur créé :', this.newUser.prenom);
      (window as any).bootstrap.Modal.getOrCreateInstance(
        document.getElementById('addUserModal')
      ).hide();
    });
  }

  // Modifier une UE
  updateUe(ue: any) {
    const formData = new FormData();
    formData.append('titre_ue', ue.titre_ue);
    if (ue.imageFile) {
      formData.append('image_ue', ue.imageFile);
    }
    this.adminService.updateUe(ue._id, formData).subscribe(() => {
      this.loadUes();
      (window as any).bootstrap.Modal.getOrCreateInstance(
        document.getElementById('ue-modify')
      ).hide();
    });
  }

  // Supprimer un utilisateur
  deleteUser(userId: string) {
    this.adminService.deleteUser(userId).subscribe(() => {
      console.log('Utilisateur supprimé!');
      this.loadUsers();
    });
  }

  // Supprimer une Ue
  deleteUe(codeUe: string) {
    this.adminService.deleteUe(codeUe).subscribe(() => {
      console.log('UE supprimé!');
      this.loadUes();
    });
  }
}
