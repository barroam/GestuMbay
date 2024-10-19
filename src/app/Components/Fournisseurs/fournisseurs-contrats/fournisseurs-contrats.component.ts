import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../Services/Users/users.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../../Services/Storage/storage.service';

@Component({
  selector: 'app-fournisseurs-contrats',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,],
  templateUrl: './fournisseurs-contrats.component.html',
  styleUrl: './fournisseurs-contrats.component.css'
})
export class FournisseursContratsComponent implements OnInit {
  contrat: any;
  user: any; // Stocker les informations utilisateur
  errorMessage: string = '';

  constructor(private userService: UsersService, private storageService: StorageService) {} // Ajout du StorageService

  ngOnInit(): void {
    const userData: string | null = this.storageService.getLocalItem('user'); // Utilisation du StorageService

    if (userData) {
      try {
        this.user = userData; // Assure que les infos de l'utilisateur sont accessibles dans le template
        const userId: number = Number(this.user.id);

        console.log('ID utilisateur:', userId);

        if (userId) {
          this.userService.getContrat(userId).subscribe({
            next: (response) => {
              console.log('Réponse complète de l\'API:', response); // Utilisez cela pour voir la structure exacte des données

              // Supposons que 'response.contrats' soit un tableau
              if (response && Array.isArray(response.contrats)) {
                const contrats = response.contrats;

                if (contrats.length > 0) {
                  // Récupérer le dernier contrat
                  this.contrat = contrats[contrats.length - 1];
                  console.log('Dernier contrat:', this.contrat);
                } else {
                  this.errorMessage = 'Aucun contrat disponible pour cet utilisateur.';
                }
              } else {
                this.errorMessage = 'Format de données incorrect ou pas de contrats.';
              }
            },
            error: (err) => {
              console.error('Erreur lors de la récupération des contrats', err);
              this.errorMessage = 'Une erreur est survenue lors de la récupération des contrats.';
            }
          });
        } else {
          this.errorMessage = 'ID de l\'utilisateur non trouvé';
        }
      } catch (error) {
        this.errorMessage = 'Erreur de parsing des données utilisateur';
        console.error(this.errorMessage, error);
      }
    } else {
      this.errorMessage = 'Aucune donnée utilisateur trouvée dans le stockage.';
    }
  }

}