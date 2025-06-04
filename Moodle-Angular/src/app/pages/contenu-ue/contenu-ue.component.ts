import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from 'src/app/backend_urls';

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
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.ueId = this.route.snapshot.paramMap.get('id');
    if (this.ueId) {
      this.fetchUeData();
    }
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
  
  fetchUeData(): void {
    this.http.get<any>(apiUrls.ue+`${this.ueId}`, { withCredentials: true })
      .subscribe({
        next: (res) => {
          // Adjust based on actual API response
          this.ueData = res.data ?? res; 
        },
        error: (err) => {
          console.error('Failed to fetch UE data:', err);
        }
      });
  }
}