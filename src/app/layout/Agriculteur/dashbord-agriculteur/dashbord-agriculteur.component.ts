import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SidebarAgriculteurComponent } from "../sidebar-agriculteur/sidebar-agriculteur.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Users } from '../../../Models/users';
import { StorageService } from '../../../Services/Storage/storage.service';

@Component({
  selector: 'app-dashbord-agriculteur',
  standalone: true,
  imports: [SidebarAgriculteurComponent,RouterLink,RouterOutlet,RouterLinkActive],
  templateUrl: './dashbord-agriculteur.component.html',
  styleUrl: './dashbord-agriculteur.component.css'
})
export class DashbordAgriculteurComponent {
  user: Users | null = null; // Déclarer user comme null au départ

  constructor(private storageService: StorageService,
              @Inject(PLATFORM_ID) private platformId: Object) {} // Injectez le StorageService

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Vérifier si l'utilisateur existe dans localStorage
      const userData: string | null = this.storageService.getLocalItem('user');

      // Vérifier si l'utilisateur existe
      if (userData) {
        try {
          // Parser la chaîne JSON en objet de type 'Users'
          this.user = JSON.parse(userData) as Users;

          // Accéder à la propriété 'name' de l'utilisateur
          const name: string = this.user.name;
          console.log(name);
        } catch (error) {
          console.error('Erreur lors du parsing des données de l\'utilisateur:', error);
        }
      } else {
        console.log('Utilisateur non trouvé dans localStorage');
      }
    }
  } 
}