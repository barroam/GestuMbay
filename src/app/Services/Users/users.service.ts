import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { apiUrl } from '../api-url';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  // Obtient les en-têtes pour les requêtes HTTP
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  // Assigner des permissions à un ROA
  assignPermissionsToROA(permissions: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/assign-permissions-to-roa`, permissions, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Permissions assignées:', response)),
        catchError(this.handleError<any>('assignPermissionsToROA'))
      );
  }

  // Met à jour le profil de l'utilisateur
  updateProfile(profileData: any): Observable<any> {
    return this.http.put<any>(`${apiUrl}/profile/update-profile`, profileData, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Profil mis à jour:', response)),
        catchError(this.handleError<any>('updateProfile'))
      );
  }

  // Récupère les informations de l'utilisateur connecté
  getProfile(): Observable<any> {
    return this.http.post<any>(`${apiUrl}/profile/me`, {}, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Informations utilisateur:', response)),
        catchError(this.handleError<any>('getProfile'))
      );
  }

  // Récupère les utilisateurs par rôle
  getUsersByRole(roleName: string): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}/users/role/${roleName}`, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Utilisateurs par rôle:', response)),
        catchError(this.handleError<any[]>('getUsersByRole', []))
      );
  }

  // Récupère un utilisateur par rôle et ID
  getUserByRoleAndId(role: string, id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/users/role/${role}/user/${id}`, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Utilisateur par rôle et ID:', response)),
        catchError(this.handleError<any>(`getUserByRoleAndId role=${role} id=${id}`))
      );
  }

  // Récupère les rôles avec des utilisateurs uniques
  getRolesWithUniqueUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}/roles/users`, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Rôles avec utilisateurs uniques:', response)),
        catchError(this.handleError<any[]>('getRolesWithUniqueUsers', []))
      );
  }

  // Supprime un utilisateur
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/user/delete/${id}`, { headers: this.getHeaders() })
      .pipe(
        tap(() => console.log(`Utilisateur supprimé id=${id}`)),
        catchError(this.handleError<void>(`deleteUser id=${id}`))
      );
  }

  // Gestion des erreurs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Erreur lors de l'opération ${operation}:`, error);
      return of(result as T);
    };
  }
}
