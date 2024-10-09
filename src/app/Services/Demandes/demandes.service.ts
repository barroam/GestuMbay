import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demandes } from '../../Models/demandes';
import { apiUrl } from '../api-url';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandesService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Récupérer toutes les demandes
  getDemandes(): Observable<Demandes[]> {
    return this.http.get<Demandes[]>(`${apiUrl}/demandes`, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Réponse de l\'API:', response)),
        catchError(error => {
          console.error('Erreur lors de la récupération des demandes:', error);
          return of([]); // Retourne un tableau vide en cas d'erreur
        })
      );
  }

  // Récupérer une demande par ID
  getDemande(id: number): Observable<Demandes> {
    return this.http.get<Demandes>(`${apiUrl}/demandes/${id}`, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Demande récupérée:', response)),
        catchError(error => {
          console.error('Erreur lors de la récupération de la demande:', error);
          return of({} as Demandes); // Retourne un objet vide en cas d'erreur
        })
      );
  }

  // Créer une nouvelle demande
  createDemande(demande: Demandes): Observable<Demandes> {
    return this.http.post<Demandes>(`${apiUrl}/demandes`, demande, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Demande créée:', response)),
        catchError(error => {
          console.error('Erreur lors de la création de la demande:', error);
          return of({} as Demandes); // Retourne un objet vide en cas d'erreur
        })
      );
  }

  // Mettre à jour une demande existante
  updateDemande(id: number, demande: Demandes): Observable<Demandes> {
    return this.http.put<Demandes>(`${apiUrl}/demandes/${id}`, demande, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Demande mise à jour:', response)),
        catchError(error => {
          console.error('Erreur lors de la mise à jour de la demande:', error);
          return of({} as Demandes); // Retourne un objet vide en cas d'erreur
        })
      );
  }

  // Supprimer une demande
  deleteDemande(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/demandes/${id}`, { headers: this.getHeaders() })
      .pipe(
        tap(() => console.log('Demande supprimée')),
        catchError(error => {
          console.error('Erreur lors de la suppression de la demande:', error);
          return of(); // Ne retourne rien en cas d'erreur
        })
      );
  }
}