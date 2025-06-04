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
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
    this.loadUes();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe((response) => {
      console.log('Utilisateurs récupérés:', response);
      this.users = response.data; // <-- récupère bien le tableau
    });
  }

  loadUes() {
    this.adminService.getUes().subscribe((response) => {
      console.log('UEs récupérés:', response);
      this.ues = response.data; // <-- récupère bien le tableau
    });
  }
}
