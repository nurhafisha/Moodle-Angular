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

  constructor() {}

  ngOnInit(): void {}

  openDeleteModal(userId: string) {
    this.selectedUserId = userId;
  }

  onUpdate(user: any) {
    this.updateUser.emit(user);
  }
}
