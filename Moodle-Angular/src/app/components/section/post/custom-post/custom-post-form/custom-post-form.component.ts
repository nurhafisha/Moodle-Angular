import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomPostService } from 'src/app/services/custom-post.service';

@Component({
  selector: 'app-custom-post-form',
  templateUrl: './custom-post-form.component.html',
  styleUrls: ['./custom-post-form.component.css']
})
export class CustomPostFormComponent implements OnInit {

  id_ue: string | null = null;
  @Input() sectionName!: string;
  @Output() customAdded = new EventEmitter<any>();
  @Output() error = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  showForm = false;
  userRole: string | null = null;
  file: File | null = null;

  postForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private customPostService: CustomPostService,
    private fb: FormBuilder
  ) {
    this.id_ue = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');

    // Création du FormGroup avec FormBuilder
    this.postForm = this.fb.group({
      titre: ['', Validators.required],
      desc: [''],
      fichier_joint: [null], // Pour gérer le fichier, on ne le bind pas directement
    });
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('titre', this.postForm.value.titre);
    formData.append('desc', this.postForm.value.desc || '');
    const now = new Date();
    formData.append('datetime_publier', now.toISOString());
    formData.append('section', this.sectionName);
    if (this.file) {
      formData.append('fichier_joint', this.file);
    }

    this.customPostService.addCustomPost(this.id_ue, formData).subscribe({
      next: (res) => {
        this.customAdded.emit(res);
        this.postForm.reset();
        this.file = null;
        this.fileInput.nativeElement.value = '';
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de ', this.sectionName , err);
        this.error.emit();
      }
    });
  }

}
