import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @Output() ressourceAdded = new EventEmitter<any>();
  @Output() error = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  showForm = false;
  ressource = { titre_ressource: '', desc_ressource: '', datetime_publier: ''};
  userRole: string | null = null;
  file: File | null = null;

  constructor(private route: ActivatedRoute, private customPostService: CustomPostService) {
    this.id_ue = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {this.userRole = localStorage.getItem('userRole');}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit(form: NgForm) {
      // const formData = new FormData();
      // formData.append('titre_ressource', this.ressource.titre_ressource);
      // formData.append('desc_ressource', this.ressource.desc_ressource);
      // const now = new Date();
      // formData.append('datetime_publier', now.toISOString());
      // if (this.file) {
      //   formData.append('fichier_joint', this.file);
      // }
  
      // this.ressourceService.ajouterRessource(this.id_ue, formData).subscribe({
      //   next: (res) => {
      //     console.log('Ressource ajoutée avec succès !', res);
      //     this.ressourceAdded.emit(res);
      //     form.resetForm();
      //   },
      //   error: (err) => {
      //     console.error('Erreur lors de l\'ajout de la ressource', err);
      //     this.error.emit();
      //   }
      // });
    }

}
