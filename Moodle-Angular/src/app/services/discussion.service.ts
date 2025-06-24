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

  supprimerForumMessage(idUe: string | null, forumId: string): Observable<any> {
    return this.http.delete(apiUrls.ue + `delete-forum/${idUe}/${forumId}`);
  }

  supprimerForumReponse(idUe: string | null, forumId: string, replyId: string): Observable<any> {
    return this.http.delete(apiUrls.ue + `delete-reply/${idUe}/${forumId}/${replyId}`);
  }

  editForumMessage(idUe: string | null, forumId: string, newSujet: any): Observable<any> {
    return this.http.patch(apiUrls.ue + `edit-forum/${idUe}/${forumId}`, newSujet);
  }

  editForumReply(idUe: string | null, forumId: string, replyId: string, newMessage: any): Observable<any> {
    return this.http.patch(apiUrls.ue + `edit-reply/${idUe}/${forumId}/${replyId}`, newMessage);
  }
}
