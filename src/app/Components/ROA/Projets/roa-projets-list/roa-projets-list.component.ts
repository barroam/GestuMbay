import { Component } from '@angular/core';
import { Projets } from '../../../../Models/projets';
import { ProjetsService } from '../../../../Services/Projets/projets.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-roa-projets-list',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './roa-projets-list.component.html',
  styleUrl: './roa-projets-list.component.css'
})
export class ROAProjetsListComponent  {
  projets: Projets[] = [];

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