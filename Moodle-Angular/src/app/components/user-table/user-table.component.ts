import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  users = [
    {
      nom: 'Doe',
      prenom: 'John',
      email: 'john.doe@example.com',
      role: 'Admin',
    },
    {
      nom: 'Smith',
      prenom: 'Jane',
      email: 'jane.smith@example.com',
      role: 'User',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
