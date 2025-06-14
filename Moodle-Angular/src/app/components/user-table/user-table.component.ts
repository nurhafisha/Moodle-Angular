import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  @Input() users: any[] = [];
  @Output() deleteUser = new EventEmitter<string>();
  @Output() updateUser = new EventEmitter<any>();

  selectedUserId: string | null = null;

  editedUser: any = {};

  constructor() {}

  ngOnInit(): void {}

  openDeleteModal(userId: string) {
    this.selectedUserId = userId;
  }

  openUpdateModal(userId: string) {
    const user = this.users.find((u) => u._id === userId);
    this.editedUser = { ...user };
  }

  emitUpdateUser() {
    const userToUpdate = { ...this.editedUser };
    this.updateUser.emit(userToUpdate);
  }
}
