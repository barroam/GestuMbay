import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../api-url'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Méthode pour se connecter
  login(identifiant: { email: string; password: string }): Observable<any> {
    return this.http.post(`${apiUrl}/auth/login`, identifiant);
  }

  // Méthode pour s'inscrire
  register(identifiant: { name: string; email: string; password: string; password_confirmation: string; role: string }): Observable<any> {
    return this.http.post(`${apiUrl}/auth/register`, identifiant);
  }

  // Méthode pour se déconnecter
  logout(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${apiUrl}/auth/logout`, {}, { headers });
  }

  // Méthode pour rafraîchir le token
  refresh(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${apiUrl}/auth/refresh`, {}, { headers });
  }

  // Méthode pour obtenir le token
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Méthode pour enregistrer le token
  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  // Méthode pour supprimer le token
  removeToken(): void {
    localStorage.removeItem('access_token');
  }
}
