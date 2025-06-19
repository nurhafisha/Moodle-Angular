import { Component, EventEmitter, Output, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RessourceService } from 'src/app/services/ressource.service';

@Component({
  selector: 'app-ressource-form',
  templateUrl: './ressource-form.component.html',
  styleUrls: ['./ressource-form.component.css']
})
export class RessourceFormComponent implements OnInit {
  id_ue: string | null = null;
  @Output() ressourceAdded = new EventEmitter<any>();
  @Output() error = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  showForm = false;
  userRole: string | null = null;
  file: File | null = null;

  ressourceForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private ressourceService: RessourceService,
    private fb: FormBuilder
  ) {
    this.id_ue = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');

    this.ressourceForm = this.fb.group({
      titre_ressource: ['', Validators.required],
      desc_ressource: ['']
    });
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  onSubmit(): void {
    if (this.ressourceForm.invalid) return;

    const formData = new FormData();
    formData.append('titre_ressource', this.ressourceForm.value.titre_ressource);
    formData.append('desc_ressource', this.ressourceForm.value.desc_ressource || '');
    formData.append('datetime_publier', new Date().toISOString());

    if (this.file) {
      formData.append('fichier_joint', this.file);
    }

    this.ressourceService.ajouterRessource(this.id_ue, formData).subscribe({
      next: (res) => {
        console.log('Ressource ajoutée avec succès !', res);
        this.ressourceAdded.emit(res);
        this.ressourceForm.reset();
        this.file = null;
        this.fileInput.nativeElement.value = '';
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de la ressource', err);
        this.error.emit();
      }
    });
  }
}
