import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenu-ue',
  templateUrl: './contenu-ue.component.html',
  styleUrls: ['./contenu-ue.component.css']
})
export class ContenuUeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedTab = 'post';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

}