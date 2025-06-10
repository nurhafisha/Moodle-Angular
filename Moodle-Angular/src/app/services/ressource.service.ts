import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from '../backend_urls';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  constructor(private http: HttpClient) {}
  
  ajouterRessource(idUe: string | null, formData: FormData): Observable<any> {
    return this.http.post(apiUrls.ue + `new-ressource/${idUe}`, formData);
  }

  deleteRessource(ueId: string | null, ressourceId: string): Observable<any> {
    return this.http.delete(apiUrls.ue + `${ueId}/ressource/${ressourceId}`);
  }
}
