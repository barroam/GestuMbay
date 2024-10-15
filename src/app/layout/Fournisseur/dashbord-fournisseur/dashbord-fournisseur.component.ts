import { Component } from '@angular/core';
import { SidebarFournisseurComponent } from "../sidebar-fournisseur/sidebar-fournisseur.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
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

  constructor(private storageService: StorageService) {} // Injectez le StorageService

  ngOnInit(): void {
    // Vérifier si l'utilisateur existe dans localStorage
    const userData: string | null = this.storageService.getLocalItem('user');

    // Vérifier si l'utilisateur existe
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
