import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ressource-form',
  templateUrl: './ressource-form.component.html',
  styleUrls: ['./ressource-form.component.css']
})
export class RessourceFormComponent{
  id_ue: string | null = null;
  @Output() ressourceAdded = new EventEmitter<any>();
  @Output() error = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  showForm = false;
  ressource = { titre_ressource: '', desc_ressource: '', datetime_publier: ''};

  file: File | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.id_ue = this.route.snapshot.paramMap.get('id');
    console.log('Loaded id_ue:', this.id_ue);
  }

  ngOnInit() {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit(form: NgForm) {
    const formData = new FormData();
    formData.append('titre_ressource', this.ressource.titre_ressource);
    formData.append('desc_ressource', this.ressource.desc_ressource);
    const now = new Date();
    formData.append('datetime_publier', now.toISOString());
    if (this.file) {
      formData.append('fichier_joint', this.file);
    }

    this.http.post(`http://localhost:8800/backend/ues/new-ressource/${this.id_ue}`, formData)
      .subscribe({
        next: (res) => {
          console.log('Ressource ajoutée avec succès !', res);
          this.ressourceAdded.emit(res);
          form.resetForm();
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
