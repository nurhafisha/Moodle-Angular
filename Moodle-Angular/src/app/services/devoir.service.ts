import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from '../backend_urls';

@Injectable({
  providedIn: 'root'
})
export class DevoirService {

  constructor(private http: HttpClient) {}

  ajouterDevoir(idUe: string | null, formData: FormData): Observable<any> {
    return this.http.post(apiUrls.ue + `new-devoir/${idUe}`, formData);
  }

  deleteDevoir(ueId: string | null, devoirId: string): Observable<any> {
    return this.http.delete(apiUrls.ue + `${ueId}/devoir/${devoirId}`);
  }
}
