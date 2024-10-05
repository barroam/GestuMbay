import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoDemande } from '../../Models/info-demande';
import { catchError, map, Observable, tap } from 'rxjs';
import { apiUrl } from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class InfoDemandesService {

  constructor(private http: HttpClient) {}

   // Récupérer les en-têtes avec le token d'authentification
   private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Récupérer toutes les demandes
  getInfoDemandes(): Observable<InfoDemande[]> {
    return this.http.get<{ data: InfoDemande[] }>(`${apiUrl}/info-demandes`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Erreur lors de la récupération des demandes:', error);
          throw error; // ou retournez un Observable avec une valeur par défaut
        })
      );
  }
  
  getInfoDemandeById(id: number): Observable<InfoDemande> {
    return this.http.get<InfoDemande>(`${apiUrl}/info-demandes/${id}`, { headers: this.getHeaders() })
        .pipe(
            catchError(error => {
                console.error(`Erreur lors de la récupération de la demande ${id}:`, error);
                throw error;
            })
        );
}


  // Créer une nouvelle demande
  createInfoDemande(infoDemande: InfoDemande): Observable<InfoDemande> {
    return this.http.post<InfoDemande>(`${apiUrl}/info-demandes`, infoDemande, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Réponse de l\'API:', response)), // Ajoutez cette ligne pour déboguer
        catchError(error => {
          console.error('Erreur lors de la création de la demande:', error);
          throw error;
        })
      );
  }
  

  // Mettre à jour une demande existante
  updateInfoDemande(id: number, infoDemande: InfoDemande): Observable<InfoDemande> {
    return this.http.put<{ data: InfoDemande }>(`${apiUrl}/info-demandes/${id}`, infoDemande, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error(`Erreur lors de la mise à jour de la demande ${id}:`, error);
          throw error;
        })
      );
  }

  // Supprimer une demande
  deleteInfoDemande(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/info-demandes/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la suppression de la demande ${id}:`, error);
          throw error;
        })
      );
  }
}