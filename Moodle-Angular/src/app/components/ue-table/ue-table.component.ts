import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ue-table',
  templateUrl: './ue-table.component.html',
  styleUrls: ['./ue-table.component.css'],
})
export class UETableComponent {
  @Input() ues: any[] = [];
  @Output() deleteUe = new EventEmitter<string>();
  @Output() updateUe = new EventEmitter<any>();

  selectedCodeUe: string | null = null;
  selectedEditUeImage: File | null = null;

  editedUe: any = {};

  constructor() {}
  openDeleteModal(codeUe: string) {
    this.selectedCodeUe = codeUe;
  }
  openEditModal(ue: any) {
    this.editedUe = { ...ue };
    this.selectedEditUeImage = null;
  }
  onEditUeImageSelected(event: any) {
    const file = event.target.files[0];
    this.selectedEditUeImage = file ? file : null;
  }
  removeEditUeImage() {
    this.editedUe.image_ue = null;
    this.selectedEditUeImage = null;
  }

  emitUpdateUe() {
    // Crée l'objet à émettre
    const ueToUpdate = {
      ...this.editedUe,
      imageFile: this.selectedEditUeImage,
    };
    this.updateUe.emit(ueToUpdate);
  }
}
