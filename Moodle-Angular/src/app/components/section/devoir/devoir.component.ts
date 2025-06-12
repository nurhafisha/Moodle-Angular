import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevoirService } from 'src/app/services/devoir.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.component.html',
  styleUrls: ['./devoir.component.css']
})
export class DevoirComponent{
  @Input() devoirs: any[] = [];
  ueId: string | null = null;
  userRole: string | null = null;
  constructor(private route: ActivatedRoute, private devoirService: DevoirService , private router: Router) {}

  ngOnInit(): void {
    this.ueId = this.route.snapshot.paramMap.get('id');
    this.userRole = localStorage.getItem('userRole');
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

  goToDevoir(devoirId: string) {
  this.router.navigate(['/mes-cours', this.ueId, 'devoirs', devoirId]);
}
}
