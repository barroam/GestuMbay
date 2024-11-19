import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Router, RouterOutlet } from '@angular/router';

import { UsersService } from '../../Services/Users/users.service';
import { AuthService } from '../../Services/Auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashbord-admin',
  standalone: true,
  imports: [ CommonModule,SidebarComponent,RouterOutlet],
  templateUrl: './dashbord-admin.component.html',
  styleUrl: './dashbord-admin.component.css'
})
export class DashbordAdminComponent {
  username: string | null = null;
  isAuthenticated= false;
  showModal = false;
  constructor(private UsersService : UsersService,
    private authService: AuthService,
    private router:Router,
  ) {
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
    this.router.navigate(['']);
  });
}}
