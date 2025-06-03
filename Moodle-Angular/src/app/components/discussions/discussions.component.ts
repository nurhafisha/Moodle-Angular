import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {
  @Input() forums: any[] = [];
  usersMap: { [id: string]: string } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8800/backend/user', { withCredentials: true })
      .subscribe({
        next: (res) => {
          for (const user of res.data) {
            this.usersMap[user._id.$oid || user._id] = user.prenom +' '+ user.nom;
          }
        },
        error: (err) => console.error('Erreur lors du chargement des utilisateurs :', err)
      });
  }

  getUserPrenom(userObj: any): string {
    const id = userObj?.$oid || userObj;
    return this.usersMap[id] || 'Utilisateur inconnu';
  }
}
