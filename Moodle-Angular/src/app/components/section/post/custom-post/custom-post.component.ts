import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiUrls } from 'src/app/backend_urls';
import { CustomPostService } from 'src/app/services/custom-post.service';

@Component({
  selector: 'app-custom-post',
  templateUrl: './custom-post.component.html',
  styleUrls: ['./custom-post.component.css']
})
export class CustomPostComponent {
  @Input() customs: any[] = [];
  @Output() customDeleted = new EventEmitter<string>();
  ueId: string | null = null;
  rootUrl: string = apiUrls.root;
  constructor(private route: ActivatedRoute, private customPostService: CustomPostService) { }

  ngOnInit(): void {
    this.ueId = this.route.snapshot.paramMap.get('id');
  }

  deleteCustom(id: string): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce Post ?')) return;

    this.customPostService.deleteCustom(this.ueId, id).subscribe({
      next: () => {
        this.customDeleted.emit(id);
        console.log('Post supprimé avec succès');
      },
      error: err => {
        console.error('Erreur lors de la suppression du Post', err);
      }
    });
  }

}
