import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-connection-table',
  templateUrl: './connection-table.component.html',
  styleUrls: ['./connection-table.component.css'],
})
export class ConnectionTableComponent implements OnInit {
  @Input() logs: any[] = [];
  constructor() {}

  ngOnInit(): void {}
}
