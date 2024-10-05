import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControleDemande } from '../../Models/controle-demande';
import { catchError, map, Observable, tap } from 'rxjs';
import { apiUrl } from '../api-url';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControleDemandesService {

  constructor(private http: HttpClient) {}

  // Récupérer les en-têtes avec le token d'authentification
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Récupérer toutes les demandes de contrôle
  getControleDemandes(): Observable<ControleDemande[]> {
    return this.http.get<{ data: ControleDemande[] }>(`${apiUrl}/controle-demandes`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Erreur lors de la récupération des demandes de contrôle:', error);
          throw error; // Vous pouvez également renvoyer un Observable avec une valeur par défaut
        })
      );
  }

  getControleDemandeById(id: number): Observable<ControleDemande> {
    return this.http.get<ControleDemande>(`${apiUrl}/controle-demandes/${id}`, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Réponse de l\'API:', response)),  // Log complet de la réponse
        map(response => {
          if (response) {
            return response;  // Retourner directement la réponse si c'est un objet
          } else {
            throw new Error('Données manquantes dans la réponse de l\'API');
          }
        }),
        catchError(error => {
          console.error(`Erreur lors de la récupération de la demande de contrôle ${id}:`, error);
          return throwError(error);  // Retourne l'erreur
        })
      );
  }
  

  // Créer une nouvelle demande de contrôle
  createControleDemande(controleDemande: ControleDemande): Observable<ControleDemande> {
    return this.http.post<ControleDemande>(`${apiUrl}/controle-demandes`, controleDemande, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Réponse de l\'API:', response)),
        catchError(error => {
          console.error('Erreur lors de la création de la demande de contrôle:', error);
          throw error;
        })
      );
  }

  // Mettre à jour une demande de contrôle existante
  updateControleDemande(id: number, controleDemande: ControleDemande): Observable<ControleDemande> {
    return this.http.put<{ data: ControleDemande }>(`${apiUrl}/controle-demandes/${id}`, controleDemande, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error(`Erreur lors de la mise à jour de la demande de contrôle ${id}:`, error);
          throw error;
        })
      );
  }

  // Supprimer une demande de contrôle
  deleteControleDemande(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/controle-demandes/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la suppression de la demande de contrôle ${id}:`, error);
          throw error;
        })
      );
  }
}
