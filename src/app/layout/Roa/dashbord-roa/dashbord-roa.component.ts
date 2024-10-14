import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Users } from '../../../Models/users';
import { SidebarRoaComponent } from '../sidebar-roa/sidebar-roa.component';


@Component({
  selector: 'app-dashbord-roa',
  standalone: true,
  imports: [RouterOutlet, RouterLink,SidebarRoaComponent ],
  templateUrl: './dashbord-roa.component.html',
  styleUrl: './dashbord-roa.component.css'
})
export class DashbordRoaComponent {
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
  } }