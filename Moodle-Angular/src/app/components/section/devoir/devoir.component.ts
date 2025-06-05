import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiUrls } from 'src/app/backend_urls';

@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.component.html',
  styleUrls: ['./devoir.component.css']
})
export class DevoirComponent{
  @Input() devoirs: any[] = [];
  ueId: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.ueId = this.route.snapshot.paramMap.get('id');
  }

  deleteDevoir(id: string) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer ce devoir ?')) return;
  
      this.http.delete(apiUrls.ue+`${this.ueId}/devoir/${id}`)
        .subscribe({
          next: () => {
            this.devoirs = this.devoirs.filter(d => d._id !== id);
            console.log('Devoir supprimé avec succès');
          },
          error: err => console.error('Erreur lors de la suppression du devoir', err)
        });
    }
}
