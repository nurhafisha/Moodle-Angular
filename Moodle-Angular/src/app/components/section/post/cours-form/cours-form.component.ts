import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-cours-form',
  templateUrl: './cours-form.component.html',
  styleUrls: ['./cours-form.component.css']
})
export class CoursFormComponent implements OnInit {
  id_ue: string | null = null;
  @Output() coursAdded = new EventEmitter<any>();
  @Output() error = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  showForm = false;
  coursForm!: FormGroup;
  userRole: string | null = null;
  file: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private coursService: CoursService,
    private fb: FormBuilder
  ) {
    this.id_ue = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    this.coursForm = this.fb.group({
      titre_cours: ['', Validators.required],
      desc_cours: ['']
    });
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  onSubmit(): void {
    if (this.coursForm.invalid) return;

    const formData = new FormData();
    formData.append('titre_cours', this.coursForm.value.titre_cours);
    formData.append('desc_cours', this.coursForm.value.desc_cours || '');
    formData.append('datetime_publier', new Date().toISOString());

    if (this.file) {
      formData.append('fichier_joint', this.file);
    }

    this.coursService.ajouterCours(this.id_ue, formData).subscribe({
      next: (res) => {
        console.log('Cours ajouté avec succès !', res);
        this.coursAdded.emit(res);
        this.coursForm.reset();
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
