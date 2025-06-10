import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from '../backend_urls';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  constructor(private http: HttpClient) { }

  ajouterForumMessage(idUe: string | null, message: any): Observable<any> {
    return this.http.post(apiUrls.ue + `new-forum/${idUe}`, message);
  }

  ajouterForumReponse(idUe: string | null, reply: any): Observable<any> {
    return this.http.post(apiUrls.ue + `new-reply/${idUe}/${reply.forumId}`, reply);
  }
}
