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
    console.log('here', id_ue);
    console.log('here', sectionName);
    return this.http.post(apiUrls.ue + `${id_ue}/custom-section`, {sectionName: sectionName});
  }
}
