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

  ressourceId:any;
  projetId:any;
  
  constructor(
    private ressourcesService: RessourcesService,
    private partageService: PartageServicesService, // Injection du service PartageServicesService
    private router: Router,
    private userService: UsersService ,

  ) {}

  ngOnInit(): void {



    // S'abonner pour recevoir les mises à jour de l'ID de la ressource
    this.partageService.ressourceId$.subscribe(id => {
      if (id !== null) {
        this.chargerDetailsRessource(12);
      } else {
        this.errorMessage = 'ID de ressource non valide.';
      }
    });
 
    const userData: string | null = localStorage.getItem('user');

    if (userData) {
      try {
        this.user = JSON.parse(userData); // Assure que les infos de l'utilisateur sont accessibles dans le template
        const userId: number = Number(this.user.id);
//
    //    console.log('ID utilisateur:', userId);

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
               //   console.log('Dernier contrat:', this.contrat);
                  
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

  chargerDetailsRessource(ressourceId: number): void {
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
          description: e.pivot ? e.pivot.description : e.description // Si "pivot" est utilisé pour les descriptions
        })) || [];

        // Logs pour vérifier les données chargées
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
