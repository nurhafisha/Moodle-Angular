import { Component, Input } from '@angular/core';
import { apiUrls } from 'src/app/backend_urls';
import { CustomPostService } from 'src/app/services/custom-post.service';

@Component({
  selector: 'app-custom-post',
  templateUrl: './custom-post.component.html',
  styleUrls: ['./custom-post.component.css']
})
export class CustomPostComponent {
  @Input() customs: any[] = [];
  rootUrl: string = apiUrls.root;
  constructor(private customPostService: CustomPostService) { }

  deleteCustom(id: string): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return;

    // this.customPostService.delete(this.ueId, id).subscribe({
    //   next: () => {
    //     this.cours = this.cours.filter(c => c._id !== id);
    //     console.log('Cours supprimé avec succès');
    //   },
    //   error: err => {
    //     console.error('Erreur lors de la suppression du cours', err);
    //   }
    // });
  }

}
