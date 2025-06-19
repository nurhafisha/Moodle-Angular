import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiUrls } from 'src/app/backend_urls';
import { CoursService } from 'src/app/services/cours.service';
import { RessourceService } from 'src/app/services/ressource.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent{
  @Input() cours: any[] = [];
  @Input() ressources: any[] = [];
  ueId: string | null = null;
  userRole: string | null = null;
  rootUrl: string = apiUrls.root;

  constructor(private route: ActivatedRoute,
    private coursService: CoursService,
    private ressourceService: RessourceService
  ) {}

  ngOnInit(): void {
    this.ueId = this.route.snapshot.paramMap.get('id');
    this.userRole = localStorage.getItem('userRole');
  }

  deleteCours(id: string): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return;

    this.coursService.deleteCours(this.ueId, id).subscribe({
      next: () => {
        this.cours = this.cours.filter(c => c._id !== id);
        console.log('Cours supprimé avec succès');
      },
      error: err => {
        console.error('Erreur lors de la suppression du cours', err);
      }
    });
  }

  deleteRessource(id: string): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) return;

    this.ressourceService.deleteRessource(this.ueId, id).subscribe({
      next: () => {
        this.ressources = this.ressources.filter(r => r._id !== id);
        console.log('Ressource supprimée avec succès');
      },
      error: err => {
        console.error('Erreur lors de la suppression de la ressource', err);
      }
    });
  }

  deletePost(id: string): void{
    
  }
}
