import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../Services/Users/users.service';
import { PartageServicesService } from '../../../Services/partageServices/partage-services.service';

@Component({
  selector: 'app-agriculteurs-dashbord',
  standalone: true,
  imports: [],
  templateUrl: './agriculteurs-dashbord.component.html',
  styleUrl: './agriculteurs-dashbord.component.css'
})
export class AgriculteursDashbordComponent implements OnInit {
  contrat: any;
  user: any; // Stocker les informations utilisateur
  errorMessage: string = '';
  ressourceId:any;
  projetId:any;

  constructor(
    private userService: UsersService ,
    private partageService:PartageServicesService

  ) {}

  ngOnInit(): void {
    const userData: string | null = localStorage.getItem('user');

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
                console.log('Contrats:',);
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
      this.errorMessage = 'Aucune donnée utilisateur trouvée dans localStorage';
    }
  }
  }