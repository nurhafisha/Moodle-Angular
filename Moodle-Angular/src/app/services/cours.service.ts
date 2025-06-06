import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from '../backend_urls';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(private http: HttpClient) { }

  ajouterCours(idUe: string | null, formData: FormData): Observable<any> {
    return this.http.post(apiUrls.ue + `new-cours/${idUe}`, formData);
  }

  deleteCours(ueId: string | null, coursId: string): Observable<any> {
    return this.http.delete(apiUrls.ue + `${ueId}/cours/${coursId}`);
  }
}
