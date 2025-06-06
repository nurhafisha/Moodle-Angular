import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UeService {
  private apiUrl = 'http://localhost:8800/backend/ues'; 

  constructor(private http: HttpClient) {}

  getAllUes() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
