import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atelier } from '../models/atelier.model';
import { User } from '../models/user.model';

export interface AtelierParticipants {
  atelier_id: number;
  titre: string;
  participants: User[];
}

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  private apiUrl = 'http://127.0.0.1:8000/api/formateurs';

  constructor(private http: HttpClient) {}

  // Récupérer les ateliers animés par un formateur
  getMesAteliers(formateurId: number): Observable<Atelier[]> {
    return this.http.get<Atelier[]>(
      `${this.apiUrl}/${formateurId}/ateliers`
    );
  }

  // Récupérer les participants des ateliers du formateur
  getParticipantsAteliers(formateurId: number): Observable<AtelierParticipants[]> {
    return this.http.get<AtelierParticipants[]>(
      `${this.apiUrl}/${formateurId}/participants`
    );
  }



    getMesParticipants(formateurId: number): Observable<any[]> {
    return this.http.get<any[]>(
        `${this.apiUrl}/${formateurId}/participants`
    );
    }
}