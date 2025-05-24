import { Component } from '@angular/core';

@Component({
  selector: 'app-ue-table',
  templateUrl: './ue-table.component.html',
  styleUrls: ['./ue-table.component.css'],
})
export class UETableComponent {
  ues = [
    { code: 'UE101', name: 'Mathematics', image: 'math.jpg' },
    { code: 'UE102', name: 'Physics', image: 'physics.jpg' },
    { code: 'UE103', name: 'Chemistry', image: 'chemistry.jpg' },
  ];

  constructor() {}

  // Additional methods for handling UE-related actions can be added here
}
