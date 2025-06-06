import { Component, Input, OnInit } from '@angular/core';
import { UeService } from 'src/app/services/ue.service'

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {
  @Input() forums: any[] = [];
  usersMap: { [id: string]: string } = {};

  constructor(private ueService: UeService) {}

  ngOnInit(): void {
    this.ueService.getUserData().subscribe(usersMap => {
      this.usersMap = Object.fromEntries(usersMap);
      console.log(this.usersMap);
    });
  }

  getUserPrenom(userObj: any): string {
    const id = userObj?.$oid || userObj;
    return this.usersMap[id] || 'Utilisateur inconnu';
  }

}
