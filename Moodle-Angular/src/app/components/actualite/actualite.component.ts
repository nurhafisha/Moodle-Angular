import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit {

  notifications = [
    {
      message: 'WE4B: Nouveau message envoye par M.KAS - Annulation de cours',
      time: '08:45 - 12/03/2025',
      link: '#'
    },
    {
      message: 'RN40: Nouveau fichier partage par M.KAJO - Sujet de TP3',
      time: '10:22 - 10/03/2025',
      link: '#'
    },
    {
      message: 'RN41: Nouveau message envoye par M.JALLAL - Formulaire a remplir',
      time: '12:30 - 12/02/2025',
      link: '#'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
