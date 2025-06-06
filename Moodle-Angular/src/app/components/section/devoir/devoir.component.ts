import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevoirService } from 'src/app/services/devoir.service';

@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.component.html',
  styleUrls: ['./devoir.component.css']
})
export class DevoirComponent{
  @Input() devoirs: any[] = [];
  ueId: string | null = null;

  constructor(private route: ActivatedRoute, private devoirService: DevoirService) {}

  ngOnInit(): void {
    this.ueId = this.route.snapshot.paramMap.get('id');
  }

  deleteDevoir(id: string): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce devoir ?')) return;

    this.devoirService.deleteDevoir(this.ueId, id).subscribe({
      next: () => {
        this.devoirs = this.devoirs.filter(d => d._id !== id);
        console.log('Devoir supprimé avec succès');
      },
      error: err => {
        console.error('Erreur lors de la suppression du devoir', err);
      }
    });
  }
}
