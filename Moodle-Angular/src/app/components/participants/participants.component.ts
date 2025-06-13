import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UeService } from '../../services/ue.service';
import { apiUrls } from 'src/app/backend_urls'; 

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {
  users: any[] = [];
  selectedUserIds: string[] = [];
  etudiantsInscrits: any[] = [];
  userRole: string | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private ueService: UeService
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    this.http.get(apiUrls.user).subscribe((res: any) => {
      this.users = res.data.filter((u: any) => u.role === 'Etudiant');
    });

    this.fetchParticipants();
  }

  toggleUser(event: any) {
    const id = event.target.value;
    if (event.target.checked) {
      this.selectedUserIds.push(id);
    } else {
      this.selectedUserIds = this.selectedUserIds.filter(e => e !== id);
    }
  }

  assignEtudiants() {
    const ueId = this.route.snapshot.paramMap.get('id');
    if (!ueId) return;

    this.http.post(apiUrls.ue + 'assign-etudiants', {
      ueId,
      etudiantIds: this.selectedUserIds
    }).subscribe({
      next: () => {
        alert('Étudiants ajoutés avec succès');
        this.fetchParticipants();
      },
      error: () => alert("Erreur lors de l'ajout des étudiants")
    });
  }

  fetchParticipants() {
    const ueId = this.route.snapshot.paramMap.get('id');
    if (!ueId) return;

    this.ueService.getUeWithEtudiants(ueId).subscribe(ue => {
      if (!ue) return;
      this.etudiantsInscrits = ue.etudiants || [];

      const inscritIds = this.etudiantsInscrits.map((e: any) => e._id);

      this.http.get(apiUrls.user).subscribe((userRes: any) => {
        this.users = userRes.data
          .filter((u: any) => u.role === 'Etudiant')
          .map((u: any) => ({
            ...u,
            selected: inscritIds.includes(u._id)
          }));
      });
    });
  }
}
