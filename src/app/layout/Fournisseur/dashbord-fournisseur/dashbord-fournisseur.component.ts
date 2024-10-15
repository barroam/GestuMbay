import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SidebarFournisseurComponent } from "../sidebar-fournisseur/sidebar-fournisseur.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Users } from '../../../Models/users';
import { StorageService } from '../../../Services/Storage/storage.service';

@Component({
  selector: 'app-dashbord-fournisseur',
  standalone: true,
  imports: [SidebarFournisseurComponent,RouterOutlet,CommonModule],
  templateUrl: './dashbord-fournisseur.component.html',
  styleUrl: './dashbord-fournisseur.component.css'
})
export class DashbordFournisseurComponent {
  user: Users | null = null; // Déclarer user comme null au départ

  constructor(private storageService: StorageService,
              @Inject(PLATFORM_ID) private platformId: Object) {} // Injection du StorageService et de PLATFORM_ID

  ngOnInit(): void {
    // Vérifier si nous sommes sur une plateforme de navigateur
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
    } else {
      console.log('Ce code ne s\'exécute pas dans un navigateur.');
    }
  }
}