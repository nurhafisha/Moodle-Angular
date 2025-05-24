import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ue',
  templateUrl: './ue.component.html',
  styleUrls: ['./ue.component.css']
})
export class UeComponent implements OnInit {

  courses = [
    {
      title: 'RS40 Reseaux et Cybersecurite',
      color: '#FFD36E',
      link: '#'
    },
    {
      title: 'WE4B Technologies WEB avancees',
      color: '#FFD36E',
      link: '#'
    },
    {
      title: "SI40 Systeme d'information",
      color: '#FFD36E',
      link: '#'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
