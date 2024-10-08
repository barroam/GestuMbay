import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipements } from '../../Models/equipements';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { apiUrl } from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class EquipementsService {
  constructor(private http: HttpClient) {}

  // Méthode pour récupérer le token de l'utilisateur et l'ajouter dans les en-têtes HTTP
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');  // Récupération du token stocké
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Ajout du token dans l'en-tête Authorization
    });
  }

  // Méthode pour récupérer la liste des équipements
  getEquipements(): Observable<Equipements[]> {
    return this.http.get<Equipements[]>(`${apiUrl}/equipements`, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Réponse de l\'API:', response)),  // Affiche la réponse de l'API
        catchError(error => {
          console.error('Erreur lors de la récupération des équipements:', error);  // Gérer les erreurs
          return of([]);  // Retourne un tableau vide en cas d'erreur
        })
      );
  }

  // Méthode pour récupérer un équipement par son ID
  getEquipementById(id: number): Observable<Equipements> {
    return this.http.get<Equipements>(`${apiUrl}/equipements/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération de l'équipement ${id}:`, error);  // Gérer les erreurs spécifiques
          throw error;
        })
      );
  }

  // Méthode pour créer un nouvel équipement (exclut les champs auto-générés comme id, created_at, etc.)
  createEquipement(equipement: Omit<Equipements, 'id' | 'created_at' | 'updated_at'>): Observable<Equipements> {
    return this.http.post<Equipements>(`${apiUrl}/equipements`, equipement, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Équipement créé avec succès:', response)),
        catchError(error => {
          console.error('Erreur lors de la création de l\'équipement:', error);
          throw error;
        })
      );
  }

  // Méthode pour mettre à jour un équipement existant
  updateEquipement(id: number, equipement: Partial<Equipements>): Observable<Equipements> {
    return this.http.put<{ data: Equipements }>(`${apiUrl}/equipements/${id}`, equipement, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),  // Extraire les données de la réponse
        catchError(error => {
          console.error(`Erreur lors de la mise à jour de l'équipement ${id}:`, error);
          throw error;
        })
      );
  }

  // Méthode pour supprimer un équipement par son ID
  deleteEquipement(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/equipements/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la suppression de l'équipement ${id}:`, error);
          throw error;
        })
      );
  }
}