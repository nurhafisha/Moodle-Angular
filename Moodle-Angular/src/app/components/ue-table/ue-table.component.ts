import { Component } from '@angular/core';

@Component({
  selector: 'app-ue-table',
  templateUrl: './ue-table.component.html',
  styleUrls: ['./ue-table.component.css'],
})
export class UETableComponent {
  ues = [
    { code: 'IT44', name: 'Analyse Numérique' },
    { code: 'SI40', name: "Système d'information" },
    { code: 'SY43', name: 'Android Developpement' },
    { code: 'DE52', name: 'Génie logiciel' },
    {
      code: 'SY41',
      name: 'Informatique embarquée et robotique: Microprocesseurs et microcontrolleurs',
    },
    { code: 'WE4B', name: 'Technologies WEB avancées' },
    { code: 'VA51', name: "Traitement de l'image" },
    { code: 'RS40', name: 'Réseaux et Cybersécurité' },
    { code: 'HM40', name: 'Interface Homme Machine' },
  ];

  constructor() {}

  // Additional methods for handling UE-related actions can be added here
}
