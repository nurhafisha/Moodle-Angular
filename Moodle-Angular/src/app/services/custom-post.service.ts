import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from '../backend_urls';

@Injectable({
  providedIn: 'root'
})
export class CustomPostService {

  constructor(private http: HttpClient) { }

  addCustomSection(id_ue: string | null, sectionName: any): Observable<any> {
    return this.http.post(apiUrls.ue + `${id_ue}/custom-section`, {sectionName: sectionName});
  }

  addCustomPost(idUe: string | null, formData: FormData): Observable<any> {
    return this.http.post(apiUrls.ue + `${idUe}/custom-post`, formData);
  }

  deleteCustom(ueId: string | null, customId: string): Observable<any> {
    return this.http.delete(apiUrls.ue + `${ueId}/custom/${customId}`);
  }
}
