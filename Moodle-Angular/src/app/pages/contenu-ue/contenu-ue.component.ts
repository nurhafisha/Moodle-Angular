import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UeService } from 'src/app/services/ue.service'
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-contenu-ue',
  templateUrl: './contenu-ue.component.html',
  styleUrls: ['./contenu-ue.component.css'],
})
export class ContenuUeComponent implements OnInit {
  selectedTab: string = 'post';
  ueId: string | null = null;
  ueData: any = null;
  userRole: string | null = null;


  selectedCodeUeToDelete: string = '';

  constructor(
    private route: ActivatedRoute,
    private ueService: UeService,
    private adminService: AdminService,
    private router: Router
  ) {
    this.ueId = this.route.snapshot.paramMap.get('id');
    if (this.ueId) {
      this.fetchUeData();
    }
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');    
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
  
  fetchUeData(): void {
    this.ueService.getUeData(this.ueId).subscribe(data => {
      if (data?.forums) {
        data.forums.sort((a: any, b: any) => new Date(b.datetime_publier).getTime() - new Date(a.datetime_publier).getTime());
      }
      this.ueData = data;
    });
  }
  deleteUe(codeUe: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      this.adminService.deleteUe(codeUe).subscribe(() => {
        this.router.navigate(['/mes-cours']);
      });
    }
  }
  openDeleteModal(codeUe: string) {
    this.selectedCodeUeToDelete = codeUe;
  }

  confirmDeleteUe() {
    this.adminService.deleteUe(this.selectedCodeUeToDelete).subscribe(() => {
      this.router.navigate(['/mes-cours']);
    });
  }
}