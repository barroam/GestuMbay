import { Component } from '@angular/core';
import { Projets } from '../../../../Models/projets';
import { ProjetsService } from '../../../../Services/Projets/projets.service';

import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-projet-list',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './admin-projet-list.component.html',
  styleUrl: './admin-projet-list.component.css'
})
export class AdminProjetListComponent {projets: Projets[] = [];

  constructor(private projetsService: ProjetsService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets(): void {
    this.projetsService.getProjets().subscribe(
    
      (response: any) => {
        this.projets = response; 
        console.log(this.projets);
    
      },
      (error) => {
        console.error('Erreur lors du chargement des projets:', error);
      }
    );
  }

  deleteProjet(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projetsService.deleteProjet(id).subscribe(
        () => {
          this.loadProjets();
        },
        (error) => {
          console.error('Erreur lors de la suppression du projet:', error);
        }
      );
    }
  }
}