// src/app/services/projets.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

import { apiUrl } from '../api-url'; // Assurez-vous que ce fichier contient l'URL de votre API
import { Projets } from '../../Models/projets';

@Injectable({
  providedIn: 'root'
})
export class ProjetsService {

  constructor(private http: HttpClient) {}

  // Récupérer les en-têtes avec le token d'authentification
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Récupérer tous les projets
  getProjets(): Observable<Projets[]> {
    return this.http.get<{ data: Projets[] }>(`${apiUrl}/projets`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Erreur lors de la récupération des projets:', error);
          return throwError(error);
        })
      );
  }

  // Récupérer un projet par ID
  getProjetById(id: number): Observable<Projets> {
    return this.http.get<Projets>(`${apiUrl}/projets/${id}`, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Réponse de l\'API:', response)),
        catchError(error => {
          console.error(`Erreur lors de la récupération du projet ${id}:`, error);
          return throwError(error);
        })
      );
  }

  // Créer un nouveau projet
  createProjet(projet: Projets): Observable<Projets> {
    return this.http.post<Projets>(`${apiUrl}/projets`, projet, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Réponse de l\'API:', response)),
        catchError(error => {
          console.error('Erreur lors de la création du projet:', error);
          return throwError(error);
        })
      );
  }

  // Mettre à jour un projet existant
  updateProjet(id: number, projet: Projets): Observable<Projets> {
    return this.http.put<{ data: Projets }>(`${apiUrl}/projets/${id}`, projet, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error(`Erreur lors de la mise à jour du projet ${id}:`, error);
          return throwError(error);
        })
      );
  }

  // Supprimer un projet
  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/projets/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la suppression du projet ${id}:`, error);
          return throwError(error);
        })
      );
  }
}
