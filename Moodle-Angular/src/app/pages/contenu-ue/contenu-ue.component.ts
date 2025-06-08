import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UeService } from 'src/app/services/ue.service'

@Component({
  selector: 'app-contenu-ue',
  templateUrl: './contenu-ue.component.html',
  styleUrls: ['./contenu-ue.component.css'],
})
export class ContenuUeComponent implements OnInit {
  selectedTab: string = 'post';
  ueId: string | null = null;
  ueData: any = null;

  constructor(
    private route: ActivatedRoute,
    private ueService: UeService
  ) {
    this.ueId = this.route.snapshot.paramMap.get('id');
    if (this.ueId) {
      this.fetchUeData();
    }
  }

  ngOnInit(): void {
    
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
  
  fetchUeData(): void {
    this.ueService.getUeData(this.ueId).subscribe(data => {
      data.cours?.sort((a: any, b: any) => new Date(b.datetime_publier).getTime() - new Date(a.datetime_publier).getTime());
      data.ressources?.sort((a: any, b: any) => new Date(b.datetime_publier).getTime() - new Date(a.datetime_publier).getTime());
      data.devoirs?.sort((a: any, b: any) => new Date(b.datetime_debut).getTime() - new Date(a.datetime_debut).getTime());
      data.forums?.sort((a: any, b: any) => new Date(b.datetime_publier).getTime() - new Date(a.datetime_publier).getTime());

      this.ueData = data;
      console.log('UE data (sorted):', this.ueData);
    });
  }
}