import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { apiUrl } from '../api-url';
import { Contrats } from '../../Models/contrats';

@Injectable({
  providedIn: 'root'
})
export class ContratsService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getContrats(): Observable<Contrats[]> {
    return this.http.get<{ data: Contrats[] }>(`${apiUrl}/contrats`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error fetching contrats:', error);
          throw error;
        })
      );
  }

  getContratById(id: number): Observable<Contrats> {
    return this.http.get<Contrats>(`${apiUrl}/contrats/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error(`Error fetching contrat ${id}:`, error);
          throw error;
        })
      );
  }

  createContrat(contrat: Contrats): Observable<Contrats> {
    return this.http.post<Contrats>(`${apiUrl}/contrats`, contrat, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error creating contrat:', error);
          throw error;
        })
      );
  }

  updateContrat(id: number, contrat: Contrats): Observable<Contrats> {
    return this.http.put<{ data: Contrats }>(`${apiUrl}/contrats/${id}`, contrat, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error(`Error updating contrat ${id}:`, error);
          throw error;
        })
      );
  }

  deleteContrat(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/contrats/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error(`Error deleting contrat ${id}:`, error);
          throw error;
        })
      );
  }

  getProjets(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(`${apiUrl}/projets`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error fetching projets:', error);
          throw error;
        })
      );
  }

  getRessources(): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}/ressources`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error fetching ressources:', error);
          throw error;
        })
      );
  }
}