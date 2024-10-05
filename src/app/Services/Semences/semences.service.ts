import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Semences } from '../../Models/semences';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { apiUrl } from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class SemencesService {

  constructor(private http: HttpClient) {}

  // Récupérer les en-têtes avec le token d'authentification
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getSemences(): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}/semences`, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Réponse de l\'API:', response)), // Affiche la réponse de l'API
        catchError(error => {
          console.error('Erreur lors de la récupération des semences:', error);
          return of([]); // Retourne un tableau vide en cas d'erreur
        })
      );
  }
  
  
  // Récupérer une semence par son ID
  getSemenceById(id: number): Observable<Semences> {
    return this.http.get<Semences>(`${apiUrl}/semences/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération de la semence ${id}:`, error);
          throw error;
        })
      );
  }

  // Créer une nouvelle semence
  createSemence(semence: Omit<Semences, 'id' | 'created_at' | 'updated_at'>): Observable<Semences> {
    return this.http.post<Semences>(`${apiUrl}/semences`, semence, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Réponse de l\'API:', response)),
        catchError(error => {
          console.error('Erreur lors de la création de la semence:', error);
          throw error;
        })
      );
  }

  // Mettre à jour une semence existante
  updateSemence(id: number, semence: Partial<Semences>): Observable<Semences> {
    return this.http.put<{ data: Semences }>(`${apiUrl}/semences/${id}`, semence, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error(`Erreur lors de la mise à jour de la semence ${id}:`, error);
          throw error;
        })
      );
  }

  // Supprimer une semence
  deleteSemence(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/semences/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la suppression de la semence ${id}:`, error);
          throw error;
        })
      );
  }
}