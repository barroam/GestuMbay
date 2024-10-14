import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { Users } from '../../Models/users';

@Component({
  selector: 'app-dashbord-admin',
  standalone: true,
  imports: [ SidebarComponent,RouterOutlet],
  templateUrl: './dashbord-admin.component.html',
  styleUrl: './dashbord-admin.component.css'
})
export class DashbordAdminComponent {
  user: Users | null = null; // Déclarer user comme null au départ

  constructor() {}

  ngOnInit(): void {
    // Récupérer l'utilisateur de localStorage
    const userData: string | null = localStorage.getItem('user');

    // Vérifier si l'utilisateur existe dans localStorage
    if (userData) {
      // Parser la chaîne JSON en objet de type 'Users'
      this.user = JSON.parse(userData) as Users;

      // Accéder à la propriété 'name' de l'utilisateur
      const name: string = this.user.name;
      console.log(name);
    } else {
      console.log('Utilisateur non trouvé dans localStorage');
    }
  }
}
