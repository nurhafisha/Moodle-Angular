import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ue',
  templateUrl: './ue.component.html',
  styleUrls: ['./ue.component.css'],
})
export class UeComponent implements OnInit {
  courses = [
    {
      title: 'RS40 Reseaux et Cybersecurite',
      color: '#FFD36E',
      link: 'mes-cours',
    },
    {
      title: 'WE4B Technologies WEB avancees',
      color: '#FFD36E',
      link: 'mes-cours',
    },
    {
      title: "SI40 Systeme d'information",
      color: '#FFD36E',
      link: 'mes-cours',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
