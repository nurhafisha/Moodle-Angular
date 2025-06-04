import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  @Input() users: any[] = [];
  constructor() {}

  ngOnInit(): void {}
}
