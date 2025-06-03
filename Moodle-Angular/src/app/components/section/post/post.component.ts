import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent{
  @Input() cours: any[] = [];
  @Input() ressources: any[] = [];

  constructor(private http: HttpClient) {}

  deleteCours(id: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return;

    this.http.delete(`http://localhost:8800/backend/ue/${id}`)
      .subscribe({
        next: () => {
          this.cours = this.cours.filter(c => c.id !== id);
          console.log('Cours supprimé avec succès');
        },
        error: err => console.error('Erreur lors de la suppression du cours', err)
      });
  }
}
