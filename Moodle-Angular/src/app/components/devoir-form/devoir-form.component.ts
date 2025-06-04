import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { apiUrls } from 'src/app/backend_urls';

@Component({
  selector: 'app-devoir-form',
  templateUrl: './devoir-form.component.html',
  styleUrls: ['./devoir-form.component.css']
})
export class DevoirFormComponent{
  id_ue: string | null = null;
  @Output() devoirAdded = new EventEmitter<any>();
  @Output() error = new EventEmitter<void>();

  showForm = false;
  devoir = { titre_devoir: '', desc_devoir: '', datetime_debut: '', datetime_fin: '', depots: []};

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.id_ue = this.route.snapshot.paramMap.get('id');
    console.log('Loaded id_ue:', this.id_ue);
  }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const formData = new FormData();
    formData.append('titre_devoir', this.devoir.titre_devoir);
    formData.append('desc_devoir', this.devoir.desc_devoir);
    const now = new Date();
    formData.append('datetime_debut', now.toISOString());
    formData.append('datetime_fin', this.devoir.datetime_fin);


    this.http.post(apiUrls.ue+`new-devoir/${this.id_ue}`, formData)
      .subscribe({
        next: (res) => {
          console.log('Devoir ajoutée avec succès !', res);
          this.devoirAdded.emit(res);
          form.resetForm();
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de la devoir', err);
          this.error.emit();
        }
      });
  }

  isDateTimeFinInvalid(): boolean {
    if (!this.devoir.datetime_fin) return false;

    const now = new Date();
    const dueDate = new Date(this.devoir.datetime_fin);

    return dueDate <= now;
  }
}
