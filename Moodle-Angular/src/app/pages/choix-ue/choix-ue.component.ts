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

  submitUe(): void {
    this.ueService.createUe(this.newUe).subscribe({
      next: (data) => {
        this.ues.push(data); 
        this.newUe = { _id: '', titre_ue: '', image_ue: '' }; 
        const modal = document.getElementById('addUeModal');
        if (modal) new bootstrap.Modal(modal).hide(); 
      },
      error: (err) => {
        console.error('Failed to add UE:', err);
      }
    });
  }
}
