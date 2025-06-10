import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ue-table',
  templateUrl: './ue-table.component.html',
  styleUrls: ['./ue-table.component.css'],
})
export class UETableComponent {
  @Input() ues: any[] = [];
  @Output() deleteUe = new EventEmitter<string>();

  selectedCodeUe: string | null = null;

  constructor() {}
  openDeleteModal(codeUe: string) {
    this.selectedCodeUe = codeUe;
  }
}
