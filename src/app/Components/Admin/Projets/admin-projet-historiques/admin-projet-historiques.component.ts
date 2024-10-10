import { Component } from '@angular/core';
import { ProjetsHistoriques } from '../../../../Models/projets-historiques';
import { ActivatedRoute } from '@angular/router';
import { ProjetsService } from '../../../../Services/Projets/projets.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-projet-historiques',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-projet-historiques.component.html',
  styleUrl: './admin-projet-historiques.component.css'
})
export class AdminProjetHistoriquesComponent {
  historiqueDetails: ProjetsHistoriques[] = []; // Changement en tableau pour correspondre à l'affichage
  isLoading: boolean = true; // Pour gérer l'état de chargement

  constructor(
    private route: ActivatedRoute,
    private projetService: ProjetsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const historiqueId = +params['id']; // Le '+' convertit la chaîne en nombre
      this.getHistoriqueDetails(historiqueId);
    });
  }

  getHistoriqueDetails(id: number) {
    this.projetService.getHistoriques(id).subscribe(
      (reponse: any) => {
        this.historiqueDetails = reponse.data ;
        this.isLoading = false; // Changer l'état de chargement
      },
      error => {
        console.error('Erreur lors de la récupération des détails:', error);
        this.isLoading = false; // Changer l'état de chargement même en cas d'erreur
      }
    );
  }
}