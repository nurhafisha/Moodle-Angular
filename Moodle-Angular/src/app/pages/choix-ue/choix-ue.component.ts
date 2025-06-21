import { Component, OnInit } from '@angular/core';
import { UeService } from '../../services/ue.service'; 

declare var bootstrap: any;

@Component({
  selector: 'app-choix-ue',
  templateUrl: './choix-ue.component.html',
  styleUrls: ['./choix-ue.component.css']
})
export class ChoixUeComponent implements OnInit {
  ues: any[] = [];
  userRole: string | null = null;

  selectedUeImage: File | null = null;

  constructor(private ueService: UeService) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    this.ueService.getUesByRole().subscribe({
      next: (ues) => {
        this.ues = ues;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des UEs", err);
      }
    });   
  }

  newUe = {
    _id: '',
    titre_ue: '',
    image_ue: ''
  };

  onUeImageSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedUeImage = file ? file : null;
  }

  submitUe(): void {
    const formData = new FormData();
    formData.append('_id', this.newUe._id);
    formData.append('titre_ue', this.newUe.titre_ue);
    if (this.selectedUeImage) {
      formData.append('image_ue', this.selectedUeImage);
    }

    this.ueService.createUe(formData).subscribe({
      next: (createdUe) => {
        this.ues.push(createdUe);  
        this.newUe = { _id: '', titre_ue: '', image_ue: '' };
        this.selectedUeImage = null;

        // Fermer le modal d'ajout d'UE
        (window as any).bootstrap.Modal.getOrCreateInstance(document.getElementById('addUeModal')).hide();

        // Montrer le modal success
        (window as any).bootstrap.Modal.getOrCreateInstance(document.getElementById('courseCreatedModal')).show();
      },
      error: (err) => {
        console.error('Erreur lors de la création de l’UE:', err);
      }
    });
  }
}
