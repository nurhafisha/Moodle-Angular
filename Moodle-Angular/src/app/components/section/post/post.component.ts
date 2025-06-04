import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { apiUrls } from 'src/app/backend_urls';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent{
  @Input() cours: any[] = [];
  @Input() ressources: any[] = [];
  ueId: string | null = null;
  postId: string | null = null;
  rootUrl: string = apiUrls.root;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.ueId = this.route.snapshot.paramMap.get('id');
  }

  deleteCours(id: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return;

    this.http.delete(apiUrls.ue+`${this.ueId}`)
      .subscribe({
        next: () => {
          this.cours = this.cours.filter(c => c.id !== id);
          console.log('Cours supprimé avec succès');
        },
        error: err => console.error('Erreur lors de la suppression du cours', err)
      });
  }
}
