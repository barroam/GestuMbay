import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { apiUrl } from '../api-url';

@Injectable({
  providedIn: 'root',
})
export class RessourcesService {
  constructor(private http: HttpClient) {}

  // Obtient les en-têtes pour les requêtes HTTP
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  // Récupère toutes les ressources
  getRessources(): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}/ressources`, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Réponse de l\'API:', response)),
        catchError(this.handleError<any[]>('getRessources', []))
      );
  }

  // Récupère une ressource par ID
  getRessourceById(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/ressources/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError<any>(`getRessourceById id=${id}`)));
  }

  // Crée une nouvelle ressource
  createRessource(ressource: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/ressources`, ressource, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Ressource créée:', response)),
        catchError(this.handleError<any>('createRessource'))
      );
  }

  // Met à jour une ressource existante
  updateRessource(id: number, ressource: any): Observable<any> {
    return this.http.put<any>(`${apiUrl}/ressources/${id}`, ressource, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError<any>(`updateRessource id=${id}`))
      );
  }

  // Supprime une ressource
  deleteRessource(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/ressources/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError<void>(`deleteRessource id=${id}`)));
  }

  // Gestion des erreurs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Erreur lors de l'opération ${operation}:`, error);
      return of(result as T); // Retourne un résultat par défaut en cas d'erreur
    };
  }
}
