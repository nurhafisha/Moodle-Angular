import { Component, OnInit } from '@angular/core';
import { UeService } from '../../services/ue.service'; 

@Component({
  selector: 'app-choix-ue',
  templateUrl: './choix-ue.component.html',
  styleUrls: ['./choix-ue.component.css']
})
export class ChoixUeComponent implements OnInit {
  ues: any[] = [];

  constructor(private ueService: UeService) {}

  ngOnInit(): void {
    this.ueService.getAllUes().subscribe({
      next: (data) => {
        console.log("UEs loaded:", data); 
        this.ues = data;
      },
      error: (err) => {
        console.error("Failed to load UEs:", err);
      }
    });
  }
}
