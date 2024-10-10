import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { apiUrl } from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  constructor(private http: HttpClient) {}

  // Obtient les en-têtes pour les requêtes HTTP
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Récupère tous les avis
  getAvis(): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}/avis`, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Réponse de l\'API:', response)),
        catchError(this.handleError<any[]>('getAvis', []))
      );
  }

  // Récupère un avis par ID
  getAvisById(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/avis/${id}`, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Avis récupéré:', response)),
        catchError(this.handleError<any>('getAvisById'))
      );
  }

  // Crée un nouvel avis
  createAvis(avisData: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/avis`, avisData, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Nouvel avis créé:', response)),
        catchError(this.handleError<any>('createAvis'))
      );
  }

  // Met à jour un avis existant
  updateAvis(id: number, avisData: any): Observable<any> {
    return this.http.put<any>(`${apiUrl}/avis/${id}`, avisData, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Avis mis à jour:', response)),
        catchError(this.handleError<any>('updateAvis'))
      );
  }

  // Supprime un avis
  deleteAvis(id: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/avis/${id}`, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Avis supprimé:', response)),
        catchError(this.handleError<any>('deleteAvis'))
      );
  }

  // Gestion des erreurs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} a échoué: ${error.message}`);
      return throwError(error);
    };
  }
}