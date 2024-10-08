import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Engrais } from '../../Models/engrais';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { apiUrl } from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class EngraisService {
    constructor(private http: HttpClient) {}
  
    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('access_token');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
  
    getEngrais(): Observable<Engrais[]> {
      return this.http.get<Engrais[]>(`${apiUrl}/engrais`, { headers: this.getHeaders() })
        .pipe(
          tap(response => console.log('Réponse de l\'API:', response)),
          catchError(error => {
            console.error('Erreur lors de la récupération des engrais:', error);
            return of([]); // Retourne un tableau vide en cas d'erreur
          })
        );
    }
  
    getEngraisById(id: number): Observable<Engrais> {
      return this.http.get<Engrais>(`${apiUrl}/engrais/${id}`, { headers: this.getHeaders() })
        .pipe(catchError(error => {
          console.error(`Erreur lors de la récupération de l'engrais ${id}:`, error);
          throw error;
        }));
    }
  
    createEngrais(engrais: Omit<Engrais, 'id' | 'created_at' | 'updated_at'>): Observable<Engrais> {
      return this.http.post<Engrais>(`${apiUrl}/engrais`, engrais, { headers: this.getHeaders() })
        .pipe(
          tap(response => console.log('Réponse de l\'API:', response)),
          catchError(error => {
            console.error('Erreur lors de la création de l\'engrais:', error);
            throw error;
          })
        );
    }
  
    updateEngrais(id: number, engrais: Partial<Engrais>): Observable<Engrais> {
      return this.http.put<{ data: Engrais }>(`${apiUrl}/engrais/${id}`, engrais, { headers: this.getHeaders() })
        .pipe(
          map(response => response.data),
          catchError(error => {
            console.error(`Erreur lors de la mise à jour de l'engrais ${id}:`, error);
            throw error;
          })
        );
    }
  
    deleteEngrais(id: number): Observable<void> {
      return this.http.delete<void>(`${apiUrl}/engrais/${id}`, { headers: this.getHeaders() })
        .pipe(
          catchError(error => {
            console.error(`Erreur lors de la suppression de l'engrais ${id}:`, error);
            throw error;
          })
        );
    }
  }
