import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DevoirService } from 'src/app/services/devoir.service';

@Component({
  selector: 'app-devoir-form',
  templateUrl: './devoir-form.component.html',
  styleUrls: ['./devoir-form.component.css']
})
export class DevoirFormComponent {
  id_ue: string | null = null;
  @Output() devoirAdded = new EventEmitter<any>();
  @Output() error = new EventEmitter<void>();

  showForm = false;
  devoirForm!: FormGroup;
  userRole: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private devoirService: DevoirService
  ) {
    this.id_ue = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.devoirForm = this.fb.group({
      titre_devoir: ['', Validators.required],
      desc_devoir: [''],
      datetime_fin: ['', Validators.required]
    });
    this.userRole = localStorage.getItem('userRole');
  }

  onSubmit(): void {
    if (this.devoirForm.invalid || this.isDateTimeFinInvalid()) return;

    const formData = new FormData();
    formData.append('titre_devoir', this.devoirForm.value.titre_devoir);
    formData.append('desc_devoir', this.devoirForm.value.desc_devoir);
    formData.append('datetime_debut', new Date().toISOString());
    formData.append('datetime_fin', this.devoirForm.value.datetime_fin);

    this.devoirService.ajouterDevoir(this.id_ue, formData).subscribe({
      next: (res) => {
        this.devoirAdded.emit(res);
        this.devoirForm.reset();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du devoir', err);
        this.error.emit();
      }
    });
  }

  isDateTimeFinInvalid(): boolean {
    const value = this.devoirForm?.value?.datetime_fin;
    if (!value) return false;
    const now = new Date();
    const due = new Date(value);
    return due <= now;
  }
}