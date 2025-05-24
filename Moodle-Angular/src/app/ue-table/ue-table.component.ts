import { Component } from '@angular/core';

@Component({
  selector: 'app-ue-table',
  templateUrl: './ue-table.component.html',
  styleUrls: ['./ue-table.component.css'],
})
export class UETableComponent {
  ues = [
    { code: 'IT44', name: 'Analyse Numérique', image: 'math.jpg' },
    { code: 'SI40', name: "Système d'information", image: 'physics.jpg' },
    { code: 'SY43', name: 'Android Developpement', image: 'chemistry.jpg' },
    { code: 'DE52', name: 'Génie logiciel', image: 'chemistry.jpg' },
    {
      code: 'SY41',
      name: 'Informatique embarquée et robotique: Microprocesseurs et microcontrolleurs',
      image: 'chemistry.jpg',
    },
    { code: 'WE4B', name: 'Technologies WEB avancées', image: 'chemistry.jpg' },
    { code: 'VA51', name: "Traitement de l'image", image: 'chemistry.jpg' },
    { code: 'RS40', name: 'Réseaux et Cybersécurité', image: 'chemistry.jpg' },
    { code: 'HM40', name: 'Interface Homme Machine', image: 'chemistry.jpg' },
  ];

  constructor() {}

  // Additional methods for handling UE-related actions can be added here
}
