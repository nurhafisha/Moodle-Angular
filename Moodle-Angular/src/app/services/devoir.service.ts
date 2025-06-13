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

  submitDepot(ueId: string | null , devoirId: string | null, file: File ,commentaire: string ): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('commentaire', commentaire);

    const token = localStorage.getItem('authToken');

    return this.http.post(
    `${apiUrls.ue}${ueId}/devoirs/${devoirId}/depots`,
    formData,{headers: { Authorization: `Bearer ${token}`}}
  );
}

  updateDepot(ueId: string, devoirId: string, depotId: string, updateData: any) {
    return this.http.put(`${apiUrls.ue}${ueId}/devoirs/${devoirId}/depots/${depotId}`, updateData);
  }

}
