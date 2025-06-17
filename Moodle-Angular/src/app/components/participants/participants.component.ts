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
  participantsInscrits: any[] = [];
  userRole: string | null = null;
  searchTerm: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private ueService: UeService
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    this.fetchParticipants();
  }

  fetchParticipants(): void {
    const ueId = this.route.snapshot.paramMap.get('id');
    if (!ueId) return;

    this.ueService.getUeWithParticipants(ueId).subscribe(ue => {
      if (!ue) return;

      this.participantsInscrits = (ue.participants || []).sort((a: any, b: any) => {
        if (a.role === 'Enseignant' && b.role !== 'Enseignant') return -1;
        if (a.role !== 'Enseignant' && b.role === 'Enseignant') return 1;
        return 0;
      });

      const inscritIds = this.participantsInscrits.map((p: any) => p._id);

      this.http.get(apiUrls.user).subscribe((res: any) => {
        this.users = res.data
        .filter((u: any) => u.role !== 'Admin')
        .sort((a: any, b: any) => {          
          if (a.role === 'Enseignant' && b.role !== 'Enseignant') return -1;
          if (a.role !== 'Enseignant' && b.role === 'Enseignant') return 1;
          return 0;
          })
        .map((user: any) => ({
          ...user,
          selected: inscritIds.includes(user._id)
        }));
      });
    });
  }

  assignParticipants(): void {
    const ueId = this.route.snapshot.paramMap.get('id');
    if (!ueId) return;

    const selectedIds = this.users
      .filter(u => u.selected)
      .map(u => u._id);

    this.http.post(apiUrls.ue + 'assign-participants', {
      ueId,
      participantIds: selectedIds
    }).subscribe({
      next: () => {
        alert('Participants mis à jour avec succès');
        this.fetchParticipants();
      },
      error: () => alert("Erreur lors de la mise à jour des participants")
    });
  }

  get filteredUsers() {
    return this.users.filter(user =>
      (user.nom + ' ' + user.prenom + ' ' + user.email)
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

}
