import { UsersService } from './../../Services/Users/users.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: string | null = null;
  isAuthenticated= false;
  showModal = false; 
  constructor(private UsersService : UsersService,
    private authService: AuthService
  ) {
    // Vérifier si l'utilisateur est connecté
    this.UsersService.getUserInfo().subscribe((userInfo) => {
      if (userInfo && userInfo.name) {
        this.isAuthenticated = true;
        this.username = userInfo.name;
      } else {
        this.isAuthenticated = false;  // Si la réponse est null, l'utilisateur n'est pas connecté
      }
    });
  }

  openModal() {
    this.showModal = true;
  }

  // Fermer le modal
  closeModal() {
    this.showModal = false;
  }

  // Déconnexion
  logout() {
    this.authService.logout().subscribe(() => {
      this.isAuthenticated = false;
      this.username = null;
      this.closeModal();
    });
  }
}
