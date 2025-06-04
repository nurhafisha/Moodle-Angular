import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { apiUrls } from 'src/app/backend_urls';

@Component({
  selector: 'app-cours-form',
  templateUrl: './cours-form.component.html',
  styleUrls: ['./cours-form.component.css']
})
export class CoursFormComponent{
  id_ue: string | null = null;
  @Output() coursAdded = new EventEmitter<any>();
  @Output() error = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  showForm = false;
  cours = { titre_cours: '', desc_cours: '', datetime_publier: ''};

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
    formData.append('titre_cours', this.cours.titre_cours);
    formData.append('desc_cours', this.cours.desc_cours);
    const now = new Date();
    formData.append('datetime_publier', now.toISOString());
    if (this.file) {
      formData.append('fichier_joint', this.file);
    }

    this.http.post( apiUrls.ue+`new-cours/${this.id_ue}`, formData)
      .subscribe({
        next: (res) => {
          console.log('Cours ajouté avec succès !', res);
          this.coursAdded.emit(res);
          form.resetForm();
          this.file = null;
          this.fileInput.nativeElement.value = '';
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du cours', err);
          this.error.emit();
        }
      });
  }

}
