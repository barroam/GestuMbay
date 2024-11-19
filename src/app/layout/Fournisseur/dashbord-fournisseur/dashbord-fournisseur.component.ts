import { Component} from '@angular/core';
import { SidebarFournisseurComponent } from "../sidebar-fournisseur/sidebar-fournisseur.component";
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UsersService } from '../../../Services/Users/users.service';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-dashbord-fournisseur',
  standalone: true,
  imports: [CommonModule,SidebarFournisseurComponent,RouterOutlet,CommonModule],
  templateUrl: './dashbord-fournisseur.component.html',
  styleUrl: './dashbord-fournisseur.component.css'
})
export class DashbordFournisseurComponent{
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
}
}
