import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atelier } from '../models/atelier.model';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class AtelierService {

  private apiUrl = 'http://127.0.0.1:8000/api/ateliers';

  constructor(private http: HttpClient) {}

  
  getAteliers(): Observable<Atelier[]> {
    return this.http.get<Atelier[]>(this.apiUrl);
  }

  getAtelier(id: number): Observable<Atelier> {
    return this.http.get<Atelier>(`${this.apiUrl}/${id}`);
  }
  
  addAtelier(atelier: Atelier): Observable<Atelier> {
    return this.http.post<Atelier>(this.apiUrl, atelier);
  }

 
  updateAtelier(id: number, atelier: Atelier): Observable<Atelier> {
    return this.http.put<Atelier>(`${this.apiUrl}/${id}`, atelier);
  }

  
  deleteAtelier(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  
  getFormateurs(): Observable<User[]> {
    return this.http.get<User[]>('http://127.0.0.1:8000/api/formateurs');
  }

  associerFormateur(atelierId: number, formateurId: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${atelierId}/formateur`,
      { formateur_id: formateurId }
    );
  }



  
  getParticipants(atelierId: number): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}/${atelierId}/participants`
    );
  }



  
}