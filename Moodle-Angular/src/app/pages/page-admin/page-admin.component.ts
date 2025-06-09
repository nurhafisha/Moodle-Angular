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
  newUe = { _id: '', titre_ue: '' };
  newUser = { nom: '', prenom: '', email: '', password: '', role: 'Etudiant' };

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
    this.loadUes();
  }

  // Recuperer tous les utilisateurs
  loadUsers() {
    this.adminService.getUsers().subscribe((response) => {
      console.log('Utilisateurs récupérés:', response);
      this.users = response.data; // récupère bien le tableau
    });
  }

  // Recuperer tous les UEs
  loadUes() {
    this.adminService.getUes().subscribe((response) => {
      console.log('UEs récupérés:', response);
      this.ues = response.data; // récupère bien le tableau
    });
  }

  // Creer une UE
  onAddUe() {
    this.adminService.addUe(this.newUe).subscribe(() => {
      this.loadUes();
      this.newUe = { _id: '', titre_ue: '' };
      // Ferme la modal Bootstrap
      (window as any).bootstrap.Modal.getOrCreateInstance(
        document.getElementById('addUeModal')
      ).hide();
    });
    console.log(this.newUe);
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
