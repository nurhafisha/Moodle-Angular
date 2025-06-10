import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';

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

  constructor(private route: ActivatedRoute, private coursService: CoursService) {
    this.id_ue = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit(form: NgForm): void {
    const formData = new FormData();
    formData.append('titre_cours', this.cours.titre_cours);
    formData.append('desc_cours', this.cours.desc_cours);
    const now = new Date();
    formData.append('datetime_publier', now.toISOString());
    if (this.file) {
      formData.append('fichier_joint', this.file);
    }

    this.coursService.ajouterCours(this.id_ue, formData).subscribe({
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
