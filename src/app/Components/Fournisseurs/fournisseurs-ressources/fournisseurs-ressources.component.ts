import { Component, OnInit } from '@angular/core';
import { RessourcesService } from '../../../Services/Ressources/ressources.service';
import { PartageServicesService } from '../../../Services/partageServices/partage-services.service';
import { Router } from '@angular/router';
import { UsersService } from '../../../Services/Users/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fournisseurs-ressources',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './fournisseurs-ressources.component.html',
  styleUrl: './fournisseurs-ressources.component.css'
})
export class FournisseursRessourcesComponent implements OnInit {
  semences: any[] = [];
  engrais: any[] = [];
  equipements: any[] = [];
  errorMessage: string = '';
  contrat: any;
  user: any; // Stocker les informations utilisateur

  ressourceId: any;
  projetId: any;

  constructor(
    private ressourcesService: RessourcesService,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    // Récupérer les données utilisateur depuis le localStorage
    const userData: string | null = localStorage.getItem('user');

    if (userData) {
      try {
        this.user = JSON.parse(userData); // Convertir en JSON
        const userId: number = Number(this.user.id);

        if (userId) {
          // Récupérer les contrats de l'utilisateur
          this.userService.getContrat(userId).subscribe({
            next: (response) => {
              if (response && Array.isArray(response.contrats)) {
                const contrats = response.contrats;

                if (contrats.length > 0) {
                  // Récupérer le dernier contrat
                  this.contrat = contrats[contrats.length - 1];
                  this.ressourceId = this.contrat.ressource_id;
                  this.projetId = this.contrat.projet_id;

                  // Charger les détails de la ressource à partir de l'ID récupéré
                  this.chargerDetailsRessource(this.ressourceId);
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
          this.errorMessage = 'ID de l\'utilisateur non trouvé.';
        }
      } catch (error) {
        this.errorMessage = 'Erreur de parsing des données utilisateur';
        console.error(this.errorMessage, error);
      }
    } else {
      this.errorMessage = 'Aucune donnée utilisateur trouvée dans localStorage.';
    }
  }

  chargerDetailsRessource(ressourceId: number): void {
    // Charger les détails de la ressource à partir de son ID
    this.ressourcesService.getRessourceById(ressourceId).subscribe(
      (data: any) => {
        // Traitement des semences
        this.semences = data.semences?.map((s: any) => ({
          ...s,
          variete: s.pivot.variete,
          quantite: s.pivot.quantite
        })) || [];

        // Traitement des engrais
        this.engrais = data.engrais?.map((e: any) => ({
          ...e,
          variete: e.pivot.variete,
          quantite: e.pivot.quantite
        })) || [];

        // Traitement des équipements
        this.equipements = data.equipements?.map((e: any) => ({
          ...e,
          description: e.pivot ? e.pivot.description : e.description
        })) || [];

        // Afficher les données chargées
        console.log('Semences:', this.semences);
        console.log('Engrais:', this.engrais);
        console.log('Equipements:', this.equipements);
      },
      error => {
        console.error('Erreur lors du chargement des détails de la ressource:', error);
        this.errorMessage = 'Erreur lors du chargement des détails de la ressource.';
      }
    );
  }
}