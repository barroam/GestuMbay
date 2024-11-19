import { Component } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { SidebarRoaComponent } from '../sidebar-roa/sidebar-roa.component';
import { UsersService } from '../../../Services/Users/users.service';
import { AuthService } from '../../../Services/Auth/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashbord-roa',
  standalone: true,
  imports: [RouterOutlet, SidebarRoaComponent,CommonModule ],
  templateUrl: './dashbord-roa.component.html',
  styleUrl: './dashbord-roa.component.css'
})
export class DashbordRoaComponent {
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
