import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UsersService } from '../../../Services/Users/users.service';
import { PartageServicesService } from '../../../Services/partageServices/partage-services.service';
import { StorageService } from '../../../Services/Storage/storage.service';

@Component({
  selector: 'app-fournisseurs-dashbord',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './fournisseurs-dashbord.component.html',
  styleUrl: './fournisseurs-dashbord.component.css'
})
export class FournisseursDashbordComponent {
  contrat: any;
  user: any; // Stocker les informations utilisateur
  errorMessage: string = '';
  ressourceId: any;
  projetId: any;

  constructor(
    private userService: UsersService,
    private partageService: PartageServicesService,
    private storageService: StorageService // Injecter le service de stockage
  ) {}

  ngOnInit(): void {
    const userData: string | null = this.storageService.getLocalItem('user'); // Utiliser le service de stockage

    if (userData) {
      try {
        this.user = JSON.parse(userData); // Assure que les infos de l'utilisateur sont accessibles dans le template
        const userId: number = Number(this.user.id);

        console.log('ID utilisateur:', userId);

        if (userId) {
          this.userService.getContrat(userId).subscribe({
            next: (response) => {
              console.log('Réponse complète de l\'API:'); // Utilisez cela pour voir la structure exacte des données

              // Supposons que 'response.contrats' soit un tableau
              if (response && Array.isArray(response.contrats)) {
                const contrats = response.contrats;
                console.log('Contrats:', contrats);
                if (contrats.length > 0) {
                  // Récupérer le dernier contrat
                  this.contrat = contrats[contrats.length - 1];
                  this.ressourceId = this.contrat.ressource_id; // Stocker l'ID de la ressource
                  this.projetId = this.contrat.projet_id; 
                  this.partageService.setRessourceId(this.contrat.ressource_id);
                  this.partageService.setProjetId(this.contrat.projet_id);
                  // console.log('Dernier contrat:', this.contrat);
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